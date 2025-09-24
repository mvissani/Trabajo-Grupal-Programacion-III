import { useState } from "react";
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
import { useNavigate } from "react-router";

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

		setErrors((prev) => ({
			...prev,
			[name]: validateField(name, value),
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = Object.keys(formData).reduce((acc, key) => {
			acc[key] = validateField(key, formData[key]);
			return acc;
		}, {});

		setErrors(newErrors);

		if (Object.values(newErrors).some((err) => err !== "")) return;

		try {
			const res = await fetch("http://localhost:3000/register", {
				headers: { "Content-Type": "application/json" },
				method: "POST",
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				console.error(data.message);
				return;
			}

			navigate("/login");
		} catch (err) {
			console.error("Error al registrar:", err);
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
					className="mb-3 w-50 bg-dark text-white p-3 border-1 shadow"
				>
					<Card.Body className="justify-content-center border-1 ">
						<Card.Title className="text-center fw-bold shadow fs-2">
							Registrarme
						</Card.Title>
						<form onSubmit={handleSubmit}>
							<Row>
								<Col>
									<Form.Group>
										<Form.Label>Ingrese su nombre</Form.Label>

										<Form.Control
											type="text"
											placeholder="Nombre"
											className={errors.name && "bg-warning"}
											onChange={handleChange}
											name="name"
											value={formData.name}
										/>
										{errors.name && (
											<p className="mt-2 text-danger">{errors.name}</p>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label>Ingrese su apellido</Form.Label>
										<Form.Control
											type="text"
											name="surname"
											placeholder="Apellido"
											className={errors.surname && "bg-warning"}
											onChange={handleChange}
											value={formData.surname}
										/>
										{errors.surname && (
											<p className="mt-2 text-danger">{errors.surname}</p>
										)}
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su número de celular</Form.Label>
									<InputGroup>
										<InputGroupText>+54</InputGroupText>
										<Form.Control
											type="text"
											name="cellNumber"
											placeholder="Ingrese su numero"
											className={errors.cellNumber && "bg-warning"}
											onChange={handleChange}
											value={formData.cellNumber}
										></Form.Control>
										<br></br>
										{errors.cellNumber && (
											<p className="mt-2 text-danger">{errors.cellNumber}</p>
										)}
									</InputGroup>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su DNI</Form.Label>
									<Form.Control
										placeholder="DNI"
										name="dni"
										type="text"
										onChange={handleChange}
										value={formData.dni}
										className={errors.dni && "bg-warning"}
									></Form.Control>
									{errors.dni && (
										<p className="mt-2 text-danger">{errors.dni}</p>
									)}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Email"
										name="email"
										onChange={handleChange}
										value={formData.email}
										className={errors.email && "bg-warning"}
									></Form.Control>
									{errors.email && (
										<p className="mt-2 text-danger">{errors.email}</p>
									)}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su contraseña</Form.Label>
									<Form.Control
										type="password"
										placeholder="contraseña"
										name="password"
										onChange={handleChange}
										value={formData.password}
										className={errors.password && "bg-warning"}
									></Form.Control>
									{errors.password && (
										<p className="mt-2 text-danger">{errors.password}</p>
									)}
								</Form.Group>
							</Row>
							<Button
								type="submit"
								className=" text-light bg-dark fc-black d-block mx-auto mt-3"
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
