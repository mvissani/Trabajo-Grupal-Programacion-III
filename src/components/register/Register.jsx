import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Alert,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useNavigate } from "react-router";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    cellNumber: "",
    dni: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    cellNumber: "",
    dni: "",
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const validateField = (field, value) => {
    switch (field) {
      case "name":
      case "surname":
        if (!value.trim()) {
          return `${field === "name" ? "Nombre" : "Apellido"} es obligatorio`;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value.trim())) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } solo puede contener letras, espacios, guiones y apostrofes`;
        }

        if (value.trim().length < 2) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } debe tener al menos 2 caracteres`;
        }
        if (value.trim().length > 50) {
          return `${
            field === "name" ? "Nombre" : "Apellido"
          } no puede tener más de 50 caracteres`;
        }
        return "";
      case "email":
        if (!value.trim()) return "Email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Email debe ser válido";
        if (value.length > 100)
          return "Email no puede tener más de 100 caracteres";
        return "";
      case "cellNumber": {
        if (!value.trim()) return "Número de celular es obligatorio";

        const cleanNumber = value.replace(/\D/g, "");
        if (!/^\d{10,15}$/.test(cleanNumber)) {
          return "Número de celular debe tener entre 10 y 15 dígitos";
        }
        return "";
      }
      case "dni": {
        if (!value.trim()) return "DNI es obligatorio";

        const cleanDni = value.replace(/\D/g, "");
        if (!/^\d{7,8}$/.test(cleanDni)) {
          return "DNI debe tener entre 7 y 8 dígitos";
        }
        return "";
      }
      case "password":
        if (!value.trim()) return "Contraseña es obligatoria";
        if (value.length < 6) {
          return "La contraseña debe tener al menos 6 caracteres";
        }
        if (value.length > 50) {
          return "La contraseña no puede tener más de 50 caracteres";
        }
        return "";
      default:
        return "";
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "name" || name === "surname") {
      processedValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, "");
    }

    if (name === "cellNumber" || name === "dni") {
      processedValue = value.replace(/\D/g, "");
    }

    if (name === "email") {
      processedValue = value.toLowerCase().trim();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, processedValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) {
      console.log(
        "❌ [REGISTER] Errores de validación encontrados:",
        newErrors
      );
      return;
    }

    try {
      console.log("🚀 [REGISTER] Enviando datos de registro:", formData);

      const res = await fetch("http://localhost:3000/api/register", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📊 [REGISTER] Respuesta del servidor:", {
        status: res.status,
        data,
      });

      if (!res.ok) {
        console.error("❌ [REGISTER] Error en registro:", data.message);

        let errorMessage = "Error al registrar usuario. Inténtalo de nuevo.";
        
        if (data.message) {
          if (data.message.includes("Usuario existente") || data.message.includes("existente")) {
            errorMessage = "Este email ya está registrado. Por favor, usa otro email o inicia sesión.";
          } else if (data.message.includes("Email")) {
            errorMessage = "Error con el email. Verifica que sea válido.";
          } else if (data.message.includes("Contraseña")) {
            errorMessage = "Error con la contraseña. Debe tener al menos 6 caracteres.";
          } else if (data.message.includes("DNI")) {
            errorMessage = "Este DNI ya está registrado.";
          } else {
            errorMessage = data.message;
          }
        }
        
        showNotification(errorMessage, "danger");
        return;
      }

      console.log("✅ [REGISTER] Usuario registrado exitosamente");
      showNotification("Usuario registrado exitosamente. Redirigiendo al login...", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("❌ [REGISTER] Error de conexión:", err);
      showNotification("Error de conexión. Verifica que el servidor esté funcionando.", "danger");
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center register-container"
      >
        <Card
          style={{ width: "10rem" }}
          className="mb-3 w-50 register-card p-3 border-1 shadow"
        >
          <Card.Body className="justify-content-center border-1 ">
            <Card.Title className="text-center fw-bold shadow fs-2 text-dark">
              Registrarme
            </Card.Title>

            {notification.show && (
              <Alert
                variant={notification.type}
                dismissible
                onClose={() =>
                  setNotification({ show: false, message: "", type: "" })
                }
                className={`mb-4 register-alert alert-${notification.type}`}
              >
                {notification.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="text-center">
                    <Form.Label className="w-100 register-label">Ingrese su nombre</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Ej: Juan"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                      maxLength={50}
                    />
                    {errors.name && (
                      <p className="error-message">{errors.name}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="text-center">
                    <Form.Label className="w-100 register-label">Ingrese su apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="surname"
                      placeholder="Ej: Pérez"
                      onChange={handleChange}
                      value={formData.surname}
                      maxLength={50}
                    />
                    {errors.surname && (
                      <p className="error-message">{errors.surname}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="text-center">
                  <Form.Label className="w-100 register-label">Ingrese su número de celular</Form.Label>
                  <InputGroup className="register-input-group">
                    <InputGroupText>+54</InputGroupText>
                    <Form.Control
                      type="text"
                      name="cellNumber"
                      placeholder="Ej: 1123456789"
                      onChange={handleChange}
                      value={formData.cellNumber}
                      maxLength={15}
                    ></Form.Control>
                  </InputGroup>
                  {errors.cellNumber && (
                    <p className="error-message">{errors.cellNumber}</p>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="text-center">
                  <Form.Label className="w-100 register-label">Ingrese su DNI</Form.Label>
                  <Form.Control
                    placeholder="Ej: 12345678"
                    name="dni"
                    type="text"
                    onChange={handleChange}
                    value={formData.dni}
                    maxLength={8}
                  ></Form.Control>
                  {errors.dni && (
                    <p className="error-message">{errors.dni}</p>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="text-center">
                  <Form.Label className="w-100 register-label">Ingrese su email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ej: usuario@email.com"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    maxLength={100}
                  ></Form.Control>
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="text-center">
                  <Form.Label className="w-100 register-label">Ingrese su contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    maxLength={50}
                  ></Form.Control>
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </Form.Group>
              </Row>
              <Button
                type="submit"
                className="d-block mx-auto mt-3"
                onClick={handleSubmit}
              >
                Registrarme
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Register;
