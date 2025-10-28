import "../../App.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ErrorNotFound.css";

const ErrorNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-not-found-container">
      <div className="error-content">
        <div className="error-code">404</div>
        <h1 className="error-title">¡Ups! Página no encontrada</h1>
        <p className="error-message">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="error-buttons">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => navigate("/home")}
            className="error-btn"
          >
            🏠 Ir al Inicio
          </Button>
          <Button 
            variant="outline-secondary" 
            size="lg" 
            onClick={() => navigate(-1)}
            className="error-btn"
          >
            ⬅️ Volver Atrás
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotFound;