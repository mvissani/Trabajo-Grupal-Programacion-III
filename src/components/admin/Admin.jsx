import { useState, useEffect, useContext } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import {
	Container,
	Row,
	Col,
	Card,
	Form,
	Button,
	Alert,
	Tab,
	Tabs,
	Table,
	Badge,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { getRooms } from "../rooms/Rooms.services";
import {
	createRoom,
	updateRoom,
	deleteRoom,
	getServices,
	createService,
	updateService,
	deleteService,
	restoreService,
} from "./Admin.services";
import { AuthenticationContex } from "../services/Auth/Auth.context";

function Admin() {
	const [queryEmail, setQueryEmail] = useState("");
	const [queryUser, setQueryUser] = useState({
		Name: "",
		email: "",
		class: "",
	});
	const [newRole, setNewRole] = useState("");
	const [emailError, setEmailError] = useState("");
	const { token } = useContext(AuthenticationContex);
	const [adminToken, setAdminToken] = useState(null);

	const handleEmailSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/admin/searchemail", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
				body: JSON.stringify({ email: queryEmail }),
			});
			const data = await res.json();

			if (!res.ok) {
				setEmailError(data.message || "Error desconocido");
				return;
			}

			setAdminToken(data.token);
			const decodedToken = jwtDecode(adminToken);
			setQueryUser({
				Name: data.user.name,
				email: data.user.email,
				class: decodedToken.typeUser,
			});
		} catch (err) {
			setEmailError("Error de conexión con el servidor");
			console.error(err);
		}
	};
	const handleUpdateRole = () => {};

	const [formData, setFormData] = useState({
		RoomNo: "",
		Nombre: "",
		Personas: "",
		Capacidad: "Single",
		Tipo: "Deluxe",
		Texto: "",
		Area: "",
		Imagen: "",
		Tarifa: "",
		Amenities: "",
		Disponible: true,
	});

	const [serviceFormData, setServiceFormData] = useState({
		title: "",
		description: "",
		icon: "",
		img: "",
		isActive: true,
	});

	const [errors, setErrors] = useState({});
	const [serviceErrors, setServiceErrors] = useState({});
	const [notification, setNotification] = useState({
		show: false,
		message: "",
		type: "",
	});
	const [rooms, setRooms] = useState([]);
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editingRoom, setEditingRoom] = useState(null);
	const [editingService, setEditingService] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingService, setIsEditingService] = useState(false);
	const [activeTab, setActiveTab] = useState("add-room");

	const validateField = (field, value) => {
		const requiredFields = [
			"RoomNo",
			"Nombre",
			"Personas",
			"Capacidad",
			"Tipo",
			"Tarifa",
		];

		if (requiredFields.includes(field) && !value.toString().trim()) {
			return `El campo ${field} es obligatorio`;
		}

		if (field === "Personas" && (isNaN(value) || parseInt(value) <= 0)) {
			return `La cantidad de personas debe ser un número mayor a 0`;
		}

		if (field === "RoomNo" && (isNaN(value) || parseInt(value) <= 0)) {
			return `El número de habitación debe ser un número mayor a 0`;
		}

		if (field === "Area" && value && (isNaN(value) || parseFloat(value) <= 0)) {
			return `El área debe ser un número mayor a 0`;
		}

		if (
			field === "Tarifa" &&
			value &&
			(isNaN(value) || parseFloat(value) < 0)
		) {
			return "La tarifa debe ser un número mayor o igual a 0";
		}

		return "";
	};

	const validateServiceField = (field, value) => {
		const requiredFields = ["title", "description", "img"];

		if (requiredFields.includes(field) && !value.toString().trim()) {
			return `El campo ${field} es obligatorio`;
		}

		if (field === "img" && value && !value.match(/^https?:\/\/.+\..+/)) {
			return "La URL de la imagen debe ser válida (http:// o https://)";
		}

		return "";
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		let processedValue = value;
		if (type === "checkbox") {
			processedValue = checked;
		} else if (type === "number") {
			processedValue = value === "" ? "" : parseFloat(value);
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

	const handleServiceChange = (e) => {
		const { name, value, type, checked } = e.target;

		let processedValue = value;
		if (type === "checkbox") {
			processedValue = checked;
		}

		setServiceFormData((prev) => ({
			...prev,
			[name]: processedValue,
		}));

		setServiceErrors((prev) => ({
			...prev,
			[name]: validateServiceField(name, processedValue),
		}));
	};

	const showNotification = (message, type) => {
		setNotification({ show: true, message, type });
		setTimeout(() => {
			setNotification({ show: false, message: "", type: "" });
		}, 5000);
	};

	const resetForm = () => {
		setFormData({
			RoomNo: "",
			Nombre: "",
			Personas: "",
			Capacidad: "Single",
			Tipo: "Deluxe",
			Texto: "",
			Area: "",
			Imagen: "",
			Tarifa: "",
			Amenities: "",
			Disponible: true,
		});
		setErrors({});
		setIsEditing(false);
		setEditingRoom(null);
	};

	const resetServiceForm = () => {
		setServiceFormData({
			title: "",
			description: "",
			icon: "",
			img: "",
			isActive: true,
		});
		setServiceErrors({});
		setIsEditingService(false);
		setEditingService(null);
	};

	const handleEditRoom = (room) => {
		setEditingRoom(room);
		setIsEditing(true);
		setFormData({
			RoomNo: room.RoomNo,
			Nombre: room.Nombre,
			Personas: room.Personas,
			Capacidad: room.Capacidad,
			Tipo: room.Tipo,
			Texto: room.Texto || "",
			Area: room.Area || "",
			Imagen: room.Imagen || "",
			Tarifa: room.Tarifa,
			Amenities: room.Amenities || "",
			Disponible: room.Disponible,
		});
		setErrors({});

		setActiveTab("add-room");
	};

	const handleCancelEdit = () => {
		resetForm();
	};

	const handleEditService = (service) => {
		setEditingService(service);
		setIsEditingService(true);
		setServiceFormData({
			title: service.title,
			description: service.description,
			icon: service.icon || "",
			img: service.img,
			isActive: service.isActive,
		});
		setServiceErrors({});
		setActiveTab("add-service");
	};

	const handleCancelEditService = () => {
		resetServiceForm();
	};

	const handleDeleteRoom = (room) => {
		const confirmMessage = `¿Estás seguro de que quieres eliminar la habitación "${room.Nombre}" (ID: ${room.Id})?\n\nEsta acción no se puede deshacer.`;

		if (window.confirm(confirmMessage)) {
			setLoading(true);

			deleteRoom(
				room.Id,
				() => {
					setLoading(false);
					showNotification("¡Habitación eliminada exitosamente!", "success");
					loadRooms();
				},
				(error) => {
					setLoading(false);
					showNotification(`Error al eliminar habitación: ${error}`, "danger");
				}
			);
		}
	};

	const handleDeleteService = (service) => {
		const action = service.isActive ? "desactivar" : "restaurar";
		const confirmMessage = `¿Estás seguro de que quieres ${action} el servicio "${service.title}" (ID: ${service.Id})?`;

		if (window.confirm(confirmMessage)) {
			setLoading(true);

			if (service.isActive) {
				deleteService(
					service.Id,
					() => {
						setLoading(false);
						showNotification("¡Servicio desactivado exitosamente!", "success");
						loadServices();
					},
					(error) => {
						setLoading(false);
						showNotification(
							`Error al desactivar servicio: ${error}`,
							"danger"
						);
					}
				);
			} else {
				// Restore
				restoreService(
					service.Id,
					() => {
						setLoading(false);
						showNotification("¡Servicio restaurado exitosamente!", "success");
						loadServices();
					},
					(error) => {
						setLoading(false);
						showNotification(`Error al restaurar servicio: ${error}`, "danger");
					}
				);
			}
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newErrors = Object.keys(formData).reduce((acc, key) => {
			acc[key] = validateField(key, formData[key]);
			return acc;
		}, {});

		setErrors(newErrors);

		if (Object.values(newErrors).some((err) => err !== "")) {
			showNotification(
				"Por favor corrige los errores en el formulario",
				"danger"
			);
			return;
		}

		setLoading(true);

		if (isEditing && editingRoom) {
			updateRoom(
				editingRoom.Id,
				formData,
				(data) => {
					setLoading(false);
					showNotification("¡Habitación actualizada exitosamente!", "success");
					resetForm();
					loadRooms();
				},
				(error) => {
					setLoading(false);
					showNotification(
						`Error al actualizar habitación: ${error}`,
						"danger"
					);
				}
			);
		} else {
			createRoom(
				formData,
				(data) => {
					setLoading(false);
					showNotification("¡Habitación agregada exitosamente!", "success");
					resetForm();
					loadRooms();
				},
				(error) => {
					setLoading(false);
					showNotification(`Error al agregar habitación: ${error}`, "danger");
				}
			);
		}
	};

	const handleServiceSubmit = (e) => {
		e.preventDefault();

		const newErrors = Object.keys(serviceFormData).reduce((acc, key) => {
			acc[key] = validateServiceField(key, serviceFormData[key]);
			return acc;
		}, {});

		setServiceErrors(newErrors);

		if (Object.values(newErrors).some((err) => err !== "")) {
			showNotification(
				"Por favor corrige los errores en el formulario de servicio",
				"danger"
			);
			return;
		}

		setLoading(true);

		if (isEditingService && editingService) {
			updateService(
				editingService.Id,
				serviceFormData,
				(data) => {
					setLoading(false);
					showNotification("¡Servicio actualizado exitosamente!", "success");
					resetServiceForm();
					loadServices();
				},
				(error) => {
					setLoading(false);
					showNotification(`Error al actualizar servicio: ${error}`, "danger");
				}
			);
		} else {
			createService(
				serviceFormData,
				(data) => {
					setLoading(false);
					showNotification("¡Servicio agregado exitosamente!", "success");
					resetServiceForm();
					loadServices();
				},
				(error) => {
					setLoading(false);
					showNotification(`Error al agregar servicio: ${error}`, "danger");
				}
			);
		}
	};

	const loadRooms = () => {
		getRooms(
			(data) => {
				setRooms(data);
			},
			(error) => {
				console.error("Error al cargar habitaciones:", error);
			}
		);
	};

	const loadServices = () => {
		getServices(
			(data) => {
				setServices(data);
			},
			(error) => {
				console.error("Error al cargar servicios:", error);
			}
		);
	};

	useEffect(() => {
		loadRooms();
		loadServices();
	}, []);

	return (
		<Container className="py-4">
			<Row>
				<Col>
					<h1 className="text-center mb-4">Panel Administrativo</h1>

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

					<Tabs
						activeKey={activeTab}
						onSelect={(k) => {
							setActiveTab(k);
						}}
						className="mb-4"
					>
						<Tab eventKey="add-room" title="Agregar Habitación">
							<Card>
								<Card.Header>
									<h4>
										{isEditing ? "Editar Habitación" : "Nueva Habitación"}
									</h4>
									{isEditing && (
										<small className="text-muted">
											Editando: {editingRoom?.Nombre} (ID: {editingRoom?.Id})
										</small>
									)}
								</Card.Header>
								<Card.Body>
									<Form onSubmit={handleSubmit}>
										{/* Información Básica */}
										<Row>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Número de Habitación *</Form.Label>
													<Form.Control
														type="number"
														name="RoomNo"
														value={formData.RoomNo}
														onChange={handleChange}
														isInvalid={!!errors.RoomNo}
														placeholder="Ej: 101"
														min="1"
													/>
													<Form.Control.Feedback type="invalid">
														{errors.RoomNo}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Nombre de la Habitación *</Form.Label>
													<Form.Control
														type="text"
														name="Nombre"
														value={formData.Nombre}
														onChange={handleChange}
														isInvalid={!!errors.Nombre}
														placeholder="Ej: Suite Presidencial"
													/>
													<Form.Control.Feedback type="invalid">
														{errors.Nombre}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Cantidad de Personas *</Form.Label>
													<Form.Control
														type="number"
														name="Personas"
														value={formData.Personas}
														onChange={handleChange}
														isInvalid={!!errors.Personas}
														placeholder="Ej: 2"
														min="1"
													/>
													<Form.Control.Feedback type="invalid">
														{errors.Personas}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Capacidad *</Form.Label>
													<Form.Control
														as="select"
														name="Capacidad"
														value={formData.Capacidad}
														onChange={handleChange}
													>
														<option value="Single">Single</option>
														<option value="Twin">Twin</option>
														<option value="Triple">Triple</option>
													</Form.Control>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Tipo *</Form.Label>
													<Form.Control
														as="select"
														name="Tipo"
														value={formData.Tipo}
														onChange={handleChange}
													>
														<option value="Deluxe">Deluxe</option>
														<option value="Suite">Suite</option>
													</Form.Control>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Área (m²)</Form.Label>
													<Form.Control
														type="number"
														name="Area"
														value={formData.Area}
														onChange={handleChange}
														isInvalid={!!errors.Area}
														placeholder="Ej: 25.5"
														step="0.1"
														min="0"
													/>
													<Form.Control.Feedback type="invalid">
														{errors.Area}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>URL de Imagen</Form.Label>
													<Form.Control
														type="url"
														name="Imagen"
														value={formData.Imagen}
														onChange={handleChange}
														placeholder="https://ejemplo.com/imagen.jpg"
													/>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Disponible</Form.Label>
													<Form.Check
														type="checkbox"
														name="Disponible"
														checked={formData.Disponible}
														onChange={handleChange}
														label="Habitación disponible"
													/>
												</Form.Group>
											</Col>
										</Row>

										<Form.Group className="mb-3">
											<Form.Label>Descripción</Form.Label>
											<Form.Control
												as="textarea"
												rows={3}
												name="Texto"
												value={formData.Texto}
												onChange={handleChange}
												placeholder="Describe las características de la habitación..."
											/>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Tarifa *</Form.Label>
											<Form.Control
												type="number"
												name="Tarifa"
												value={formData.Tarifa}
												onChange={handleChange}
												isInvalid={!!errors.Tarifa}
												placeholder="0.00"
												step="0.01"
												min="0"
											/>
											<Form.Control.Feedback type="invalid">
												{errors.Tarifa}
											</Form.Control.Feedback>
											<Form.Text className="text-muted">
												Ingresa el precio por noche de la habitación
											</Form.Text>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>Amenidades</Form.Label>
											<Form.Control
												as="textarea"
												rows={2}
												name="Amenities"
												value={formData.Amenities}
												onChange={handleChange}
												placeholder="WiFi gratuito, Desayuno incluido, Aire acondicionado..."
											/>
										</Form.Group>

										<div className="d-flex gap-2">
											<Button
												type="submit"
												variant="primary"
												disabled={loading}
												className="flex-fill"
											>
												{loading
													? isEditing
														? "Actualizando..."
														: "Agregando..."
													: isEditing
													? "Actualizar Habitación"
													: "Agregar Habitación"}
											</Button>
											{isEditing && (
												<Button
													type="button"
													variant="secondary"
													onClick={handleCancelEdit}
													disabled={loading}
												>
													Cancelar
												</Button>
											)}
										</div>
									</Form>
								</Card.Body>
							</Card>
						</Tab>

						<Tab eventKey="add-service" title="Agregar Servicio">
							<Card>
								<Card.Header>
									<h4>
										{isEditingService ? "Editar Servicio" : "Nuevo Servicio"}
									</h4>
									{isEditingService && (
										<small className="text-muted">
											Editando: {editingService?.title} (ID:{" "}
											{editingService?.Id})
										</small>
									)}
								</Card.Header>
								<Card.Body>
									<Form onSubmit={handleServiceSubmit}>
										<Row>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Título del Servicio *</Form.Label>
													<Form.Control
														type="text"
														name="title"
														value={serviceFormData.title}
														onChange={handleServiceChange}
														isInvalid={!!serviceErrors.title}
														placeholder="Ej: Restaurante, Spa, Gimnasio..."
													/>
													<Form.Control.Feedback type="invalid">
														{serviceErrors.title}
													</Form.Control.Feedback>
												</Form.Group>
											</Col>
											<Col md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Icono (React Icons)</Form.Label>
													<Form.Control
														type="text"
														name="icon"
														value={serviceFormData.icon}
														onChange={handleServiceChange}
														placeholder="Ej: FaUtensils, FaSpa, FaDumbbell..."
													/>
													<Form.Text className="text-muted">
														Nombre del icono de React Icons (opcional)
													</Form.Text>
												</Form.Group>
											</Col>
										</Row>

										<Form.Group className="mb-3">
											<Form.Label>Descripción *</Form.Label>
											<Form.Control
												as="textarea"
												rows={3}
												name="description"
												value={serviceFormData.description}
												onChange={handleServiceChange}
												isInvalid={!!serviceErrors.description}
												placeholder="Describe las características del servicio..."
											/>
											<Form.Control.Feedback type="invalid">
												{serviceErrors.description}
											</Form.Control.Feedback>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Label>URL de Imagen *</Form.Label>
											<Form.Control
												type="url"
												name="img"
												value={serviceFormData.img}
												onChange={handleServiceChange}
												isInvalid={!!serviceErrors.img}
												placeholder="https://ejemplo.com/imagen.jpg"
											/>
											<Form.Control.Feedback type="invalid">
												{serviceErrors.img}
											</Form.Control.Feedback>
											<Form.Text className="text-muted">
												URL completa de la imagen del servicio
											</Form.Text>
										</Form.Group>

										<Form.Group className="mb-3">
											<Form.Check
												type="checkbox"
												name="isActive"
												checked={serviceFormData.isActive}
												onChange={handleServiceChange}
												label="Servicio activo (visible para los usuarios)"
											/>
										</Form.Group>

										<div className="d-flex gap-2">
											<Button
												type="submit"
												variant="primary"
												disabled={loading}
												className="flex-fill"
											>
												{loading
													? isEditingService
														? "Actualizando..."
														: "Agregando..."
													: isEditingService
													? "Actualizar Servicio"
													: "Agregar Servicio"}
											</Button>
											{isEditingService && (
												<Button
													type="button"
													variant="secondary"
													onClick={handleCancelEditService}
													disabled={loading}
												>
													Cancelar
												</Button>
											)}
										</div>
									</Form>
								</Card.Body>
							</Card>
						</Tab>

						<Tab eventKey="rooms-list" title="Lista de Habitaciones">
							<Card>
								<Card.Header>
									<h4>Habitaciones Registradas</h4>
								</Card.Header>
								<Card.Body>
									<Table striped bordered hover responsive>
										<thead>
											<tr>
												<th>ID</th>
												<th>Nombre</th>
												<th>Personas</th>
												<th>Capacidad</th>
												<th>Tipo</th>
												<th>Área (m²)</th>
												<th>Tarifa</th>
												<th>Estado</th>
												<th style={{ width: "150px" }}>Acciones</th>
											</tr>
										</thead>
										<tbody>
											{rooms.length > 0 ? (
												rooms.map((room) => (
													<tr key={room.Id}>
														<td>{room.Id}</td>
														<td>{room.Nombre}</td>
														<td>{room.Personas}</td>
														<td>
															<Badge bg="info">{room.Capacidad}</Badge>
														</td>
														<td>
															<Badge
																bg={
																	room.Tipo === "Suite" ? "warning" : "success"
																}
															>
																{room.Tipo}
															</Badge>
														</td>
														<td>{room.Area || "N/A"}</td>
														<td>
															<strong>${room.Tarifa}</strong>
														</td>
														<td>
															<Badge
																bg={room.Disponible ? "success" : "secondary"}
															>
																{room.Disponible
																	? "Disponible"
																	: "No Disponible"}
															</Badge>
														</td>
														<td>
															<div className="d-flex gap-2">
																<Button
																	variant="outline-primary"
																	size="sm"
																	onClick={() => handleEditRoom(room)}
																	disabled={isEditing || loading}
																>
																	✏️ Editar
																</Button>
																<Button
																	variant="outline-danger"
																	size="sm"
																	onClick={() => handleDeleteRoom(room)}
																	disabled={isEditing || loading}
																>
																	🗑️ Eliminar
																</Button>
															</div>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan="9" className="text-center">
														No hay habitaciones registradas
													</td>
												</tr>
											)}
										</tbody>
									</Table>
								</Card.Body>
							</Card>
						</Tab>

						<Tab eventKey="services-list" title="Lista de Servicios">
							<Card>
								<Card.Header>
									<h4>Servicios Registrados</h4>
								</Card.Header>
								<Card.Body>
									<Table striped bordered hover responsive>
										<thead>
											<tr>
												<th>ID</th>
												<th>Título</th>
												<th>Descripción</th>
												<th>Icono</th>
												<th>Estado</th>
												<th>Creado</th>
												<th style={{ width: "150px" }}>Acciones</th>
											</tr>
										</thead>
										<tbody>
											{services.length > 0 ? (
												services.map((service) => (
													<tr key={service.Id}>
														<td>{service.Id}</td>
														<td>
															<strong>{service.title}</strong>
														</td>
														<td>
															<small className="text-muted">
																{service.description.length > 50
																	? `${service.description.substring(0, 50)}...`
																	: service.description}
															</small>
														</td>
														<td>
															<code>{service.icon || "N/A"}</code>
														</td>
														<td>
															<Badge
																bg={service.isActive ? "success" : "secondary"}
															>
																{service.isActive ? "Activo" : "Inactivo"}
															</Badge>
														</td>
														<td>
															<small>
																{new Date(
																	service.createdAt
																).toLocaleDateString()}
															</small>
														</td>
														<td>
															<div className="d-flex gap-2">
																<Button
																	variant="outline-primary"
																	size="sm"
																	onClick={() => handleEditService(service)}
																	disabled={isEditingService || loading}
																>
																	✏️ Editar
																</Button>
																<Button
																	variant={
																		service.isActive
																			? "outline-warning"
																			: "outline-success"
																	}
																	size="sm"
																	onClick={() => handleDeleteService(service)}
																	disabled={isEditingService || loading}
																>
																	{service.isActive
																		? "🗑️ Desactivar"
																		: "♻️ Restaurar"}
																</Button>
															</div>
														</td>
													</tr>
												))
											) : (
												<tr>
													<td colSpan="7" className="text-center">
														No hay servicios registrados
													</td>
												</tr>
											)}
										</tbody>
									</Table>
								</Card.Body>
							</Card>
						</Tab>
						<Tab eventKey="user-role" title="Administrar permisos de usuario">
							<Card className="p-4 shadow-sm">
								<Card.Header as="h5">
									Gestión de Permisos de Usuario
								</Card.Header>
								<Card.Body>
									{/* Formulario de búsqueda */}
									<Form>
										<Form.Group controlId="searchEmail" className="mb-3">
											<Form.Label>
												Ingrese el email del usuario a buscar:
											</Form.Label>
											<Form.Control
												type="email"
												placeholder="usuario@correo.com"
												value={queryEmail}
												onChange={(e) => setQueryEmail(e.target.value)}
											/>
										</Form.Group>

										<Button variant="primary" onClick={handleEmailSearch}>
											Buscar
										</Button>
									</Form>

									{/* Resultado de búsqueda (solo se muestra si hay datos) */}
									{queryUser && (
										<Card className="mt-4 bg-light p-3">
											<p>
												<strong>Nombre:</strong> {queryUser.Name} <br />
												<strong>Email:</strong> {queryUser.email} <br />
												<strong>Rol actual:</strong> {queryUser.class}
											</p>

											<div className="d-flex align-items-center gap-3">
												<Form.Select
													value={newRole}
													onChange={(e) => setNewRole(e.target.value)}
													style={{ width: "200px" }}
												>
													<option value="">Seleccionar nuevo rol</option>
													<option value="user">User</option>
													<option value="admin">Admin</option>
													<option value="sysadmin">SysAdmin</option>
												</Form.Select>

												<Button variant="success" onClick={handleUpdateRole}>
													<i className="bi bi-pencil-square me-1"></i>
													Editar permisos de usuario
												</Button>
											</div>
										</Card>
									)}
								</Card.Body>
							</Card>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	);
}

export default Admin;
