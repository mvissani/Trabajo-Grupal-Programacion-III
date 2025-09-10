// Imports
import { Container, Row, Col } from "react-bootstrap";

// About Us
function AboutUs() {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center py-5 bg-light">
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8}>
          <h2 className="mb-4 text-center">Sobre Nosotros</h2>
          <p>
            Somos una cadena de hoteles surgida en la ciudad de Rosario, que en la
            actualidad también funciona en las ciudades de Buenos Aires, Córdoba y
            Mendoza.
          </p>
          <p>
            Cada uno de nuestros hoteles cuenta con una calificación de 5 estrellas y se
            encuentran ubicados en las zonas más céntricas y exclusivas para que nuestros
            visitantes puedan gozar de las mejores vistas de la ciudad.
          </p>
          <p>
            Nuestro principal objetivo es combinar la elegancia y modernidad para brindar
            a nuestros huéspedes una experiencia única y el máximo confort en cada una de
            sus visitas.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
