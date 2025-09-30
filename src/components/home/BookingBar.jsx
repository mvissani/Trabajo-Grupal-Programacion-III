import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
    <div className="booking-bar py-2" style={{ background: "#5a4d44" }}>
      <Container fluid>
        <Form onSubmit={submit}>
          <Row className="g-0 justify-content-center text-center">
            
            
            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                INGRESO
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsCalendarEvent className="me-2" />
                <Form.Control
                  type="date"
                  value={form.ingreso}
                  onChange={handle("ingreso")}
                  className="border-0 bg-light p-0"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                EGRESO
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsCalendarEvent className="me-2" />
                <Form.Control
                  type="date"
                  value={form.egreso}
                  onChange={handle("egreso")}
                  className="border-0 bg-light p-0"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                HABITACIONES
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsHouseDoor className="me-2" />
                <Form.Control
                  type="number"
                  min={1}
                  value={form.rooms}
                  onChange={handle("rooms")}
                  className="border-0 bg-light p-0 text-center"
                />
              </div>
            </Col>

            <Col xs="auto" className="booking-box px-2">
              <Form.Label className="d-block fw-semibold small text-light">
                HUÉSPEDES
              </Form.Label>
              <div className="d-flex align-items-center bg-light px-2 py-1">
                <BsPerson className="me-2" />
                <Form.Control
                  type="number"
                  min={0}
                  value={form.guests}
                  onChange={handle("guests")}
                  className="border-0 bg-light p-0 text-center"
                />
              </div>
            </Col>

            <Col xs="auto" className="px-2">
              <Form.Label className="d-block">&nbsp;</Form.Label>
              <Button
                type="submit"
                className="px-4 fw-bold"
                style={{ background: "#48c5b7", border: "none" }}
              >
                BUSCAR
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
