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
  Badge
} from "react-bootstrap";

import { getRooms } from "../rooms/Rooms.services";
import { createRoom, testBackendConnection } from "./Admin.services";
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
    TarifaSA: "",
    TarifaAD: "",
    TarifaMP: "",
    TarifaPC: "",
    TarifaAI: "",
    Amenities: "",
    Disponible: true
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    // Campos obligatorios
    const requiredFields = ["RoomNo", "Nombre", "Personas", "Capacidad", "Tipo"];
    
    if (requiredFields.includes(field) && !value.toString().trim()) {
      return `El campo ${field} es obligatorio`;
    }
    
    // Validaciones numéricas
    if (field === "Personas" && (isNaN(value) || parseInt(value) <= 0)) {
      return `La cantidad de personas debe ser un número mayor a 0`;
    }
    
    if (field === "RoomNo" && (isNaN(value) || parseInt(value) <= 0)) {
      return `El número de habitación debe ser un número mayor a 0`;
    }
    
    if (field === "Area" && value && (isNaN(value) || parseFloat(value) <= 0)) {
      return `El área debe ser un número mayor a 0`;
    }
    
    // Validaciones de tarifas
    const tarifaFields = ["TarifaSA", "TarifaAD", "TarifaMP", "TarifaPC", "TarifaAI"];
    if (tarifaFields.includes(field) && value && (isNaN(value) || parseFloat(value) < 0)) {
      return "La tarifa debe ser un número mayor o igual a 0";
    }
    
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Manejar diferentes tipos de input
    let processedValue = value;
    if (type === "checkbox") {
      processedValue = checked;
    } else if (type === "number") {
      processedValue = value === "" ? "" : parseFloat(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, processedValue)
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== "")) {
      showNotification("Por favor corrige los errores en el formulario", "danger");
      return;
    }

    setLoading(true);
    
    createRoom(
      formData,
      (data) => {
        setLoading(false);
        showNotification("¡Habitación agregada exitosamente!", "success");
        setFormData({
          RoomNo: "",
          Nombre: "",
          Personas: "",
          Capacidad: "Single",
          Tipo: "Deluxe",
          Texto: "",
          Area: "",
          Imagen: "",
          TarifaSA: "",
          TarifaAD: "",
          TarifaMP: "",
          TarifaPC: "",
          TarifaAI: "",
          Amenities: "",
          Disponible: true
        });
        setErrors({});
        loadRooms(); // Recargar la lista de habitaciones
      },
      (error) => {
        setLoading(false);
        showNotification(`Error al agregar habitación: ${error}`, "danger");
      }
    );
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

  // Cargar habitaciones al montar el componente
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
              onClose={() => setNotification({ show: false, message: "", type: "" })}
              className="mb-4"
            >
              {notification.message}
            </Alert>
          )}

          <Tabs defaultActiveKey="add-room" className="mb-4">
            <Tab eventKey="add-room" title="Agregar Habitación">
                <div className="mb-3">
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  onClick={testBackendConnection}
                  className="me-2"
                >
                  🔧 Probar Conexión Backend
                </Button>
                <small className="text-muted">
                  Usa este botón para diagnosticar problemas de conectividad
                </small>
              </div>
              <Card>
                <Card.Header>
                  <h4>Nueva Habitación</h4>
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
                          <Form.Select
                            name="Capacidad"
                            value={formData.Capacidad}
                            onChange={handleChange}
                          >
                            <option value="Single">Single</option>
                            <option value="Twin">Twin</option>
                            <option value="Triple">Triple</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tipo *</Form.Label>
                          <Form.Select
                            name="Tipo"
                            value={formData.Tipo}
                            onChange={handleChange}
                          >
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                          </Form.Select>
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

                    {/* Información Adicional */}
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

                    {/* Tarifas */}
                    <h5 className="mt-4 mb-3">Tarifas</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Solo Alojamiento (SA)</Form.Label>
                          <Form.Control
                            type="number"
                            name="TarifaSA"
                            value={formData.TarifaSA}
                            onChange={handleChange}
                            isInvalid={!!errors.TarifaSA}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.TarifaSA}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Alojamiento y Desayuno (AD)</Form.Label>
                          <Form.Control
                            type="number"
                            name="TarifaAD"
                            value={formData.TarifaAD}
                            onChange={handleChange}
                            isInvalid={!!errors.TarifaAD}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.TarifaAD}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Media Pensión (MP)</Form.Label>
                          <Form.Control
                            type="number"
                            name="TarifaMP"
                            value={formData.TarifaMP}
                            onChange={handleChange}
                            isInvalid={!!errors.TarifaMP}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.TarifaMP}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Pensión Completa (PC)</Form.Label>
                          <Form.Control
                            type="number"
                            name="TarifaPC"
                            value={formData.TarifaPC}
                            onChange={handleChange}
                            isInvalid={!!errors.TarifaPC}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.TarifaPC}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>All Inclusive (AI)</Form.Label>
                          <Form.Control
                            type="number"
                            name="TarifaAI"
                            value={formData.TarifaAI}
                            onChange={handleChange}
                            isInvalid={!!errors.TarifaAI}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.TarifaAI}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

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

                    <Button 
                      type="submit" 
                      variant="primary" 
                      disabled={loading}
                      className="w-100"
                    >
                      {loading ? "Agregando..." : "Agregar Habitación"}
                    </Button>
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
                        <th>Estado</th>
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
                              <Badge bg={room.Tipo === 'Suite' ? 'warning' : 'success'}>
                                {room.Tipo}
                              </Badge>
                            </td>
                            <td>{room.Area || 'N/A'}</td>
                            <td>
                              <Badge bg="success">Activa</Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
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