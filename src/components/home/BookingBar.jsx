import { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import { BsCalendarEvent, BsHouseDoor, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthenticationContex } from "../services/Auth/Auth.context";

export default function BookingBar({ onSearch }) {
  const [form, setForm] = useState({
    ingreso: "",
    egreso: "",
    rooms: 1,
    guests: 0,
  });

  const [loading, setLoading] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { token } = useContext(AuthenticationContex);
  const navigate = useNavigate();

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleReservar = () => {
    if (!token) {
      setShowAuthModal(true);
    } else {
      navigate("/reservation", {
        state: {
          bookingData: form,
          availabilityData: availabilityResult,
        },
      });
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const checkAvailability = async (searchData) => {
    try {
      setLoading(true);
      setAvailabilityResult(null);

      const queryParams = new URLSearchParams({
        fechaInicio: searchData.ingreso,
        fechaFin: searchData.egreso,
        cantidadHabitaciones: searchData.rooms.toString(),
        cantidadPersonas: searchData.guests.toString(),
      });

      const response = await fetch(
        `http://localhost:3000/api/availability?${queryParams}`
      );
      const result = await response.json();

      setAvailabilityResult(result.data);

      if (result.data.disponible) {
        onSearch?.(searchData, result.data);
      }
    } catch (error) {
      console.error("Error al verificar disponibilidad:", error);
      setAvailabilityResult({
        disponible: false,
        mensaje: "Error al verificar disponibilidad. Inténtelo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.ingreso || !form.egreso || !form.guests) {
      setAvailabilityResult({
        disponible: false,
        mensaje: "Por favor complete todos los campos requeridos",
      });
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaIngreso = new Date(form.ingreso + "T00:00:00");
    const fechaEgreso = new Date(form.egreso + "T00:00:00");

    if (fechaIngreso < hoy) {
      setAvailabilityResult({
        disponible: false,
        mensaje: "La fecha de ingreso no puede ser anterior a la fecha actual",
      });
      return;
    }

    if (fechaEgreso < hoy) {
      setAvailabilityResult({
        disponible: false,
        mensaje: "La fecha de egreso no puede ser anterior a la fecha actual",
      });
      return;
    }

    if (fechaEgreso <= fechaIngreso) {
      setAvailabilityResult({
        disponible: false,
        mensaje: "La fecha de egreso debe ser posterior a la fecha de ingreso",
      });
      return;
    }

    checkAvailability(form);
  };

  return (
    <div className="booking-bar py-2 bg-secondary">
      <Container fluid>
        <Form onSubmit={submit}>
          <Row className="g-0 justify-content-center text-center">
            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                INGRESO
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsCalendarEvent className="me-2" />
                <Form.Control
                  type="date"
                  value={form.ingreso}
                  onChange={handle("ingreso")}
                  className="border-0 bg-light p-0"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                EGRESO
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsCalendarEvent className="me-2" />
                <Form.Control
                  type="date"
                  value={form.egreso}
                  onChange={handle("egreso")}
                  className="border-0 bg-light p-0"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                HABITACIONES
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsHouseDoor className="me-2" />
                <Form.Control
                  type="number"
                  min={1}
                  value={form.rooms}
                  onChange={handle("rooms")}
                  className="border-0 bg-light p-0 text-center"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                HUÉSPEDES
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsPerson className="me-2" />
                <Form.Control
                  type="number"
                  min={0}
                  value={form.guests}
                  onChange={handle("guests")}
                  className="border-0 bg-light p-0 text-center"
                />
              </div>
            </Col>

            <Col xs="auto" className="px-2">
              <Form.Label className="d-block">&nbsp;</Form.Label>
              <Button
                type="submit"
                className="px-4 fw-bold"
                style={{ background: "#48c5b7", border: "none" }}
                disabled={loading}
              >
                {loading ? "VERIFICANDO..." : "BUSCAR"}
              </Button>
            </Col>
          </Row>
        </Form>

        {availabilityResult && (
          <Row className="mt-3 justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <Alert
                className="mb-0 text-center shadow-lg"
                style={{
                  padding: "25px 30px",
                  borderRadius: "15px",
                  border: availabilityResult.disponible
                    ? "3px solid #48c5b7"
                    : "3px solid #6c757d",
                  backgroundColor: availabilityResult.disponible
                    ? "#f8f9fa"
                    : "#e9ecef",
                  fontSize: "1.1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    color: availabilityResult.disponible
                      ? "#212529"
                      : "#495057",
                  }}
                >
                  {availabilityResult.disponible ? "✓ " : "✗ "}
                  {availabilityResult.mensaje}
                </div>

                {availabilityResult.disponible && (
                  <div className="mt-3">
                    <div
                      style={{
                        backgroundColor: "#6c757d",
                        padding: "15px",
                        borderRadius: "10px",
                        marginBottom: "15px",
                        color: "white",
                      }}
                    >
                      <p
                        className="mb-2"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "600",
                        }}
                      >
                        <strong>🏨 Habitaciones disponibles:</strong>{" "}
                        {availabilityResult.habitacionesDisponibles} de{" "}
                        {availabilityResult.habitacionesRequeridas} requeridas
                      </p>
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "600",
                        }}
                      >
                        <strong>📅 Fechas:</strong>{" "}
                        {availabilityResult.fechaInicio} al{" "}
                        {availabilityResult.fechaFin}
                      </p>
                    </div>

                    <Button
                      className="mt-2 px-5 py-2 fw-bold shadow"
                      onClick={handleReservar}
                      style={{
                        fontSize: "1.15rem",
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
                        backgroundColor: "#48c5b7",
                        borderColor: "#48c5b7",
                        color: "white",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.backgroundColor = "#3da89c";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.backgroundColor = "#48c5b7";
                      }}
                    >
                      🎯 RESERVAR AHORA
                    </Button>
                  </div>
                )}

                {!availabilityResult.disponible && (
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "15px",
                      borderRadius: "10px",
                      marginTop: "10px",
                      fontSize: "1.05rem",
                      color: "#495057",
                      fontWeight: "600",
                    }}
                  >
                    {availabilityResult.mensaje.includes(
                      "complete todos los campos"
                    ) ||
                    availabilityResult.mensaje.includes(
                      "anterior a la fecha"
                    ) ||
                    availabilityResult.mensaje.includes("debe ser posterior")
                      ? "⚠️ Revise las fechas ingresadas"
                      : "Por favor intente con otras fechas o ajuste la cantidad de huéspedes"}
                  </div>
                )}
              </Alert>
            </Col>
          </Row>
        )}

        <Modal show={showAuthModal} onHide={handleCloseAuthModal} centered>
          <Modal.Header closeButton className="bg-secondary text-light">
            <Modal.Title>Autenticación Requerida</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <h5 className="mb-4">
              Debe iniciar sesión o registrarse para realizar una reserva
            </h5>
            <p className="text-muted mb-4">
              Para continuar con su reserva, por favor inicie sesión con su
              cuenta existente o créese una nueva.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Button
                variant="primary"
                className="px-4 fw-bold"
                onClick={handleGoToLogin}
                style={{ background: "#48c5b7", border: "none" }}
              >
                INICIAR SESIÓN
              </Button>
              <Button
                variant="outline-primary"
                className="px-4 fw-bold"
                onClick={handleGoToRegister}
                style={{ borderColor: "#48c5b7", color: "#48c5b7" }}
              >
                REGISTRARSE
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="secondary" onClick={handleCloseAuthModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
