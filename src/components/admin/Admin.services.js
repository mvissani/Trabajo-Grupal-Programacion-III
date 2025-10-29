export const createRoom = (roomData, onSuccess, onError) => {
	console.log("Enviando datos al backend:", roomData);
	console.log("URL de destino:", "/api/rooms");
	fetch("/api/rooms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(roomData),
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor:",
				response.status,
				response.statusText
			);
			console.log("Headers de respuesta:", response.headers);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error:", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				console.log("Habitación creada exitosamente:", data.data);
				if (onSuccess) {
					onSuccess(data.data);
				}
			} else {
				console.error("Error al crear habitación:", data.message);
				if (onError) {
					onError(data.message);
				}
			}
		})
		.catch((error) => {
			console.error("Error de red al crear habitación:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const updateRoom = (roomId, roomData, onSuccess, onError) => {
	console.log("Actualizando habitación ID:", roomId, "con datos:", roomData);
	console.log("URL de destino:", `/api/rooms/${roomId}`);

	fetch(`/api/rooms/${roomId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(roomData),
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (UPDATE):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error (UPDATE):", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			if (data.success) {
				console.log("Habitación actualizada exitosamente:", data.data);
				if (onSuccess) {
					onSuccess(data.data);
				}
			} else {
				console.error("Error al actualizar habitación:", data.message);
				if (onError) {
					onError(data.message);
				}
			}
		})
		.catch((error) => {
			console.error("Error de red al actualizar habitación:", error);
			if (onError) {
				onError(error);
			}
		});
};
export const deleteRoom = (roomId, onSuccess, onError) => {
	fetch(`/api/rooms/${roomId}`, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				console.log("Habitación eliminada exitosamente");
				if (onSuccess) {
					onSuccess();
				}
			} else {
				console.error("Error al eliminar habitación:", data.message);
				if (onError) {
					onError(data.message);
				}
			}
		})
		.catch((error) => {
			console.error("Error de red al eliminar habitación:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const testBackendConnection = () => {
	console.log("Probando conectividad con el backend...");

	fetch("/api/rooms")
		.then((response) => {
			console.log("GET /api/rooms - Status:", response.status);
			if (response.ok) {
				console.log("✅ GET /api/rooms funciona correctamente");
			} else {
				console.log("❌ GET /api/rooms falló:", response.status);
			}
		})
		.catch((error) => {
			console.log("❌ Error en GET /api/rooms:", error);
		});

	const testData = {
		RoomNo: 999,
		Nombre: "Habitación de Prueba",
		Personas: 1,
		Capacidad: "Single",
		Tipo: "Deluxe",
		Tarifa: 100,
		Disponible: true,
	};

	console.log("Probando POST con datos:", testData);

	fetch("/api/rooms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(testData),
	})
		.then((response) => {
			console.log("POST /api/rooms - Status:", response.status);
			if (response.ok) {
				console.log("✅ POST /api/rooms funciona correctamente");
				return response.json();
			} else {
				console.log("❌ POST /api/rooms falló:", response.status);
				return response.text();
			}
		})
		.then((data) => {
			console.log("Respuesta POST:", data);
		})
		.catch((error) => {
			console.log("❌ Error en POST /api/rooms:", error);
		});
};
export const getServices = (onSuccess, onError) => {
	fetch("/api/services/admin/all")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log("Servicios obtenidos exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error al obtener servicios:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const createService = (serviceData, onSuccess, onError) => {
	console.log("Enviando datos de servicio al backend:", serviceData);
	console.log("URL de destino:", "/api/services/admin/create");

	fetch("/api/services/admin/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(serviceData),
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (SERVICE):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error (SERVICE):", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Servicio creado exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error de red al crear servicio:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const updateService = (serviceId, serviceData, onSuccess, onError) => {
	console.log(
		"Actualizando servicio ID:",
		serviceId,
		"con datos:",
		serviceData
	);
	console.log("URL de destino:", `/api/services/admin/update/${serviceId}`);

	fetch(`/api/services/admin/update/${serviceId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(serviceData),
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (UPDATE SERVICE):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log(
						"Contenido de la respuesta de error (UPDATE SERVICE):",
						text
					);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Servicio actualizado exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error de red al actualizar servicio:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const deleteService = (serviceId, onSuccess, onError) => {
	fetch(`/api/services/admin/delete/${serviceId}`, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Servicio eliminado exitosamente");
			if (onSuccess) {
				onSuccess();
			}
		})
		.catch((error) => {
			console.error("Error de red al eliminar servicio:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const restoreService = (serviceId, onSuccess, onError) => {
	fetch(`/api/services/admin/restore/${serviceId}`, {
		method: "PUT",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log("Servicio restaurado exitosamente");
			if (onSuccess) {
				onSuccess();
			}
		})
		.catch((error) => {
			console.error("Error de red al restaurar servicio:", error);
			if (onError) {
				onError(error);
			}
		});
};
export const getAllReservations = (onSuccess, onError) => {
	console.log("Obteniendo todas las reservas...");
	console.log("URL de destino:", "/api/admin/reservations");

	fetch("/api/admin/reservations", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("login-token")}`,
		},
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (RESERVATIONS):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error (RESERVATIONS):", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Reservas obtenidas exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error de red al obtener reservas:", error);
			if (onError) {
				onError(error);
			}
		});
};

export const cancelReservation = (reservationId, onSuccess, onError) => {
	

	fetch(`http://localhost:3000/api/reservations/${reservationId}/cancel`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("login-token")}`,
		},
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (CANCEL_RESERVATION):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error (CANCEL_RESERVATION):", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Reserva cancelada exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error de red al cancelar reserva:", error);
			if (onError) {
				onError(error);
			}
		});
};
export const refreshRoomAvailability = (onSuccess, onError) => {
	console.log("Refrescando disponibilidades de habitaciones...");
	console.log("URL de destino:", "/api/admin/refresh-availability");

	fetch("http://localhost:3000/api/admin/refresh-availability", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("login-token")}`,
		},
	})
		.then((response) => {
			console.log(
				"Respuesta del servidor (REFRESH_AVAILABILITY):",
				response.status,
				response.statusText
			);

			if (!response.ok) {
				return response.text().then((text) => {
					console.log("Contenido de la respuesta de error (REFRESH_AVAILABILITY):", text);
					throw new Error(
						`HTTP ${response.status}: ${
							response.statusText
						}. Contenido: ${text.substring(0, 200)}`
					);
				});
			}
			return response.json();
		})
		.then((data) => {
			console.log("Disponibilidades actualizadas exitosamente:", data);
			if (onSuccess) {
				onSuccess(data);
			}
		})
		.catch((error) => {
			console.error("Error de red al refrescar disponibilidades:", error);
			if (onError) {
				onError(error);
			}
		});
};