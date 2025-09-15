import React from "react";
import { Card, Button, Row, Col, Table } from "react-bootstrap";

const Rooms = () => {
  // Datos principales de habitaciones
  const habitaciones = [
    {
      id: 1,
      nombre: "Habitación Deluxe Single",
      personas: 1,
      capacidad: "Single",
      tipo: "Deluxe",
      texto: "Ideal para viajeros solos, equipada con todas las comodidades.",
      area: "25 m²",
    },
    {
      id: 2,
      nombre: "Habitación Suite Twin",
      personas: 2,
      capacidad: "Twin",
      tipo: "Suite",
      texto: "Perfecta para dos personas, con dos camas y espacio cómodo.",
      area: "35 m²",
    },
    {
      id: 3,
      nombre: "Habitación Deluxe Triple",
      personas: 3,
      capacidad: "Triple",
      tipo: "Deluxe",
      texto: "Con capacidad para tres, ideal para familias o amigos.",
      area: "40 m²",
    },
    {
      id: 4,
      nombre: "Habitación Suite Single",
      personas: 1,
      capacidad: "Single",
      tipo: "Suite",
      texto: "Una suite individual de lujo, para máxima comodidad.",
      area: "28 m²",
    },
    {
      id: 5,
      nombre: "Habitación Deluxe Twin",
      personas: 2,
      capacidad: "Twin",
      tipo: "Deluxe",
      texto: "Habitación elegante para dos personas, con estilo moderno.",
      area: "32 m²",
    },
    {
      id: 6,
      nombre: "Habitación Suite Triple",
      personas: 3,
      capacidad: "Triple",
      tipo: "Suite",
      texto: "Amplia suite para grupos de tres, con todas las comodidades.",
      area: "45 m²",
    },
  ];

  // Imágenes asociadas
  const imagenes = {
    1: "https://picsum.photos/400/200?random=1",
    2: "https://picsum.photos/400/200?random=2",
    3: "https://picsum.photos/400/200?random=3",
    4: "https://picsum.photos/400/200?random=4",
    5: "https://picsum.photos/400/200?random=5",
    6: "https://picsum.photos/400/200?random=6",
  };

  // Tarifas
  const tarifas = {
    1: { SA: 50, AD: 65, MP: 90, PC: 120, AI: 150 },
    2: { SA: 80, AD: 100, MP: 130, PC: 160, AI: 200 },
    3: { SA: 120, AD: 150, MP: 180, PC: 220, AI: 260 },
    4: { SA: 70, AD: 90, MP: 120, PC: 150, AI: 180 },
    5: { SA: 90, AD: 110, MP: 140, PC: 180, AI: 220 },
    6: { SA: 140, AD: 170, MP: 210, PC: 250, AI: 300 },
  };

  // Amenities
  const amenitys = {
    1: ["WiFi gratuito", "Desayuno incluido", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte", "Minibar", "Servicio de limpieza"],
    2: ["WiFi gratuito", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte", "Minibar", "Servicio de limpieza"],
    3: ["WiFi gratuito", "Desayuno incluido", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte", "Servicio de limpieza"],
    4: ["WiFi gratuito", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte", "Minibar", "Servicio de limpieza"],
    5: ["WiFi gratuito", "Desayuno incluido", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte"],
    6: ["WiFi gratuito", "Desayuno incluido", "Aire acondicionado", "Televisión", "Baño privado", "Caja fuerte", "Minibar"],
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Habitaciones Disponibles</h2>
      <Row>
        {habitaciones.map((hab) => (
          <Col key={hab.id} md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src={imagenes[hab.id]} />
              <Card.Body>
                <Card.Title>{hab.nombre}</Card.Title>
                <Card.Text>{hab.texto}</Card.Text>
                <ul>
                  <li><strong>ID:</strong> {hab.id}</li>
                  <li><strong>Capacidad:</strong> {hab.capacidad}</li>
                  <li><strong>Tipo:</strong> {hab.tipo}</li>
                  <li><strong>Personas:</strong> {hab.personas}</li>
                  <li><strong>Área:</strong> {hab.area}</li>
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
                      <td>${tarifas[hab.id].SA}</td>
                      <td>${tarifas[hab.id].AD}</td>
                      <td>${tarifas[hab.id].MP}</td>
                      <td>${tarifas[hab.id].PC}</td>
                      <td>${tarifas[hab.id].AI}</td>
                    </tr>
                  </tbody>
                </Table>
                <h6>Amenities:</h6>
                <ul>
                  {amenitys[hab.id].map((am, idx) => (
                    <li key={idx}>{am}</li>
                  ))}
                </ul>
                <Button variant="primary">Reservar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Rooms;
