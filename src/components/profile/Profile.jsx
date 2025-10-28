import { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Tab,
  Tabs,
  Table,
  Badge,
  Spinner,
  Form,
  Modal,
} from "react-bootstrap";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import { UserTypeContext } from "../services/Auth/UserType.context";
import {
  getUserProfile,
  getUserReservations,
  updateUserProfile,
  changePassword,
  getUserDataFromStorage,
  updateUserDataInStorage,
  cancelUserReservation,
} from "./profile.services";
import "./Profile.css";

const Profile = () => {
  const { token } = useContext(AuthenticationContex);
  const { userType } = useContext(UserTypeContext);

  const [userProfile, setUserProfile] = useState(null);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    surname: "",
    email: "",
    cellNumber: "",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [cancelReservationConfirm, setCancelReservationConfirm] =
    useState(null);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const getDniFromToken = () => {
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.dni;
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
    return null;
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const dni = getDniFromToken();
      if (!dni) {
        const storedData = getUserDataFromStorage();
        if (storedData.name) {
          setUserProfile({
            name: storedData.name.split(" ")[0] || "",
            surname: storedData.name.split(" ")[1] || "",
            email: storedData.email || "",
            cellNumber: "No disponible",
            dni: storedData.dni || "No disponible",
            class: userType || "User",
          });
        } else {
          setError("No se pudo obtener la información del usuario");
        }
        setLoading(false);
        return;
      }
      console.log("[Frontend][Profile][LOAD]", { dni });
      const profileData = await getUserProfile(dni);
      setUserProfile(profileData);
      setEditFormData({
        name: profileData.name || "",
        surname: profileData.surname || "",
        email: profileData.email || "",
        cellNumber: profileData.cellNumber || "",
      });

      try {
        const reservationsData = await getUserReservations(dni);
        console.log("[Frontend][Reservations][SET]", reservationsData?.length);
        setUserReservations(reservationsData);
      } catch (reservationError) {
        console.warn("No se pudieron cargar las reservas:", reservationError);
        setUserReservations([]);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      setError("Error al cargar los datos del perfil");

      const storedData = getUserDataFromStorage();
      if (storedData.name) {
        setUserProfile({
          name: storedData.name.split(" ")[0] || "",
          surname: storedData.name.split(" ")[1] || "",
          email: storedData.email,
          cellNumber: "No disponible",
          dni: "No disponible",
          class: userType || "User",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case "name":
      case "surname":
        if (!value.trim()) {
          return `${field === "name" ? "Nombre" : "Apellido"} es obligatorio`;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value.trim())) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } solo puede contener letras, espacios, guiones y apostrofes`;
        }

        if (value.trim().length < 2) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } debe tener al menos 2 caracteres`;
        }
        if (value.trim().length > 50) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } no puede tener más de 50 caracteres`;
        }
        return "";
      case "email":
        if (!value.trim()) return "Email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email debe ser válido";
        if (value.length > 100)
          return "Email no puede tener más de 100 caracteres";
        return "";
      case "cellNumber": {
        if (!value.trim()) return "Número de celular es obligatorio";

        const cleanNumber = value.replace(/\D/g, "");
        if (!/^\d{10,15}$/.test(cleanNumber)) {
          return "Número de celular debe tener entre 10 y 15 dígitos";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "name" || name === "surname") {
      processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, "");
    }

    if (name === "cellNumber") {
      processedValue = value.replace(/\D/g, "");
    }

    setEditFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, processedValue),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(editFormData).forEach((key) => {
      newErrors[key] = validateField(key, editFormData[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      showNotification(
        "Por favor corrige los errores en el formulario",
        "danger"
      );
      return;
    }

    try {
      const dni = getDniFromToken();
      if (!dni) {
        showNotification("No se pudo identificar al usuario", "danger");
        return;
      }

      await updateUserProfile(dni, editFormData);

      setUserProfile((prev) => ({
        ...prev,
        ...editFormData,
      }));

      updateUserDataInStorage({
        name: `${editFormData.name} ${editFormData.surname}`,
        email: editFormData.email,
      });

      setIsEditing(false);
      showNotification("Perfil actualizado exitosamente", "success");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);

      let errorMessage = "Error al actualizar el perfil";

      if (error.message) {
        if (error.message.includes("Este email ya está en uso")) {
          errorMessage =
            "❌ Este email ya está registrado por otro usuario. Por favor, usa un email diferente.";
        } else if (error.message.includes("Formato")) {
          errorMessage = `❌ ${error.message}`;
        } else if (error.message.includes("obligatorio")) {
          errorMessage = `❌ ${error.message}`;
        } else if (!error.message.includes("Error")) {
          errorMessage = `❌ ${error.message}`;
        }
      }

      showNotification(errorMessage, "danger");
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Contraseña actual es obligatoria";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "Nueva contraseña es obligatoria";
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "La contraseña debe tener al menos 6 caracteres";
    } else if (passwordData.newPassword === passwordData.currentPassword) {
      errors.newPassword = "La nueva contraseña debe ser diferente a la actual";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePassword();
    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) {
      showNotification(
        "Por favor corrige los errores en el formulario",
        "danger"
      );
      return;
    }

    try {
      const dni = getDniFromToken();
      if (!dni) {
        showNotification("No se pudo identificar al usuario", "danger");
        return;
      }

      await changePassword(dni, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordModal(false);
      showNotification("Contraseña cambiada exitosamente", "success");
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);

      let errorMessage = "Error al cambiar la contraseña";

      if (error.message) {
        if (error.message.includes("actual incorrecta")) {
          errorMessage = "Contraseña actual incorrecta";
        } else if (error.message.includes("obligatorias")) {
          errorMessage = "Debes completar todos los campos";
        } else if (error.message.includes("al menos 6")) {
          errorMessage = "La nueva contraseña debe tener al menos 6 caracteres";
        } else if (error.message.includes("mismo")) {
          errorMessage = "La nueva contraseña debe ser diferente a la actual";
        } else if (error.message.includes("permisos")) {
          errorMessage = "No tienes permisos para cambiar esta contraseña";
        } else if (error.message.includes("Error 400")) {
          errorMessage = "Error en la solicitud. Verifica los datos ingresados";
        } else {
          errorMessage = error.message;
        }
      }

      showNotification(errorMessage, "danger");
    }
  };

  const handleCancelReservation = (reservation) => {
    setCancelReservationConfirm(reservation);
  };

  const confirmCancelReservation = async () => {
    if (!cancelReservationConfirm) return;

    try {
      await cancelUserReservation(cancelReservationConfirm.Id);

      const dni = getDniFromToken();
      if (dni) {
        const reservationsData = await getUserReservations(dni);
        setUserReservations(reservationsData);
      }

      setCancelReservationConfirm(null);
      showNotification("Reserva cancelada exitosamente", "success");
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      showNotification("Error al cancelar la reserva", "danger");
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfile();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="profile-container">
        <Container>
          <div className="profile-loading">
            <Spinner animation="border" role="status" />
            <p>Cargando tu perfil...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error && !userProfile) {
    return (
      <div className="profile-container">
        <Container>
          <div className="profile-error">
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
              <Button
                variant="primary"
                onClick={loadUserProfile}
                className="profile-btn"
              >
                🔄 Reintentar
              </Button>
            </Alert>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Container>
        <div className="profile-header">
          <div className="profile-avatar">
            {userProfile?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h1 className="text-center">
            {userProfile?.name} {userProfile?.surname}
          </h1>
          <p className="text-center">{userProfile?.email}</p>
          <div className="text-center">
            <span className="profile-type-badge">
              {userProfile?.class === "Admin" ? "👨‍💼 " : "👤 "}
              {userProfile?.class || "User"}
            </span>
          </div>
        </div>

        {notification.show && (
          <Alert
            variant={notification.type}
            dismissible
            onClose={() =>
              setNotification({ show: false, message: "", type: "" })
            }
            className="notification-float"
          >
            {notification.message}
          </Alert>
        )}

        <Tabs defaultActiveKey="profile" className="profile-tabs">
          <Tab eventKey="profile" title="📋 Información Personal">
            <Card className="profile-card">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4>Datos Personales</h4>
                {!isEditing && (
                  <Button
                    className="btn-edit"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Editar Perfil
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {isEditing ? (
                  <Form onSubmit={handleEditSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={editFormData.name}
                            onChange={handleEditChange}
                            isInvalid={!!errors.name}
                            placeholder="Tu nombre"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Apellido *</Form.Label>
                          <Form.Control
                            type="text"
                            name="surname"
                            value={editFormData.surname}
                            onChange={handleEditChange}
                            isInvalid={!!errors.surname}
                            placeholder="Tu apellido"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.surname}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleEditChange}
                            isInvalid={!!errors.email}
                            placeholder="tu@email.com"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Número de Celular *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="cellNumber"
                            value={editFormData.cellNumber}
                            onChange={handleEditChange}
                            isInvalid={!!errors.cellNumber}
                            placeholder="1234567890"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cellNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex gap-2">
                      <Button
                        type="submit"
                        className="profile-btn profile-btn-primary"
                      >
                        💾 Guardar Cambios
                      </Button>
                      <Button
                        type="button"
                        className="profile-btn profile-btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        ❌ Cancelar
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div className="profile-info-grid">
                    <div className="profile-info-item">
                      <div className="info-label">Nombre</div>
                      <div className="info-value">
                        {userProfile?.name || "No disponible"}
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-label">Apellido</div>
                      <div className="info-value">
                        {userProfile?.surname || "No disponible"}
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-label">Email</div>
                      <div className="info-value">
                        {userProfile?.email || "No disponible"}
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-label">Número de Celular</div>
                      <div className="info-value">
                        {userProfile?.cellNumber || "No disponible"}
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-label">DNI</div>
                      <div className="info-value">
                        {userProfile?.dni || "No disponible"}
                      </div>
                    </div>
                    <div className="profile-info-item">
                      <div className="info-label">Tipo de Usuario</div>
                      <div className="info-value">
                        <span
                          className={`profile-badge badge-type-${
                            userProfile?.class?.toLowerCase() || "user"
                          }`}
                        >
                          {userProfile?.class || "User"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!isEditing && (
                  <div className="text-center mt-4">
                    <Button
                      className="btn-password"
                      onClick={() => setShowPasswordModal(true)}
                    >
                      🔐 Cambiar Contraseña
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="reservations" title="🏨 Mis Reservas">
            <Card className="profile-card">
              <Card.Header>
                <h4>Historial de Reservas</h4>
              </Card.Header>
              <Card.Body>
                {userReservations.length > 0 ? (
                  <div className="reservations-table">
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Check-in</th>
                          <th>Check-out</th>
                          <th>Habitación</th>
                          <th>Estado</th>
                          <th style={{ width: "120px" }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userReservations.map((reservation) => (
                          <tr key={reservation.Id}>
                            <td>
                              <strong>#{reservation.Id}</strong>
                            </td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>
                              {reservation.Room?.RoomNo
                                ? `#${reservation.Room.RoomNo} — ${reservation.Room.Nombre} (${reservation.Room.Tipo})`
                                : `Habitación #${reservation.room_Id}`}
                            </td>
                            <td>
                              <span
                                className={`profile-badge ${
                                  reservation.status === "cancelled"
                                    ? "badge-status-cancelled"
                                    : reservation.displayStatus === "expired"
                                    ? "badge-status-expired"
                                    : "badge-status-active"
                                }`}
                              >
                                {reservation.status === "cancelled"
                                  ? "Cancelada"
                                  : reservation.displayStatus === "expired"
                                  ? "No Vigente"
                                  : "Activa"}
                              </span>
                            </td>
                            <td>
                              {reservation.status !== "cancelled" &&
                                reservation.displayStatus !== "expired" && (
                                  <Button
                                    className="btn-action btn-action-cancel"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelReservation(reservation)
                                    }
                                  >
                                    🗑️ Cancelar
                                  </Button>
                                )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">🏨</div>
                    <h5>No tienes reservas registradas aún</h5>
                    <p>Comienza a planear tu estadía con nosotros</p>
                    <Button
                      className="profile-btn profile-btn-primary"
                      onClick={() => (window.location.href = "/reservation")}
                    >
                      🏨 Hacer una Reserva
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        <Modal
          show={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
          className="profile-modal"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>🔐 Cambiar Contraseña</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handlePasswordSubmit} className="profile-form">
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña Actual *</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.currentPassword}
                  placeholder="Tu contraseña actual"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.currentPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nueva Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.newPassword}
                  placeholder="Nueva contraseña (mín. 6 caracteres)"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.newPassword}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirmar Nueva Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordErrors.confirmPassword}
                  placeholder="Confirma tu nueva contraseña"
                />
                <Form.Control.Feedback type="invalid">
                  {passwordErrors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="profile-btn profile-btn-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                ❌ Cancelar
              </Button>
              <Button className="profile-btn profile-btn-primary" type="submit">
                💾 Cambiar Contraseña
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal
          show={!!cancelReservationConfirm}
          onHide={() => setCancelReservationConfirm(null)}
          size="lg"
          centered
        >
          <Modal.Header closeButton className="bg-danger text-white">
            <Modal.Title>⚠️ Confirmar Cancelación de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center p-4">
            {cancelReservationConfirm && (
              <>
                <h4 className="text-danger mb-4">
                  ¿Estás seguro de que deseas cancelar esta reserva?
                </h4>

                <div className="alert alert-warning mb-4">
                  <p className="mb-2">
                    <strong>Habitación:</strong>{" "}
                    {cancelReservationConfirm.Room?.Nombre ||
                      `Habitación #${cancelReservationConfirm.room_Id}`}
                  </p>
                  <p className="mb-2">
                    <strong>Check-in:</strong>{" "}
                    {cancelReservationConfirm.checkIn}
                  </p>
                  <p className="mb-0">
                    <strong>Check-out:</strong>{" "}
                    {cancelReservationConfirm.checkOut}
                  </p>
                </div>

                <p className="lead">Esta acción NO se puede deshacer.</p>
                <p className="text-muted">
                  La habitación quedará disponible automáticamente.
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="secondary"
              onClick={() => setCancelReservationConfirm(null)}
              size="lg"
            >
              No, mantener reserva
            </Button>
            <Button
              variant="danger"
              onClick={confirmCancelReservation}
              size="lg"
            >
              Sí, cancelar reserva
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Profile;
