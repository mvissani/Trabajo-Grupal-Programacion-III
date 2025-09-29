export const getRooms = (onSuccess, onError) => {
  fetch("/api/rooms")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Rooms:", data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error("Error:", data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
      if (onError) {
        onError(error);
      }
    });
};

export const getRoomById = (roomId, onSuccess, onError) => {
  fetch(`/api/rooms/${roomId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Room:", data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error("Error:", data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
      if (onError) {
        onError(error);
      }
    });
};

export const getRoomsByType = (tipo, onSuccess, onError) => {
  fetch(`/api/rooms?tipo=${tipo}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Rooms filtrados por tipo:", data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error("Error:", data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
      if (onError) {
        onError(error);
      }
    });
};

export const getRoomsByCapacity = (capacidad, onSuccess, onError) => {
  fetch(`/api/rooms?capacidad=${capacidad}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Rooms filtrados por capacidad:", data.data);
        if (onSuccess) {
          onSuccess(data.data);
        }
      } else {
        console.error("Error:", data.message);
        if (onError) {
          onError(data.message);
        }
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
      if (onError) {
        onError(error);
      }
    });
};
