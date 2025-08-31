import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function Login() {
	const handleSubmit = (event) => {
		event.preventDefault();
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
									<Form.Group controlId="userName">
										<Form.Label className="text-center w-100">
											Ingrese su nombre de usuario
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Nombre de usuario"
											className="text-center w-100"
										/>
									</Form.Group>

									<Form.Group>
										<Form.Label className="text-center w-100">
											Ingrese su contraseña
										</Form.Label>
										<Form.Control
											type="text"
											placeholder="Contraseña"
											className="text-center w-100"
										/>
									</Form.Group>
									<Button type="submit" className="d-block mx-auto mt-3">
										Iniciar Sesión
									</Button>
								</Col>
							</Row>
						</form>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
}

export default Login;
