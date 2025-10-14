import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function Reservation() {
	const location = useLocation();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		checkIn: "",
		checkOut: "",
		room_Id: "",
		guest: "",
		comments: "",
	});
	const bookingData = location.state?.bookingData || {};
	const availableRooms = location.state?.availabilityData || [];
	const selected = location.state?.selectedRoom || null;
	const navigate = useNavigate();
	const [Error, setError] = useState();

	useEffect(() => {
		const storedName = localStorage.getItem("user-name") || "";
		const storedEmail = localStorage.getItem("user-email") || "";

		setFormData({
			name: storedName,
			email: storedEmail,
			checkIn: bookingData.ingreso || "",
			checkOut: bookingData.egreso || "",
			room_Id: availableRooms?.habitaciones?.Id
				? availableRooms.habitaciones.Id
				: selected?.Id,
			guest: bookingData.guests || "",
			comments: "",
		});
	}, [selected]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/login", {
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer ${token}",
				},
				method: "POST",
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Error desconocido");
				return;
			}
			navigate("/home");
		} catch (err) {
			setError("Error de conexión con el servidor");
			console.error(err);
		}
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: "84.4vh" }}
		>
			<Card
				className="mb-3 w-75 bg-secondary text-white p-4 border-1 shadow"
				style={{ maxWidth: "700px" }}
			>
				<Card.Body>
					<Row>
						<Card.Title className="text-center fw-bold shadow fs-2 mb-4">
							Confirmar Reserva
						</Card.Title>

						<Form onSubmit={handleSubmit}>
							{/* Nombre */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">Nombre completo</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									placeholder="Ej. Juan Pérez"
									disabled
								/>
							</Form.Group>

							{/* Email */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">Correo electrónico</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="Ej. juan@email.com"
									disabled
								/>
							</Form.Group>

							{/* Fecha ingreso */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">Fecha de ingreso</Form.Label>
								<Form.Control
									type="date"
									name="checkIn"
									value={formData.checkIn}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Fecha egreso */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">Fecha de egreso</Form.Label>
								<Form.Control
									type="date"
									name="checkOut"
									value={formData.checkOut}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Habitación */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">
									Seleccionar habitación disponible
								</Form.Label>
								<Form.Select
									name="habitaciones"
									value={formData.habitaciones}
									onChange={handleChange}
								>
									<option value="">Seleccione una habitación...</option>

									{selected ? (
										<option value={selected.Id}>
											{selected.RoomNo} — {selected.Nombre} — {selected.Tipo} (
											{selected.Capacidad})
										</option>
									) : availableRooms ? (
										availableRooms.habitaciones.map((room) => (
											<option key={room.Id} value={room.Id}>
												{room.RoomNo} — {room.Nombre} — {room.Tipo} (
												{room.Capacidad})
											</option>
										))
									) : (
										<option disabled>No hay habitaciones disponibles</option>
									)}
								</Form.Select>
							</Form.Group>

							{/* Cantidad de huéspedes */}
							<Form.Group className="mb-3 text-center">
								<Form.Label className="w-100">Cantidad de huéspedes</Form.Label>
								<Form.Control
									type="number"
									name="guest"
									value={formData.guest}
									onChange={handleChange}
									min="1"
									placeholder="Ej. 2"
								/>
							</Form.Group>

							{/* Comentarios */}
							<Form.Group className="mb-4 text-center">
								<Form.Label className="w-100">
									Comentarios o requerimientos especiales
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									name="comments"
									value={formData.comments}
									onChange={handleChange}
									placeholder="Ej. Necesito cuna para bebé o vista al mar"
								/>
							</Form.Group>

							{/* Botón */}
							<Button
								type="submit"
								variant="light"
								className="d-block mx-auto px-4 py-2 fw-bold"
							>
								Confirmar Reserva
							</Button>
						</Form>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Reservation;
