import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

function Register() {
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "84.4vh" }}
      >
        <Card
          style={{ width: "10rem" }}
          className="mb-3 w-50 bg-dark text-white p-3 border-1 shadow"
        >
          <Card.Body className="justify-content-center border-1 ">
            <Card.Title className="text-center fw-bold shadow fs-2">
              Registrarme
            </Card.Title>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Ingrese su nombre</Form.Label>
                  <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Ingrese su apellido</Form.Label>
                  <Form.Control type="text" placeholder="Apellido" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Ingrese su número de celular</Form.Label>
                <InputGroup>
                  <InputGroupText>+54</InputGroupText>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su numero"
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Ingrese su DNI</Form.Label>
                <Form.Control placeholder="DNI" type="text"></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Ingrese su email</Form.Label>
                <Form.Control type="email" placeholder="Email"></Form.Control>
              </Form.Group>
            </Row>
            <Button
              type="submit"
              className=" text-light bg-dark fc-black d-block mx-auto mt-3"
            >
              Iniciar Sesión
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Register;
