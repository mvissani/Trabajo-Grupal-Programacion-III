import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import { getRooms } from "./Rooms.services";

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

    let processedString = String(amenitiesString);

    processedString = processedString.replace(/[\[\]]/g, "");

    return processedString
      .split(",")
      .map((amenity) => amenity.trim())
      .filter((amenity) => amenity.length > 0);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando habitaciones...</span>
        </Spinner>
        <p className="mt-2">Cargando habitaciones disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
        <Alert variant="danger">
          <Alert.Heading>Error al cargar las habitaciones</Alert.Heading>
          <p>{error instanceof Error ? error.message : String(error)}</p>
          <hr />
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
        <Alert variant="info">
          <Alert.Heading>No hay habitaciones disponibles</Alert.Heading>
          <p>No se encontraron habitaciones en este momento.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
      <Row>
        {habitaciones.map((hab) => (
          <Col key={hab.Id} md={6} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={obtenerImagen(hab)}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
                }}
                alt={`Imagen de ${hab.Nombre}`}
              />
              <Card.Body>
                <Card.Title>{hab.Nombre}</Card.Title>
                <Card.Text>{hab.Texto}</Card.Text>
                <ul>
                  <li>
                    <strong>ID:</strong> {hab.Id}
                  </li>
                  <li>
                    <strong>Número:</strong> {hab.RoomNo}
                  </li>
                  <li>
                    <strong>Capacidad:</strong> {hab.Capacidad}
                  </li>
                  <li>
                    <strong>Tipo:</strong> {hab.Tipo}
                  </li>
                  <li>
                    <strong>Personas:</strong> {hab.Personas}
                  </li>
                  <li>
                    <strong>Área:</strong> {hab.Area}
                  </li>
                  <li>
                    <strong>Disponible:</strong> {hab.Disponible ? "Sí" : "No"}
                  </li>
                </ul>
                <h6>Tarifa:</h6>
                <p className="h4 text-primary">${hab.Tarifa} / noche</p>
                <h6>Amenities:</h6>
                <ul>
                  {procesarAmenities(hab.Amenities).map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))}
                </ul>
                <Button
                  variant={hab.Disponible ? "primary" : "secondary"}
                  disabled={!hab.Disponible}
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
