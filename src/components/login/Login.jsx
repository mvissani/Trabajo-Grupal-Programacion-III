import { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import AuthenticationContextProvider from "../services/Auth/AuthContextProvider";

function Login() {
	const { handleLogin } = useContext(AuthenticationContex);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

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
				setError(data.message || "Error desconocido");
				return;
			}
			handleLogin(data);
			navigate("/reservation");
		} catch (err) {
			setError("Error de conexión con el servidor");
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
											type="text"
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
