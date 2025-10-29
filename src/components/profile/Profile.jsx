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

  const [hasChanges, setHasChanges] = useState(false);

  const [editFormData, setEditFormData] = useState({
    name: "",

    surname: "",

    email: "",

    cellNumber: "",
  });

  const [originalFormData, setOriginalFormData] = useState({
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

  const [showErrorsModal, setShowErrorsModal] = useState(false);

  const [validationErrors, setValidationErrors] = useState([]);

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
          const nameParts = storedData.name.trim().split(/\s+/);

          const profileData = {
            name: nameParts[0] || "",

            surname: nameParts.slice(1).join(" ") || "",

            email: storedData.email || "",

            cellNumber: "No disponible",

            dni: storedData.dni || "No editable",
            class: userType || "User",
          };

          setUserProfile(profileData);

          const initialData = {
            name: (profileData.name || "").trim(),

            surname: (profileData.surname || "").trim(),

            email: (profileData.email || "").trim(),

            cellNumber: (profileData.cellNumber || "").trim(),
          };

          setEditFormData(initialData);

          setOriginalFormData(initialData);
        } else {
          setError("No se pudo obtener la información del usuario");
        }

        setLoading(false);

        return;
      }

      console.log("[Frontend][Profile][LOAD]", { dni });

      const profileData = await getUserProfile(dni);

      setUserProfile(profileData);

      const initialData = {
        name: (profileData.name || "").trim(),

        surname: (profileData.surname || "").trim(),

        email: (profileData.email || "").trim(),

        cellNumber: (profileData.cellNumber || "").trim(),
      };

      setEditFormData(initialData);

      setOriginalFormData(initialData);

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
        const nameParts = storedData.name.trim().split(/\s+/);

        const profileData = {
          name: nameParts[0] || "",

          surname: nameParts.slice(1).join(" ") || "",

          email: storedData.email || "",

          cellNumber: "No disponible",

          dni: "No editable",

          class: userType || "User",
        };

        setUserProfile(profileData);

        const initialData = {
          name: (profileData.name || "").trim(),

          surname: (profileData.surname || "").trim(),

          email: (profileData.email || "").trim(),

          cellNumber: (profileData.cellNumber || "").trim(),
        };

        setEditFormData(initialData);

        setOriginalFormData(initialData);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateField = (field, value) => {
    switch (field) {
      case "name":
      case "surname":
        if (!value || !value.trim()) {
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
        if (!value || !value.trim()) return "Email es obligatorio";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email debe ser válido";

        if (value.length > 100)
          return "Email no puede tener más de 100 caracteres";

        return "";

      case "cellNumber": {
        if (!value || !value.trim()) return "Número de celular es obligatorio";

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
    const newFormData = {
      ...editFormData,

      [name]: processedValue,
    };

    setEditFormData(newFormData);

    setErrors((prev) => ({
      ...prev,

      [name]: validateField(name, processedValue),
    }));

    const hasChangesDetected = Object.keys(newFormData).some(
      (key) => newFormData[key] !== originalFormData[key]
    );

    setHasChanges(hasChangesDetected);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const trimmedFormData = {
      name: (editFormData.name || "").trim(),

      surname: (editFormData.surname || "").trim(),

      email: (editFormData.email || "").trim(),

      cellNumber: (editFormData.cellNumber || "").trim(),
    };

    const newErrors = {};

    Object.keys(trimmedFormData).forEach((key) => {
      newErrors[key] = validateField(key, trimmedFormData[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      const errorList = Object.entries(newErrors)

        .filter(([_, error]) => error !== "")

        .map(([field, error]) => {
          const fieldNames = {
            name: "Nombre",

            surname: "Apellido",

            email: "Email",

            cellNumber: "Teléfono",
          };

          return {
            field: fieldNames[field] || field,

            message: error,
          };
        });

      setValidationErrors(errorList);

      setShowErrorsModal(true);

      return;
    }

    try {
      const dni = getDniFromToken();

      if (!dni) {
        showNotification("No se pudo identificar al usuario", "danger");

        return;
      }

      await updateUserProfile(dni, trimmedFormData);

      setUserProfile((prev) => ({
        ...prev,

        ...trimmedFormData,
      }));

      setEditFormData(trimmedFormData);

      updateUserDataInStorage({
        name: `${trimmedFormData.name} ${trimmedFormData.surname}`,

        email: trimmedFormData.email,
      });

      setOriginalFormData(trimmedFormData);

      setHasChanges(false);

      showNotification("Perfil actualizado exitosamente", "success");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);

      let errorMessages = [];

      if (error.message) {
        const errorText = error.message;

        if (
          errorText.includes("Este email ya está en uso") ||
          errorText.includes("email ya está registrado") ||
          errorText.includes("email ya está en uso por otro usuario")
        ) {
          errorMessages.push({
            field: "Email",

            message:
              "Este email ya está registrado por otro usuario. Por favor, usa un email diferente.",
          });
        } else if (
          errorText.includes("Formato de email") ||
          errorText.includes("email inválido")
        ) {
          errorMessages.push({
            field: "Email",

            message:
              "El formato del email no es válido. Por favor, ingresa un email válido (ejemplo: usuario@email.com).",
          });
        } else if (
          errorText.includes("Formato de número de celular") ||
          errorText.includes("celular inválido")
        ) {
          errorMessages.push({
            field: "Teléfono",

            message:
              "El formato del número de celular no es válido. Debe tener entre 10 y 15 dígitos.",
          });
        } else if (
          errorText.includes("Todos los campos son obligatorios") ||
          errorText.includes("obligatorios")
        ) {
          errorMessages.push({
            field: "Campos requeridos",

            message:
              "Todos los campos son obligatorios. Por favor, completa todos los campos.",
          });
        } else if (
          errorText.includes("obligatorio") ||
          errorText.includes("requerido")
        ) {
          errorMessages.push({
            field: "Campo obligatorio",

            message: errorText,
          });
        } else if (errorText.includes("No tienes permisos")) {
          errorMessages.push({
            field: "Permisos",

            message: "No tienes permisos para actualizar este perfil.",
          });
        } else if (errorText.includes("Usuario no encontrado")) {
          errorMessages.push({
            field: "Usuario",

            message:
              "Usuario no encontrado. Por favor, vuelve a iniciar sesión.",
          });
        } else {
          errorMessages.push({
            field: "Error",

            message: errorText,
          });
        }
      } else {
        errorMessages.push({
          field: "Error",

          message:
            "Error desconocido al actualizar el perfil. Por favor, intenta nuevamente.",
        });
      }

      setValidationErrors(errorMessages);

      setShowErrorsModal(true);
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
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>

        <p className="mt-3">Cargando tu perfil...</p>
      </Container>
    );
  }

  if (error && !userProfile) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>

          <p>{error}</p>

          <Button variant="outline-danger" onClick={loadUserProfile}>
            Reintentar
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="profile-container">
      <Container>
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
            <div className="profile-card-custom">
              <div className="profile-card-header">
                <div className="profile-name">
                  {userProfile?.name} {userProfile?.surname}
                </div>

                <div className="profile-badge-custom">
                  {userProfile?.class || "User"}
                </div>
              </div>

              <Form onSubmit={handleEditSubmit}>
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <span className="info-label">Nombre</span>

                    <input
                      className={`info-value ${
                        errors.name ? "error-input" : ""
                      }`}
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                    />

                    {errors.name && (
                      <small
                        className="text-danger"
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.name}
                      </small>
                    )}
                  </div>

                  <div className="profile-info-item">
                    <span className="info-label">Apellido</span>

                    <input
                      className={`info-value ${
                        errors.surname ? "error-input" : ""
                      }`}
                      type="text"
                      name="surname"
                      value={editFormData.surname}
                      onChange={handleEditChange}
                    />

                    {errors.surname && (
                      <small
                        className="text-danger"
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.surname}
                      </small>
                    )}
                  </div>

                  <div className="profile-info-item">
                    <span className="info-label">Teléfono</span>

                    <input
                      className={`info-value ${
                        errors.cellNumber ? "error-input" : ""
                      }`}
                      type="text"
                      name="cellNumber"
                      value={editFormData.cellNumber}
                      onChange={handleEditChange}
                    />

                    {errors.cellNumber && (
                      <small
                        className="text-danger"
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.cellNumber}
                      </small>
                    )}
                  </div>

                  <div className="profile-info-item">
                    <span className="info-label">Email</span>

                    <input
                      className={`info-value ${
                        errors.email ? "error-input" : ""
                      }`}
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />

                    {errors.email && (
                      <small
                        className="text-danger"
                        style={{
                          fontSize: "0.75rem",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {errors.email}
                      </small>
                    )}
                  </div>

                  <div className="profile-info-item">
                    <span className="info-label">DNI</span>

                    <input
                      className="info-value"
                      type="text"
                      value={userProfile?.dni || "No editable"}
                      readOnly
                    />
                  </div>

                  <div className="profile-info-item">
                    <span className="info-label">Tipo de usuario</span>

                    <input
                      className="info-value"
                      type="text"
                      value={userProfile?.class || "User"}
                      readOnly
                    />
                  </div>
                </div>

                <div className="profile-buttons-container">
                  <button
                    type="button"
                    className="profile-change-password-btn"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Cambiar contraseña
                  </button>

                  <button
                    type="submit"
                    className={`profile-save-changes-btn ${
                      hasChanges ? "show" : ""
                    }`}
                  >
                    Guardar cambios
                  </button>
                </div>
              </Form>
            </div>
          </Tab>

          <Tab eventKey="reservations" title="Mis Reservas">
            <Card>
              <Card.Header>
                <h4>Historial de Reservas</h4>
              </Card.Header>

              <Card.Body>
                {userReservations.length > 0 ? (
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
                          <td>{reservation.Id}</td>

                          <td>{reservation.checkIn}</td>

                          <td>{reservation.checkOut}</td>

                          <td>
                            {reservation.Room?.RoomNo
                              ? `#${reservation.Room.RoomNo} — ${reservation.Room.Nombre} (${reservation.Room.Tipo})`
                              : `Habitación #${reservation.room_Id}`}
                          </td>

                          <td>
                            <Badge
                              bg={
                                reservation.status === "cancelled"
                                  ? "danger"
                                  : reservation.displayStatus === "expired"
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {reservation.status === "cancelled"
                                ? "Cancelada"
                                : reservation.displayStatus === "expired"
                                ? "No Vigente"
                                : "Activa"}
                            </Badge>
                          </td>
                          <td>
                            {reservation.status !== "cancelled" &&
                              reservation.displayStatus !== "expired" && (
                                <Button
                                  variant="outline-danger"
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
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted">
                      No tienes reservas registradas aún.
                    </p>

                    <Button
                      variant="primary"
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
      </Container>

      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handlePasswordSubmit}>
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
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancelar
            </Button>

            <Button variant="primary" type="submit">
              Cambiar Contraseña
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
                  <strong>Check-in:</strong> {cancelReservationConfirm.checkIn}
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
          <Button variant="danger" onClick={confirmCancelReservation} size="lg">
            Sí, cancelar reserva
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErrorsModal}
        onHide={() => setShowErrorsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="d-flex align-items-center">
            <span className="me-2">⚠️</span>
            Errores en el formulario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="mb-3">
            <h5 className="text-danger fw-bold mb-3">
              Por favor corrige los siguientes errores:
            </h5>
            <div className="alert alert-danger">
              <ul className="mb-0" style={{ paddingLeft: "1.5rem" }}>
                {validationErrors.map((error, index) => (
                  <li key={index} className="mb-2">
                    <strong>{error.field}:</strong> {error.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-muted mb-0">
            Revisa los campos marcados en el formulario y corrige los errores
            antes de guardar.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="danger"
            onClick={() => setShowErrorsModal(false)}
            size="lg"
            className="px-5"
          >
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
