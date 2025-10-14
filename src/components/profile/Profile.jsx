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

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };


  const getDniFromToken = () => {
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
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
            name: storedData.name.split(' ')[0] || '',
            surname: storedData.name.split(' ')[1] || '',
            email: storedData.email,
            cellNumber: 'No disponible',
            dni: 'No disponible',
            class: userType || 'User'
          });
        } else {
          setError("No se pudo obtener la información del usuario");
        }
        setLoading(false);
        return;
      }

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
          name: storedData.name.split(' ')[0] || '',
          surname: storedData.name.split(' ')[1] || '',
          email: storedData.email,
          cellNumber: 'No disponible',
          dni: 'No disponible',
          class: userType || 'User'
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
        return !value.trim() ? `${field === "name" ? "Nombre" : "Apellido"} es obligatorio` : "";
      case "email":
        if (!value.trim()) return "Email es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value)) return "Email debe ser válido";
        return "";
      case "cellNumber":
        if (!value.trim()) return "Número de celular es obligatorio";
        if (!/^\d{10,15}$/.test(value.replace(/\D/g, ''))) return "Número de celular debe ser válido";
        return "";
      default:
        return "";
    }
  };

  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    
    const newErrors = {};
    Object.keys(editFormData).forEach(key => {
      newErrors[key] = validateField(key, editFormData[key]);
    });
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error !== "")) {
      showNotification("Por favor corrige los errores en el formulario", "danger");
      return;
    }

    try {
      const dni = getDniFromToken();
      if (!dni) {
        showNotification("No se pudo identificar al usuario", "danger");
        return;
      }

      await updateUserProfile(dni, editFormData);
      
      
      setUserProfile(prev => ({
        ...prev,
        ...editFormData
      }));

     
      updateUserDataInStorage({
        name: `${editFormData.name} ${editFormData.surname}`,
        email: editFormData.email
      });

      setIsEditing(false);
      showNotification("Perfil actualizado exitosamente", "success");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      showNotification("Error al actualizar el perfil", "danger");
    }
  };

  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
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
      showNotification("Por favor corrige los errores en el formulario", "danger");
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
        newPassword: passwordData.newPassword
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
      showNotification("Error al cambiar la contraseña", "danger");
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
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Mi Perfil</h1>

          {notification.show && (
            <Alert
              variant={notification.type}
              dismissible
              onClose={() => setNotification({ show: false, message: "", type: "" })}
              className="mb-4"
            >
              {notification.message}
            </Alert>
          )}

          <Tabs defaultActiveKey="profile" className="mb-4">
           
            <Tab eventKey="profile" title="Mi Perfil">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4>Información Personal</h4>
                  {!isEditing && (
                    <Button
                      variant="outline-primary"
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
                        <Button type="submit" variant="primary">
                          💾 Guardar Cambios
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          ❌ Cancelar
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div className="profile-info">
                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Nombre:</strong>
                          <p className="text-muted">{userProfile?.name || "No disponible"}</p>
                        </Col>
                        <Col md={6}>
                          <strong>Apellido:</strong>
                          <p className="text-muted">{userProfile?.surname || "No disponible"}</p>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>Email:</strong>
                          <p className="text-muted">{userProfile?.email || "No disponible"}</p>
                        </Col>
                        <Col md={6}>
                          <strong>Número de Celular:</strong>
                          <p className="text-muted">{userProfile?.cellNumber || "No disponible"}</p>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col md={6}>
                          <strong>DNI:</strong>
                          <p className="text-muted">{userProfile?.dni || "No disponible"}</p>
                        </Col>
                        <Col md={6}>
                          <strong>Tipo de Usuario:</strong>
                          <Badge bg={userProfile?.class === "Admin" ? "warning" : "info"}>
                            {userProfile?.class || "User"}
                          </Badge>
                        </Col>
                      </Row>

                      <hr />
                      <Button
                        variant="outline-warning"
                        onClick={() => setShowPasswordModal(true)}
                        className="mt-3"
                      >
                        🔐 Cambiar Contraseña
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
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
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userReservations.map((reservation) => (
                          <tr key={reservation.Id}>
                            <td>{reservation.Id}</td>
                            <td>{reservation.checkIn}</td>
                            <td>{reservation.checkOut}</td>
                            <td>Habitación #{reservation.room_Id}</td>
                            <td>
                              <Badge bg="success">Confirmada</Badge>
                            </td>
                            <td>
                              <Button variant="outline-info" size="sm">
                                👁️ Ver Detalles
                              </Button>
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
                        onClick={() => window.location.href = "/reservation"}
                      >
                        🏨 Hacer una Reserva
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>

      
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
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
    </Container>
  );
};

export default Profile;
