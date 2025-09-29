export const createRoom = (roomData, onSuccess, onError) => {
  console.log('Enviando datos al backend:', roomData);
  console.log('URL de destino:', '/api/rooms');
  fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData)
  })
  .then(response => {
      console.log('Respuesta del servidor:', response.status, response.statusText);
      console.log('Headers de respuesta:', response.headers);
      
      if (!response.ok) {
        // Intentar leer el texto de la respuesta para más detalles
        return response.text().then(text => {
          console.log('Contenido de la respuesta de error:', text);
          throw new Error(`HTTP ${response.status}: ${response.statusText}. Contenido: ${text.substring(0, 200)}`);
        });
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        console.log('Habitación creada exitosamente:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error al crear habitación:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red al crear habitación:', error);
      if (onError) {
        onError(error);
      }
    });
};

export const updateRoom = (roomId, roomData, onSuccess, onError) => {
  fetch(`/api/rooms/${roomId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Habitación actualizada exitosamente:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error al actualizar habitación:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red al actualizar habitación:', error);
      if (onError) {
        onError(error);
      }
    });
};

export const deleteRoom = (roomId, onSuccess, onError) => {
  fetch(`/api/rooms/${roomId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Habitación eliminada exitosamente');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.error('Error al eliminar habitación:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red al eliminar habitación:', error);
      if (onError) {
        onError(error);
      }
    });
};
// Función para probar la conectividad con el backend
export const testBackendConnection = () => {
  console.log('Probando conectividad con el backend...');
  
  // Probar GET primero (que sabemos que funciona)
  fetch('/api/rooms')
    .then(response => {
      console.log('GET /api/rooms - Status:', response.status);
      if (response.ok) {
        console.log('✅ GET /api/rooms funciona correctamente');
      } else {
        console.log('❌ GET /api/rooms falló:', response.status);
      }
    })
    .catch(error => {
      console.log('❌ Error en GET /api/rooms:', error);
    });
  
  // Probar POST con datos mínimos
  const testData = {
    RoomNo: 999,
    Nombre: "Habitación de Prueba",
    Personas: 1,
    Capacidad: "Single",
    Tipo: "Deluxe",
    Disponible: true
  };
  
  console.log('Probando POST con datos:', testData);
  
  fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  })
    .then(response => {
      console.log('POST /api/rooms - Status:', response.status);
      if (response.ok) {
        console.log('✅ POST /api/rooms funciona correctamente');
        return response.json();
      } else {
        console.log('❌ POST /api/rooms falló:', response.status);
        return response.text();
      }
    })
    .then(data => {
      console.log('Respuesta POST:', data);
    })
    .catch(error => {
      console.log('❌ Error en POST /api/rooms:', error);
    });
};