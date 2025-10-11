import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { getRooms } from "./Rooms.services";
import "./Rooms.css"; // estilos personalizados

const Rooms = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarHabitaciones = () => {
    setLoading(true);
    setError(null);

    getRooms(
      (data) => {
        setHabitaciones(data);
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const obtenerImagen = (habitacion) => {
    if (habitacion.Imagen && habitacion.Imagen.trim() !== "") {
      return habitacion.Imagen;
    }
    return "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
  };

  const procesarAmenities = (amenitiesString) => {
    if (!amenitiesString) return [];
    if (Array.isArray(amenitiesString)) {
      return amenitiesString.map((amenity) => String(amenity).trim());
    }

    let processedString = String(amenitiesString).replace(/[\[\]]/g, "");
    return processedString
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando habitaciones disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error al cargar las habitaciones</Alert.Heading>
          <p>{error instanceof Error ? error.message : String(error)}</p>
          <Button variant="outline-danger" onClick={cargarHabitaciones}>
            Intentar de nuevo
          </Button>
        </Alert>
      </div>
    );
  }

  if (habitaciones.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
        <Alert variant="info" className="text-center">
          <Alert.Heading>No hay habitaciones disponibles</Alert.Heading>
          <p>No se encontraron habitaciones en este momento.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-uppercase fw-bold">
        Habitaciones Disponibles
      </h2>
      <Row className="g-4">
        {habitaciones.map((hab) => (
          <Col key={hab.Id} md={6} className="d-flex">
            <Card className="room-card flex-fill shadow-sm">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={obtenerImagen(hab)}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
                  }}
                  alt={`Imagen de ${hab.Nombre}`}
                  className="room-img"
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-primary fw-bold mb-2">
                    {hab.Nombre}
                  </Card.Title>
                  <Card.Text className="text-muted small mb-3">
                    {hab.Texto || "Una habitación ideal para tu descanso."}
                  </Card.Text>

                  <ul className="list-unstyled mb-3 text-secondary small">
                    <li>
                      <strong>🚪 Habitación N°:</strong> {hab.RoomNo}
                    </li>
                    <li>
                      <strong>Tipo:</strong> {hab.Tipo}
                    </li>
                    <li>
                      <strong>Capacidad:</strong> {hab.Capacidad} personas
                    </li>
                    <li>
                      <strong>Área:</strong> {hab.Area} m²
                    </li>
                    <li>
                      <strong>Disponible:</strong>{" "}
                      {hab.Disponible ? "Sí" : "No"}
                    </li>
                  </ul>

                  <h6 className="fw-semibold">Tarifa:</h6>
                  <p className="h5 text-success mb-3">
                    ${hab.Tarifa} / noche
                  </p>

                  <h6 className="fw-semibold">Amenities:</h6>
                  <ul className="list-inline small text-muted">
                    {procesarAmenities(hab.Amenities).map((amenity, idx) => (
                      <li key={idx} className="list-inline-item">
                        🛎 {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={hab.Disponible ? "primary" : "secondary"}
                  disabled={!hab.Disponible}
                  className="mt-3 w-100"
                >
                  {hab.Disponible ? "Reservar" : "No Disponible"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Rooms;
