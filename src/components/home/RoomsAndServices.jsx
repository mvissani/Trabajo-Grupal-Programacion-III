import React from "react";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomsAndServices.css";
import { useNavigate } from "react-router-dom";

const RoomsAndServices = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Habitación Single",
      images: [
        "https://ik.imagekit.io/rooxjlwlq/67a365202551b83be5ccc9ff_632986123555cf1091aec631_1-hotel-central-park-midtown-manhattan-new-york-room.webp?updatedAt=1760204906815",
      ],
    },
    {
      title: "Habitación Twin",
      images: [
        "https://ik.imagekit.io/rooxjlwlq/67a338e5190e12e757da12ef_63cfbd59f496487667d2a40e_six-senses-rome-five-star-hotel-italy-room.webp?updatedAt=1760204906742",
      ],
    },
    {
      title: "Habitación Triple",
      images: [
        "https://ik.imagekit.io/rooxjlwlq/67a365202551b83be5ccc9fc_63298612b0922e6d58ce173e_1-hotel-central-park-midtown-manhattan-new-york-bedroom.webp?updatedAt=1760204906386",
      ],
    },
    {
      title: "Servicios",
      images: [
        "https://ik.imagekit.io/rooxjlwlq/spa-hotel-roc-blanc-andorra-la-vella.webp?updatedAt=1759274319491",
      ],
    },
  ];

  return (
    <Container fluid className="py-5 px-5">
      <Row className="g-4 justify-content-center">
        {sections.map((section, index) => (
          <Col key={index} xl={3} lg={3} md={6} sm={12}>
            <Card className="room-card-xxxl shadow-lg border-0">
              <div className="image-container-xxxl">
                <Carousel controls={false} indicators={false} interval={3000}>
                  {section.images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <Card.Img
                        variant="top"
                        src={img}
                        alt={section.title}
                        className="room-img-xxxl"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <Card.Body className="text-center p-4">
                <Card.Title className="fw-semibold text-dark mb-4 fs-3">
                  {section.title}
                </Card.Title>
                <Button
                  variant="outline-success"
                  className="hotel-btn-secondary"
                  onClick={() => navigate("/rooms")}
                >
                  Reservar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoomsAndServices;
