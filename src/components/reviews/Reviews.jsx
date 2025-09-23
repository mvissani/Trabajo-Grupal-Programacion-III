// Imports
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const reviews = [
  {
    rating: 5,
    text: "La estadía en el Starlight Hotel fue increíble. Habitaciones modernas, limpias y con una vista espectacular. El personal siempre atento. Sin dudas volveré.",
    author: "Carolina M.",
  },
  {
    rating: 5,
    text: "Muy buena ubicación, cerca de todo en el centro. El desayuno variado y abundante. Excelente atención.",
    author: "Andrés L.",
  },
  {
    rating: 5,
    text: "Excelente servicio. El spa y la piscina son un lujo, ideales para relajarse después de recorrer la ciudad. Lo recomiendo al 100%.",
    author: "Florencia T.",
  },
];


function Reviews() {
  return (
    <Container className="my-5">
      <Row className="mb-5 text-center">
        <Col>
          <h3 className="fw-bold reviews-title">Opiniones de nuestros huéspedes:</h3>
          <div className="reviews-subtitle px-3 py-2 rounded">
            ⭐ 4.9 / 5 - {reviews.length} reseñas
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Carousel interval={5000} indicators={true} controls={true}>
            {reviews.map((review, index) => (
              <Carousel.Item key={index}>
                <div className="review-card-wrapper">
                  <Card className="review-card-full shadow-sm">
                    <Card.Body>
                      <Card.Title className="review-stars">
                        {"⭐".repeat(review.rating)}
                      </Card.Title>
                      <Card.Text className="review-text">
                        "{review.text}"
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="review-author">
                      - {review.author}
                    </Card.Footer>
                  </Card>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

export default Reviews;
