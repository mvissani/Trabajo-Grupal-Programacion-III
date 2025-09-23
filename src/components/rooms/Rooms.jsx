import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Table, Spinner, Alert } from "react-bootstrap";
import { getRooms } from "./Rooms.services";

const Rooms = () => {
  // Estados para manejar los datos de la API
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las habitaciones desde la API
  const cargarHabitaciones = () => { //agregado
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

  // Cargar habitaciones al montar el componente
  useEffect(() => {
    cargarHabitaciones();
  }, []);

  // Función para obtener la URL de la imagen
  const obtenerImagen = (imagenNombre) => { //agregado
    if (imagenNombre) {
      return `https://picsum.photos/400/200?random=${imagenNombre}`;
    }
    return "https://picsum.photos/400/200?random=default";
  };

  // Función para procesar los amenities (convertir string a array)
  const procesarAmenities = (amenitiesString) => {
    if (!amenitiesString) return [];
    return amenitiesString.split(',').map(amenity => amenity.trim());
  };

  // Mostrar spinner mientras carga
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

  // Mostrar error si hay algún problema
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

  // Mostrar mensaje si no hay habitaciones
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
              <Card.Img variant="top" src={obtenerImagen(hab.Imagen)} />
              <Card.Body>
                <Card.Title>{hab.Nombre}</Card.Title>
                <Card.Text>{hab.Texto}</Card.Text>
                <ul>
                  <li><strong>ID:</strong> {hab.Id}</li>
                  <li><strong>Número:</strong> {hab.RoomNo}</li>
                  <li><strong>Capacidad:</strong> {hab.Capacidad}</li>
                  <li><strong>Tipo:</strong> {hab.Tipo}</li>
                  <li><strong>Personas:</strong> {hab.Personas}</li>
                  <li><strong>Área:</strong> {hab.Area}</li>
                  <li><strong>Disponible:</strong> {hab.Disponible ? "Sí" : "No"}</li>
                </ul>
                <h6>Tarifas:</h6>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>SA</th>
                      <th>AD</th>
                      <th>MP</th>
                      <th>PC</th>
                      <th>AI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${hab.TarifaSA}</td>
                      <td>${hab.TarifaAD}</td>
                      <td>${hab.TarifaMP}</td>
                      <td>${hab.TarifaPC}</td>
                      <td>${hab.TarifaAI}</td>
                    </tr>
                  </tbody>
                </Table>
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
