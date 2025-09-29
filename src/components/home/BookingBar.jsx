import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {
  BsCalendarEvent,
  BsHouseDoor,
  BsPerson,
} from "react-icons/bs";

export default function BookingBar({ onSearch }) {
  const [form, setForm] = useState({
    ingreso: "",
    egreso: "",
    rooms: 1,
    guests: 0,
  });

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(form);
  };

  return (
    <div className="booking-bar">
      <Container>
        <Form onSubmit={submit}>
          <Row className="g-2 align-items-center flex-nowrap overflow-auto">
            
            <Col xs="auto" className="booking-col">
              <Form.Group controlId="formIngreso">
                <Form.Label>INGRESO</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <BsCalendarEvent />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={form.ingreso}
                    onChange={handle("ingreso")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            
            <Col xs="auto" className="booking-col">
              <Form.Group controlId="formEgreso">
                <Form.Label>EGRESO</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <BsCalendarEvent />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={form.egreso}
                    onChange={handle("egreso")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            
            <Col xs="auto" className="booking-col w-auto">
              <Form.Group controlId="formRooms">
                <Form.Label>HABITACIONES</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <BsHouseDoor />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min={1}
                    value={form.rooms}
                    onChange={handle("rooms")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            
            <Col xs="auto" className="booking-col w-auto">
              <Form.Group controlId="formGuests">
                <Form.Label>HUÉSPEDES</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <BsPerson />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min={0}
                    value={form.guests}
                    onChange={handle("guests")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            
            <Col xs="auto">
              <Button type="submit" className="search-btn">
                BUSCAR
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
