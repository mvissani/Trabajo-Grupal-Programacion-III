import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsTelephone, BsWhatsapp, BsGeoAlt, BsEnvelope } from "react-icons/bs";
import hotelName from "../../images/hotel-name.png";
import "../../App.scss";

function Footer() {
  return (
    <footer className="bg-secondary text-light py-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold">Starlight Hotel</h5>
            <p className="mb-1">
              <BsTelephone /> +54 0800 111 0000
            </p>
            <p className="mb-1">
              <BsWhatsapp /> +54 341 4223456
            </p>
            <p className="mb-1">
              <BsGeoAlt /> Bv Oroño 1234
            </p>
            <p className="mb-0">
              <BsEnvelope /> starlighthoteles@gmail.com
            </p>
          </Col>

          <Col md={4} className="text-center mb-4 mb-md-0">
            <img
              src={hotelName}
              alt="Hotel Logo"
              style={{ maxWidth: "180px" }}
              className="mb-2"
            />
            <p className="small">Hotels and Resorts</p>
          </Col>

        
        </Row>

        <Row className="pt-4 mt-4 border-top">
          <Col className="text-center small">
            <div className="mb-2">
              <i className="fa-brands fa-cc-visa me-2"></i>
              <i className="fa-brands fa-cc-mastercard me-2"></i>
              <i className="fa-brands fa-cc-amex me-2"></i>
              <i className="fa-brands fa-cc-paypal"></i>
            </div>
            <p className="mb-0">
              © 2025 Starlight Hotel. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
