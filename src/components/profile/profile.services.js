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
    return data;
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

    const response = await fetch(`http://localhost:3000/api/reservations/user/${dni}`, {
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
    return data;
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

    const response = await fetch(`http://localhost:3000/api/users/${dni}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
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
    id: localStorage.getItem("user-id") || "",
  };
};


export const updateUserDataInStorage = (userData) => {
  if (userData.name) {
    localStorage.setItem("user-name", userData.name);
  }
  if (userData.email) {
    localStorage.setItem("user-email", userData.email);
  }
  if (userData.id) {
    localStorage.setItem("user-id", userData.id);
  }
};