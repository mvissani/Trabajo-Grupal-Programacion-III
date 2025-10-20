import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function Sponsors() {
  return (
    <div className="sponsors-section py-5"> 
      <Container>
        <Row className="align-items-center justify-content-center text-center g-4">
          <Col xs={12} md={4}>
            <Image
              src="https://ik.imagekit.io/rooxjlwlq/trivadvisor%20icono.png?updatedAt=1756901891004"
              alt="Sponsor 1"
              fluid
            />
          </Col>
          <Col xs={12} md={4}>
            <Image
              src="https://ik.imagekit.io/rooxjlwlq/Booking.Com-Logo-removebg-preview.png?updatedAt=1756930623925"
              alt="Sponsor 2"
              fluid
            />
          </Col>
          <Col xs={12} md={4}>
            <Image
              src="https://ik.imagekit.io/rooxjlwlq/LOGO-DESPEGAR-removebg-preview.png?updatedAt=1756932962867"
              alt="Sponsor 3"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
