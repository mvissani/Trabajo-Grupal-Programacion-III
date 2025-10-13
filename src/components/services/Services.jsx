import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUtensils, FaDumbbell, FaSpa, FaSwimmer, FaCocktail, FaConciergeBell, FaHotTub } from "react-icons/fa";
import "./Services.css";

const services = [
  { title: "Restaurante", description: "Alta cocina internacional con vista panorámica.", icon: <FaUtensils />, img: "https://ik.imagekit.io/rooxjlwlq/intercontinental-buenos-aires-3613454368-2x1.jpeg?updatedAt=1759175197436" },
  { title: "Gimnasio", description: "Equipado con la última tecnología fitness.", icon: <FaDumbbell />, img: "https://ik.imagekit.io/rooxjlwlq/24-hours-gym-r0lg4mkl4m.jpeg?updatedAt=1759175524156" },
  { title: "Spa", description: "Masajes y tratamientos relajantes.", icon: <FaSpa />, img: "https://ik.imagekit.io/rooxjlwlq/Industry_Spa_Software_Fresha.b66df7eb.avif?updatedAt=1759175940203" },
  { title: "Pileta", description: "Piscina climatizada con vista panorámica.", icon: <FaSwimmer />, img: "https://ik.imagekit.io/rooxjlwlq/Spa-InterContinental-Buenos-Aires-Pileta-3.jpg?updatedAt=1759175290150" },
  { title: "Bar & Lounge", description: "Cócteles exclusivos y ambiente sofisticado.", icon: <FaCocktail />, img: "https://ik.imagekit.io/rooxjlwlq/hotel-bar.jpg?updatedAt=1759176612000" },
  { title: "Recepción Premium", description: "Atención personalizada 24/7.", icon: <FaConciergeBell />, img: "https://ik.imagekit.io/rooxjlwlq/hotel-lobby.jpg?updatedAt=1759176700000" },
  { title: "Jacuzzi", description: "Relajación con vista panorámica.", icon: <FaHotTub />, img: "https://ik.imagekit.io/rooxjlwlq/hotel_with_jacuzzi.jpg?updatedAt=1759175717622" },
];

function ServicesModern() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold text-success">Nuestros Servicios</h2>
      <Row className="g-4">
        {services.map((service, index) => (
          <Col key={index} xl={4} lg={6} md={6} sm={12}>
            <Card className="service-card h-100 shadow-sm border-0">
              <div className="card-img-container">
                <Card.Img variant="top" src={service.img} className="service-card-img" />
                <div className="card-overlay">
                  <div className="overlay-content">
                    <div className="service-icon">{service.icon}</div>
                    <h5 className="text-white mt-2">{service.title}</h5>
                    <p className="text-white">{service.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ServicesModern;
