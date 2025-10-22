export const register = async (userData) => {
  try {
    console.log('[RegisterService] Enviando datos de registro:', userData);
    
    const response = await fetch("http://localhost:3000/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData)
    });

    console.log('[RegisterService] Respuesta del servidor:', { 
      status: response.status, 
      statusText: response.statusText 
    });

    const data = await response.json();
    console.log('[RegisterService] Datos recibidos:', data);

    if (!response.ok) {
      console.error('[RegisterService] Error en registro:', data.message);
      throw new Error(data.message || 'Error al registrar usuario');
    }

    console.log('[RegisterService] Usuario registrado exitosamente');
    return data;
  } catch (error) {
    console.error('[RegisterService] Error:', error);
    throw error;
  }
};