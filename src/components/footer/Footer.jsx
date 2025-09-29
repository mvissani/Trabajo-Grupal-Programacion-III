import React from "react";
import "../../App.scss";

function Footer() {
  return (
    <footer className="bg-secondary text-light py-3 footer-sticky">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
        {}
        <div className="me-md-4 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start">
          <i className="fa-brands fa-cc-visa me-2 footer-icon"></i>
          <i className="fa-brands fa-cc-mastercard me-2 footer-icon"></i>
          <i className="fa-brands fa-cc-amex me-2 footer-icon"></i>
          <i className="fa-brands fa-cc-paypal footer-icon"></i>
        </div>
        {}
        <div className="position-absolute start-50 translate-middle-x text-center">
          © 2025 Starlight Hoteles. Todos los derechos reservados.
        </div>
        {}
        <div>
          <span className="d-inline-flex align-items-center justify-content-end">
            <i className="fa-solid fa-envelope me-1"></i> starlighthoteles@gmail.com
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
