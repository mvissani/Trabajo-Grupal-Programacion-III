import { Container, Row, Col, Image, Card } from "react-bootstrap";
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

export default function Reviews() {
  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col className="text-center">
          <h3 className="fw-bold">Opiniones de los huéspedes</h3>
          <div className="bg-primary text-white d-inline-block px-3 py-2 rounded">
            ⭐ 4.9 / 5 · {reviews.length} reseñas
          </div>
        </Col>
      </Row>
      <Row>
        {reviews.map((review, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{"⭐".repeat(review.rating)}</Card.Title>
                <Card.Text>"{review.text}"</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted text-end">
                - {review.author}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
