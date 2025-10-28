export const getUserProfile = async (dni) => {
  try {
    const token = localStorage.getItem("login-token");
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`http://localhost:3000/api/users/${dni}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    throw error;
  }
};


export const getUserReservations = async (dni) => {
  try {
    const token = localStorage.getItem("login-token");
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`http://localhost:3000/api/users/${dni}/reservations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
   console.log('[Frontend][Reservations][REQUEST]', { dni });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[Frontend][Reservations][RESPONSE]', data?.data?.length);
    return data.data;
  } catch (error) {
    console.error("Error al obtener reservas del usuario:", error);
    throw error;
  }
};


export const updateUserProfile = async (dni, userData) => {
  try {
    const token = localStorage.getItem("login-token");
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    console.log('[Frontend][Profile][UPDATE_REQUEST]', { dni, userData });

    const response = await fetch(`http://localhost:3000/api/users/${dni}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    console.log('[Frontend][Profile][UPDATE_RESPONSE]', { 
      status: response.status, 
      statusText: response.statusText 
    });

    if (!response.ok) {
    
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        console.log('[Frontend][Profile][UPDATE_ERROR_DATA]', errorData);
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        console.warn("No se pudo parsear el error del backend:", parseError);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('[Frontend][Profile][UPDATE_SUCCESS]', data);
    return data;
  } catch (error) {
    console.error("Error al actualizar perfil de usuario:", error);
    throw error;
  }
};


export const changePassword = async (dni, passwordData) => {
  try {
    const token = localStorage.getItem("login-token");
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`http://localhost:3000/api/users/${dni}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(passwordData)
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        console.warn("No se pudo parsear el error del backend:", parseError);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw error;
  }
};


export const getUserDataFromStorage = () => {
  return {
    name: localStorage.getItem("user-name") || "",
    email: localStorage.getItem("user-email") || "",
    dni: localStorage.getItem("user-dni") || "",
  };
};


export const updateUserDataInStorage = (userData) => {
  if (userData.name) {
    localStorage.setItem("user-name", userData.name);
  }
  if (userData.email) {
    localStorage.setItem("user-email", userData.email);
  }
  if (userData.dni) {
    localStorage.setItem("user-dni", userData.dni);
  }
};

export const cancelUserReservation = async (reservationId) => {
  try {
    const token = localStorage.getItem("login-token");
    
    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`http://localhost:3000/api/users/reservations/${reservationId}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (parseError) {
        console.warn("No se pudo parsear el error del backend:", parseError);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    throw error;
  }
};