import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Tab,
  Tabs,
  Table,
  Badge,
} from "react-bootstrap";

import { getRooms } from "../rooms/Rooms.services";
import { createRoom, updateRoom, deleteRoom } from "./Admin.services";
function Admin() {
  const [formData, setFormData] = useState({
    RoomNo: "",
    Nombre: "",
    Personas: "",
    Capacidad: "Single",
    Tipo: "Deluxe",
    Texto: "",
    Area: "",
    Imagen: "",
    Tarifa: "",
    Amenities: "",
    Disponible: true,
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("add-room");

  const validateField = (field, value) => {
    const requiredFields = [
      "RoomNo",
      "Nombre",
      "Personas",
      "Capacidad",
      "Tipo",
      "Tarifa",
    ];

    if (requiredFields.includes(field) && !value.toString().trim()) {
      return `El campo ${field} es obligatorio`;
    }

    if (field === "Personas" && (isNaN(value) || parseInt(value) <= 0)) {
      return `La cantidad de personas debe ser un número mayor a 0`;
    }

    if (field === "RoomNo" && (isNaN(value) || parseInt(value) <= 0)) {
      return `El número de habitación debe ser un número mayor a 0`;
    }

    if (field === "Area" && value && (isNaN(value) || parseFloat(value) <= 0)) {
      return `El área debe ser un número mayor a 0`;
    }

    if (field === "Tarifa" && value && (isNaN(value) || parseFloat(value) < 0)) {
      return "La tarifa debe ser un número mayor o igual a 0";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let processedValue = value;
    if (type === "checkbox") {
      processedValue = checked;
    } else if (type === "number") {
      processedValue = value === "" ? "" : parseFloat(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, processedValue),
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const resetForm = () => {
    setFormData({
      RoomNo: "",
      Nombre: "",
      Personas: "",
      Capacidad: "Single",
      Tipo: "Deluxe",
      Texto: "",
      Area: "",
      Imagen: "",
      Tarifa: "",
      Amenities: "",
      Disponible: true,
    });
    setErrors({});
    setIsEditing(false);
    setEditingRoom(null);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setIsEditing(true);
    setFormData({
      RoomNo: room.RoomNo,
      Nombre: room.Nombre,
      Personas: room.Personas,
      Capacidad: room.Capacidad,
      Tipo: room.Tipo,
      Texto: room.Texto || "",
      Area: room.Area || "",
      Imagen: room.Imagen || "",
      Tarifa: room.Tarifa,
      Amenities: room.Amenities || "",
      Disponible: room.Disponible,
    });
    setErrors({});
    
    // Cambiar automáticamente a la pestaña de agregar/editar
    setActiveTab("add-room");
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDeleteRoom = (room) => {
    const confirmMessage = `¿Estás seguro de que quieres eliminar la habitación "${room.Nombre}" (ID: ${room.Id})?\n\nEsta acción no se puede deshacer.`;
    
    if (window.confirm(confirmMessage)) {
      setLoading(true);
      
      deleteRoom(
        room.Id,
        () => {
          setLoading(false);
          showNotification("¡Habitación eliminada exitosamente!", "success");
          loadRooms();
        },
        (error) => {
          setLoading(false);
          showNotification(`Error al eliminar habitación: ${error}`, "danger");
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      showNotification(
        "Por favor corrige los errores en el formulario",
        "danger"
      );
      return;
    }

    setLoading(true);

    if (isEditing && editingRoom) {
      // Modo edición
      updateRoom(
        editingRoom.Id,
        formData,
        (data) => {
          setLoading(false);
          showNotification("¡Habitación actualizada exitosamente!", "success");
          resetForm();
          loadRooms();
        },
        (error) => {
          setLoading(false);
          showNotification(`Error al actualizar habitación: ${error}`, "danger");
        }
      );
    } else {
      // Modo creación
      createRoom(
        formData,
        (data) => {
          setLoading(false);
          showNotification("¡Habitación agregada exitosamente!", "success");
          resetForm();
          loadRooms();
        },
        (error) => {
          setLoading(false);
          showNotification(`Error al agregar habitación: ${error}`, "danger");
        }
      );
    }
  };

  const loadRooms = () => {
    getRooms(
      (data) => {
        setRooms(data);
      },
      (error) => {
        console.error("Error al cargar habitaciones:", error);
      }
    );
  };

  useEffect(() => {
    loadRooms();
  }, []);


  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Panel Administrativo</h1>

          {notification.show && (
            <Alert
              variant={notification.type}
              dismissible
              onClose={() =>
                setNotification({ show: false, message: "", type: "" })
              }
              className="mb-4"
            >
              {notification.message}
            </Alert>
          )}

          <Tabs 
            activeKey={activeTab} 
            onSelect={(k) => {
              setActiveTab(k);
            }}
            className="mb-4"
          >
            <Tab eventKey="add-room" title="Agregar Habitación">
              <Card>
                <Card.Header>
                  <h4>{isEditing ? "Editar Habitación" : "Nueva Habitación"}</h4>
                  {isEditing && (
                    <small className="text-muted">
                      Editando: {editingRoom?.Nombre} (ID: {editingRoom?.Id})
                    </small>
                  )}
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {/* Información Básica */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Número de Habitación *</Form.Label>
                          <Form.Control
                            type="number"
                            name="RoomNo"
                            value={formData.RoomNo}
                            onChange={handleChange}
                            isInvalid={!!errors.RoomNo}
                            placeholder="Ej: 101"
                            min="1"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.RoomNo}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre de la Habitación *</Form.Label>
                          <Form.Control
                            type="text"
                            name="Nombre"
                            value={formData.Nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.Nombre}
                            placeholder="Ej: Suite Presidencial"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Nombre}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cantidad de Personas *</Form.Label>
                          <Form.Control
                            type="number"
                            name="Personas"
                            value={formData.Personas}
                            onChange={handleChange}
                            isInvalid={!!errors.Personas}
                            placeholder="Ej: 2"
                            min="1"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Personas}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Capacidad *</Form.Label>
                          <Form.Control
                            as="select"
                            name="Capacidad"
                            value={formData.Capacidad}
                            onChange={handleChange}
                          >
                            <option value="Single">Single</option>
                            <option value="Twin">Twin</option>
                            <option value="Triple">Triple</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tipo *</Form.Label>
                          <Form.Control
                            as="select"
                            name="Tipo"
                            value={formData.Tipo}
                            onChange={handleChange}
                          >
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Área (m²)</Form.Label>
                          <Form.Control
                            type="number"
                            name="Area"
                            value={formData.Area}
                            onChange={handleChange}
                            isInvalid={!!errors.Area}
                            placeholder="Ej: 25.5"
                            step="0.1"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Area}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>URL de Imagen</Form.Label>
                          <Form.Control
                            type="url"
                            name="Imagen"
                            value={formData.Imagen}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Disponible</Form.Label>
                          <Form.Check
                            type="checkbox"
                            name="Disponible"
                            checked={formData.Disponible}
                            onChange={handleChange}
                            label="Habitación disponible"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="Texto"
                        value={formData.Texto}
                        onChange={handleChange}
                        placeholder="Describe las características de la habitación..."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tarifa *</Form.Label>
                      <Form.Control
                        type="number"
                        name="Tarifa"
                        value={formData.Tarifa}
                        onChange={handleChange}
                        isInvalid={!!errors.Tarifa}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Tarifa}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Ingresa el precio por noche de la habitación
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Amenidades</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="Amenities"
                        value={formData.Amenities}
                        onChange={handleChange}
                        placeholder="WiFi gratuito, Desayuno incluido, Aire acondicionado..."
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="flex-fill"
                      >
                        {loading 
                          ? (isEditing ? "Actualizando..." : "Agregando...") 
                          : (isEditing ? "Actualizar Habitación" : "Agregar Habitación")
                        }
                      </Button>
                      {isEditing && (
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={handleCancelEdit}
                          disabled={loading}
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="rooms-list" title="Lista de Habitaciones">
              <Card>
                <Card.Header>
                  <h4>Habitaciones Registradas</h4>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Personas</th>
                        <th>Capacidad</th>
                        <th>Tipo</th>
                        <th>Área (m²)</th>
                        <th>Tarifa</th>
                        <th>Estado</th>
                        <th style={{ width: '150px' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.length > 0 ? (
                        rooms.map((room) => (
                          <tr key={room.Id}>
                            <td>{room.Id}</td>
                            <td>{room.Nombre}</td>
                            <td>{room.Personas}</td>
                            <td>
                              <Badge bg="info">{room.Capacidad}</Badge>
                            </td>
                            <td>
                              <Badge
                                bg={
                                  room.Tipo === "Suite" ? "warning" : "success"
                                }
                              >
                                {room.Tipo}
                              </Badge>
                            </td>
                            <td>{room.Area || "N/A"}</td>
                            <td>
                              <strong>${room.Tarifa}</strong>
                            </td>
                            <td>
                              <Badge bg={room.Disponible ? "success" : "secondary"}>
                                {room.Disponible ? "Disponible" : "No Disponible"}
                              </Badge>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEditRoom(room)}
                                  disabled={isEditing || loading}
                                >
                                  ✏️ Editar
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteRoom(room)}
                                  disabled={isEditing || loading}
                                >
                                  🗑️ Eliminar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No hay habitaciones registradas
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
