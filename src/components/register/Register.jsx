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

function Register() {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [cellNumber, setCellNumbre] = useState("");
	const [Dni, setDni] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setError] = useState({
		names: false,
		surname: false,
		cellNumber: false,
		Dni: false,
		email: false,
		errorType: "",
	});
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const handleNameChange = (e) => {
		setName(e.target.value);

		if (basicErrors(e.target.value)) {
			setError((prev) => ({
				...prev,
				names: true,
				errorType: "Debe ingresar un nombre",
			}));
		}
	};

	const handleSurnameChange = (e) => {
		setSurname(e.target.value);

		if (basicErrors(e.target.value)) {
			setError((prev) => ({
				...prev,
				surname: true,
				errorType: "Debe ingresar un apellido",
			}));
		}
	};

	const handleCellChange = (e) => {
		setCellNumbre(e.target.value);

		if (basicErrors(e.target.value)) {
			setError((prev) => ({
				...prev,
				cellNumber: true,
				errorType: "Debe ingresar un numero celular",
			}));
		}
	};

	const handleDniChange = (e) => {
		setDni(e.target.value);

		if (basicErrors(e.target.value)) {
			setError((prev) => ({
				...prev,
				Dni: true,
				errorType: "Debe ingresar un DNI",
			}));
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);

		if (basicErrors(e.target.value)) {
			setError((prev) => ({
				...prev,
				email: true,
				errorType: "Debe ingresar un email",
			}));
		}
	};

	const basicErrors = (value) => {
		setError((prev) => ({
			...prev,
			names: false,
			surname: false,
			cellNumber: false,
			Dni: false,
			email: false,
			errorType: "",
		}));
		return !value ? true : false;
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
											className={errors.names && "bg-warning"}
											onChange={handleNameChange}
											value={name}
										/>
										{errors.names && (
											<p className="mt-2 text-danger">{errors.errorType}</p>
										)}
									</Form.Group>
								</Col>
								<Col>
									<Form.Group>
										<Form.Label>Ingrese su apellido</Form.Label>
										<Form.Control
											type="text"
											placeholder="Apellido"
											className={errors.surname && "bg-warning"}
											onChange={handleSurnameChange}
											value={surname}
										/>
										{errors.surname && (
											<p className="mt-2 text-danger">{errors.errorType}</p>
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
											type="email"
											placeholder="Ingrese su numero"
											className={errors.cellNumber && "bg-warning"}
											onChange={handleCellChange}
											value={cellNumber}
										></Form.Control>
										<br></br>
										{errors.cellNumber && (
											<p className="mt-2 text-danger">{errors.errorType}</p>
										)}
									</InputGroup>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su DNI</Form.Label>
									<Form.Control
										placeholder="DNI"
										type="text"
										onChange={handleDniChange}
										value={Dni}
										className={errors.Dni && "bg-warning"}
									></Form.Control>
									{errors.Dni && (
										<p className="mt-2 text-danger">{errors.errorType}</p>
									)}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group>
									<Form.Label>Ingrese su email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Email"
										onChange={handleEmailChange}
										value={email}
										className={errors.email && "bg-warning"}
									></Form.Control>
									{errors.email && (
										<p className="mt-2 text-danger">{errors.errorType}</p>
									)}
								</Form.Group>
							</Row>
							<Button
								type="submit"
								className=" text-light bg-dark fc-black d-block mx-auto mt-3"
							>
								Iniciar Sesión
							</Button>
						</form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}

export default Register;
