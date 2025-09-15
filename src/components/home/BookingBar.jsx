import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {
  BsGeoAlt,
  BsCalendarEvent,
  BsHouseDoor,
  BsPerson,
  BsTag,
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
            {/* INGRESO */}
            <Col xs="auto" className="booking-col">
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendarEvent />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={form.ingreso}
                  onChange={handle("ingreso")}
                  placeholder="INGRESO"
                />
              </InputGroup>
            </Col>

            {/* EGRESO */}
            <Col xs="auto" className="booking-col">
              <InputGroup>
                <InputGroup.Text>
                  <BsCalendarEvent />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={form.egreso}
                  onChange={handle("egreso")}
                  placeholder="EGRESO"
                />
              </InputGroup>
            </Col>

            {/* HABITACIONES */}
            <Col xs="auto" className="booking-col w-auto">
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
            </Col>

            {/* PERSONAS */}
            <Col xs="auto" className="booking-col w-auto">
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
            </Col>

            {/* BOTÓN */}
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
