// Diagnosticar el componente Profile
console.log('🔍 [DIAGNOSTIC] Verificando estado del componente Profile...');

// 1. Verificar si el componente se está montando
console.log('🔍 [DIAGNOSTIC] Página actual:', window.location.pathname);

// 2. Verificar el token
const token = localStorage.getItem('login-token');
console.log('🔍 [DIAGNOSTIC] Token:', token ? 'Presente' : 'Ausente');

if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('🔍 [DIAGNOSTIC] DNI del token:', payload.dni);
}

// 3. Verificar si hay elementos del componente Profile en el DOM
const profileElements = {
    title: document.querySelector('h1'),
    tabs: document.querySelector('.nav-tabs'),
    profileTab: document.querySelector('[data-rr-ui-event-key="profile"]'),
    reservationsTab: document.querySelector('[data-rr-ui-event-key="reservations"]'),
    loadingSpinner: document.querySelector('.spinner-border'),
    errorAlert: document.querySelector('.alert-danger')
};

console.log('🔍 [DIAGNOSTIC] Elementos encontrados:', profileElements);

// 4. Verificar si hay datos en el estado (si es posible)
console.log('🔍 [DIAGNOSTIC] Verificando si hay datos cargados...');

// 5. Probar las funciones directamente
async function testProfileFunctions() {
    console.log('🧪 [TEST] Probando funciones del Profile...');
    
    const token = localStorage.getItem('login-token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const dni = payload.dni;
    
    console.log('🧪 [TEST] DNI extraído:', dni);
    
    // Probar getUserProfile
    try {
        console.log('🧪 [TEST] Probando getUserProfile...');
        const response = await fetch(`http://localhost:3000/api/users/${dni}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ [TEST] getUserProfile exitoso:', data.data);
        } else {
            console.log('❌ [TEST] getUserProfile falló:', response.status);
        }
    } catch (error) {
        console.error('❌ [TEST] Error en getUserProfile:', error);
    }
    
    // Probar getUserReservations
    try {
        console.log('🧪 [TEST] Probando getUserReservations...');
        const response = await fetch(`http://localhost:3000/api/users/${dni}/reservations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ [TEST] getUserReservations exitoso:', data.data.length, 'reservas');
            console.log('📅 [TEST] Reservas:', data.data);
        } else {
            console.log('❌ [TEST] getUserReservations falló:', response.status);
        }
    } catch (error) {
        console.error('❌ [TEST] Error en getUserReservations:', error);
    }
}