import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row ,Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import { UserTypeContext } from "../services/Auth/UserType.context";

function Login() {
  const { handleLogin } = useContext(AuthenticationContex);
  const { userTokenType } = useContext(UserTypeContext);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const navigate = useNavigate();
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  const validateField = (field, value) => {
    if (!value.trim()) {
      return `El campo ${field} es obligatorio`;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = data.message || "Error desconocido";
        setError("");
        showNotification(errorMessage, "danger");
        return;
      }
      handleLogin(data.token);
      localStorage.setItem(
        "user-name",
        data.user.name + " " + data.user.surname
      );
      localStorage.setItem("user-email", data.user.email);
      localStorage.setItem("user-dni", data.user.dni);
      userTokenType(data.token);
      showNotification("Inicio de sesión exitoso", "success");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setError("");
      showNotification("Error de conexión con el servidor", "danger");
      console.error(err);
    }
  };
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "84.4vh" }}
      >
        <Card
          style={{ width: "10rem" }}
          className="mb-3 w-50 bg-secondary text-white p-3 border-1 shadow"
        >
          <Card.Body className=" justify-content-center border-1 ">
            {notification.show && (
              <Alert
                variant={notification.type}
                dismissible
                onClose={() =>
                  setNotification({ show: false, message: "", type: "" })
                }
                className="mb-4"
              >
                {notification.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Row>
                <Card.Title className="text-center fw-bold shadow fs-2">
                  Iniciar Sesión
                </Card.Title>

                <Col>
                  <Form.Group controlId="userName" className="text-center">
                    <Form.Label className="text-center w-100">
                      Ingrese su nombre de usuario
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      className={error.email && "bg-warning"}
                      name="email"
                      onChange={handleChange}
                    />
                    {error.email && (
                      <p className="mt-2 text-danger">{error.email}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="text-center w-100">
                    <Form.Label className="text-center w-100">
                      Ingrese su contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      className={error.password && "bg-warning"}
                      name="password"
                      onChange={handleChange}
                    />
                    <p className="mt-2 text-danger">{error.password}</p>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="d-block mx-auto mt-3"
                    onClick={handleSubmit}
                  >
                    Iniciar Sesión
                  </Button>
                </Col>
              </Row>
            </form>
            <h3 className="text-center">
              No tienes cuenta?{" "}
              <Button
                className="d-block mx-auto mt-3"
                onClick={navigateToRegister}
              >
                Registrate
              </Button>
            </h3>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
