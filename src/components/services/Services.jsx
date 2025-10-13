import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import {
  FaUtensils,
  FaDumbbell,
  FaSpa,
  FaSwimmer,
  FaTshirt,
  FaBuilding,
} from "react-icons/fa";
import "./Services.css";

const services = [
  {
    title: "Restaurante",
    description: "Alta cocina internacional con vista panorámica.",
    icon: <FaUtensils aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/intercontinental-buenos-aires-3613454368-2x1.jpeg?updatedAt=1759175197436",
  },
  {
    title: "Gimnasio",
    description: "Equipado con la última tecnología fitness.",
    icon: <FaDumbbell aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/24-hours-gym-r0lg4mkl4m.jpeg?updatedAt=1759175524156",
  },
  {
    title: "Spa",
    description: "Masajes y tratamientos relajantes.",
    icon: <FaSpa aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/Industry_Spa_Software_Fresha.b66df7eb.avif?updatedAt=1759175940203",
  },
  {
    title: "Pileta",
    description: "Piscina climatizada con vista panorámica.",
    icon: <FaSwimmer aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/Spa-InterContinental-Buenos-Aires-Pileta-3.jpg?updatedAt=1759175290150",
  },
  {
    title: "Lavandería",
    description: "Servicio de lavado y planchado en el día.",
    icon: <FaTshirt aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/washwoman-mayor-en-el-lavadero-109389985.webp?updatedAt=1760325067641",
  },
  {
    title: "Centro de Convenciones",
    description: "Salones modulares con equipamiento audiovisual.",
    icon: <FaBuilding aria-hidden="true" />,
    img: "https://ik.imagekit.io/rooxjlwlq/1-5.jpg?updatedAt=1760325202895",
  },
];

function ServicesModern() {
  return (
    <>
    
      <Carousel className="mb-5">
        {services.map((s) => (
          <Carousel.Item key={`slide-${s.title}`}>
            <img
              className="carousel-img"
              src={s.img}
              alt={s.title}
              decoding="async"
            />
            <Carousel.Caption>
              <h3>{s.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold text-success">Nuestros Servicios</h2>
        <Row className="g-4">
          {services.map((service) => (
            <Col key={service.title} xl={4} lg={6} md={6} sm={12}>
              <Card className="service-card h-100 shadow-sm border-0">
                <div className="card-img-container">
                  <Card.Img
                    variant="top"
                    src={service.img}
                    className="service-card-img"
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                  />
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
    </>
  );
}

export default ServicesModern;