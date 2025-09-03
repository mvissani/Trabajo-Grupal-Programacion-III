import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function Patrocinadores() {
  return (
    <div className="patrocinadores-section py-5">
      <Container>
        <Row className="align-items-center justify-content-center text-center g-4">
          <Col xs={12} md={4}>
            <Image
              src="https://ik.imagekit.io/rooxjlwlq/trivadvisor%20icono.png?updatedAt=1756901891004"
              alt="Patrocinador 1"
              fluid
            />
          </Col>
          <Col xs={12} md={4}>
            <Image
              src="https://via.placeholder.com/200x100?text=Logo+2"
              alt="Patrocinador 2"
              fluid
            />
          </Col>
          <Col xs={12} md={4}>
            <Image
              src="https://via.placeholder.com/200x100?text=Logo+3"
              alt="Patrocinador 3"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}