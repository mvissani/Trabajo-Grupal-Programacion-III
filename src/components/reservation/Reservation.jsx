import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row, Alert, Modal } from "react-bootstrap";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import "./Reservation.css";

function Reservation() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    room_Id: "",
    guest: "",
    comments: "",
  });
  const bookingData = location.state?.bookingData || {};
  const availableRooms = location.state?.availabilityData || [];
  const selected = location.state?.selectedRoom || null;
  const [allRooms, setAllRooms] = useState([]);
  const navigate = useNavigate();
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRoomWarningModal, setShowRoomWarningModal] = useState(false);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const { token } = useContext(AuthenticationContex);
  
  
  useEffect(() => {
    const loadAllRooms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rooms");
        const data = await response.json();
        if (data.success) {
          setAllRooms(data.data);
        }
      } catch (error) {
        console.error("Error loading rooms:", error);
      }
    };
    loadAllRooms();
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem("user-name") || "";
    const storedEmail = localStorage.getItem("user-email") || "";

    setFormData({
      name: storedName,
      email: storedEmail,
      checkIn: bookingData.ingreso || "",
      checkOut: bookingData.egreso || "",
      room_Id: availableRooms?.habitaciones?.Id
        ? availableRooms.habitaciones.Id
        : selected?.Id,
      guest: bookingData.guests || "",
      comments: "",
    });
  }, [selected, availableRooms, bookingData, allRooms]);

  
  const checkRoomAvailability = async (roomId) => {
    if (!formData.checkIn || !formData.checkOut || !roomId) {
      return true; 
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/availability?fechaInicio=${formData.checkIn}&fechaFin=${formData.checkOut}&cantidadHabitaciones=1&cantidadPersonas=1`
      );
      const data = await response.json();
      
      if (data.success && data.data.habitaciones) {
        
        const isAvailable = data.data.habitaciones.some(room => room.Id === parseInt(roomId));
        return isAvailable;
      }
    } catch (error) {
      console.error("Error checking availability:", error);
    }
    
    return true; 
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));


    if (name === "room_Id" && value && formData.checkIn && formData.checkOut) {
      const selectedRoom = allRooms.find(room => room.Id === parseInt(value));
      if (selectedRoom) {
        const isAvailable = await checkRoomAvailability(value);
        
        if (!isAvailable) {
          setSelectedRoomInfo(selectedRoom);
          setShowRoomWarningModal(true);
        
          setFormData((prev) => ({ ...prev, room_Id: "" }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!formData.checkIn || !formData.checkOut) {
      setError("Por favor completa las fechas de ingreso y egreso");
      return;
    }
    
    if (!formData.room_Id) {
      setError("Por favor selecciona una habitación");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/Reservation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ ...formData, comment: formData.comments }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error desconocido");
        return;
      }
      
      setSuccess("Reserva creada exitosamente");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "84.4vh" }}
    >
      <Card
        className="mb-3 w-75 bg-secondary text-white p-4 border-1 shadow"
        style={{ maxWidth: "700px" }}
      >
        <Card.Body>
          <Row>
            <Card.Title className="text-center fw-bold shadow fs-2 mb-4">
              Confirmar Reserva
            </Card.Title>

            {Error && (
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                {Error}
              </Alert>
            )}
            
            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess("")}>
                {success}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej. juan@email.com"
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">Fecha de ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">Fecha de egreso</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">
                  Seleccionar habitación disponible
                </Form.Label>
                <Form.Select
                  name="room_Id"
                  value={formData.room_Id}
                  onChange={handleChange}
                  className="w-100"
                >
                  <option value="">Seleccione una habitación...</option>

                  {selected ? (
                    <option value={selected.Id}>
                      {selected.RoomNo} — {selected.Nombre} — {selected.Tipo} ({selected.Capacidad})
                    </option>
                  ) : allRooms && allRooms.length > 0 ? (
                    allRooms.map((room) => (
                      <option key={room.Id} value={room.Id}>
                        {room.RoomNo} — {room.Nombre} — {room.Tipo} ({room.Capacidad}) 
                        {!room.Disponible ? " ⚠️" : ""}
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando habitaciones...</option>
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 text-center">
                <Form.Label className="w-100">Cantidad de huéspedes</Form.Label>
                <Form.Control
                  type="number"
                  name="guest"
                  value={formData.guest}
                  onChange={handleChange}
                  min="1"
                  placeholder="Ej. 2"
                />
              </Form.Group>

              <Form.Group className="mb-4 text-center">
                <Form.Label className="w-100">
                  Comentarios o requerimientos especiales
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Ej. Necesito cuna para bebé o vista al mar"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="light"
                className="d-block mx-auto px-4 py-2 fw-bold"
              >
                Confirmar Reserva
              </Button>
            </Form>
          </Row>
        </Card.Body>
      </Card>

    
      <Modal 
        show={showRoomWarningModal} 
        onHide={() => setShowRoomWarningModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="d-flex align-items-center">
            <span className="me-2">⚠️</span>
            Habitación No Disponible
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-5">
          {selectedRoomInfo && (
            <>
              <div className="mb-4">
                <h3 className="text-danger fw-bold mb-3">
                  Esta habitación está RESERVADA
                </h3>
                <div className="alert alert-warning d-inline-block px-4 py-3">
                  <h5 className="mb-2">{selectedRoomInfo.Nombre}</h5>
                  <p className="mb-1">
                    <strong>Habitación N°:</strong> {selectedRoomInfo.RoomNo}
                  </p>
                  <p className="mb-1">
                    <strong>Tipo:</strong> {selectedRoomInfo.Tipo}
                  </p>
                  <p className="mb-0">
                    <strong>Capacidad:</strong> {selectedRoomInfo.Capacidad} personas
                  </p>
                </div>
              </div>
              
              <p className="lead">
                Esta habitación tiene una reserva activa entre el{" "}
                <strong>{formData.checkIn}</strong> y el{" "}
                <strong>{formData.checkOut}</strong>.
              </p>
              
              <p className="text-muted mb-0">
                Por favor, selecciona otra habitación disponible o cambia tus fechas de estadía.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button 
            variant="danger" 
            onClick={() => setShowRoomWarningModal(false)}
            size="lg"
            className="px-5"
          >
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Reservation;
