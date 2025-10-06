import {
	Button,
	Card,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";

function Reservation() {
	return (
		<div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
			<Card
				className="shadow-lg p-4 rounded-4"
				style={{ maxWidth: "500px", width: "100%" }}
			>
				<Card.Body>
					<Card.Title className="text-center mb-4 fs-3 fw-semibold text-primary">
						Reserva tu Habitación 🏨
					</Card.Title>

					<Form>
						<Form.Group className="mb-3">
							<Form.Label className="fw-semibold">
								Selecciona una habitación
							</Form.Label>
							<Form.Select>
								<option value="">-- Elegir habitación --</option>
								{/* Opciones dinámicas acá */}
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label className="fw-semibold">Cantidad de días</Form.Label>
							<InputGroup>
								<Button variant="outline-secondary">–</Button>
								<Form.Control
									type="number"
									min="1"
									className="text-center"
									placeholder="1"
								/>
								<Button variant="outline-secondary">+</Button>
							</InputGroup>
						</Form.Group>

						<Row className="mt-4">
							<Col className="d-flex justify-content-center">
								<Button
									type="submit"
									variant="primary"
									className="px-4 py-2 fw-semibold rounded-3"
								>
									Confirmar Reserva
								</Button>
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}

export default Reservation;
