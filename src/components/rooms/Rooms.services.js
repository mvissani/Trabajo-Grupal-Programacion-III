// Servicios para manejar las operaciones relacionadas con las habitaciones

/**
 * Obtiene todas las habitaciones desde la API
 * @param {Function} onSuccess - Callback ejecutado cuando la petición es exitosa
 * @param {Function} onError - Callback ejecutado cuando ocurre un error
 */
export const getRooms = (onSuccess, onError) => {
  fetch('/api/rooms')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Rooms:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
      if (onError) {
        onError(error);
      }
    });
};

/**
 * Obtiene una habitación específica por ID
 * @param {number} roomId - ID de la habitación
 * @param {Function} onSuccess - Callback ejecutado cuando la petición es exitosa
 * @param {Function} onError - Callback ejecutado cuando ocurre un error
 */
export const getRoomById = (roomId, onSuccess, onError) => {
  fetch(`/api/rooms/${roomId}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Room:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
      if (onError) {
        onError(error);
      }
    });
};

/**
 * Obtiene habitaciones filtradas por tipo
 * @param {string} tipo - Tipo de habitación (Deluxe, Suite, etc.)
 * @param {Function} onSuccess - Callback ejecutado cuando la petición es exitosa
 * @param {Function} onError - Callback ejecutado cuando ocurre un error
 */
export const getRoomsByType = (tipo, onSuccess, onError) => {
  fetch(`/api/rooms?tipo=${tipo}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Rooms filtrados por tipo:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
      if (onError) {
        onError(error);
      }
    });
};

/**
 * Obtiene habitaciones filtradas por capacidad
 * @param {string} capacidad - Capacidad de la habitación (Single, Twin, Triple)
 * @param {Function} onSuccess - Callback ejecutado cuando la petición es exitosa
 * @param {Function} onError - Callback ejecutado cuando ocurre un error
 */
export const getRoomsByCapacity = (capacidad, onSuccess, onError) => {
  fetch(`/api/rooms?capacidad=${capacidad}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Rooms filtrados por capacidad:', data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error('Error:', data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
      if (onError) {
        onError(error);
      }
    });
};