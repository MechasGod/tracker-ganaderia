const BASE_URL = '/api';

// Obtener token del localStorage (se guarda después del login)
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };
}

// Manejo genérico de respuesta
async function handleResponse(response) {
    const json = await response.json();
    if (!response.ok) {
        // El backend responde con { success: false, error: { message: "..." } }
        const mensaje = json.error?.message || json.mensaje || 'Error del servidor';
        throw new Error(mensaje);
    }
    return json;
}

export async function post(endpoint, datos) {
    const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(datos),
    });
    return handleResponse(respuesta);
}

export async function put(endpoint, datos) {
    const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(datos),
    });
    return handleResponse(respuesta);
}

export async function get(endpoint, params = {}) {
    const url = new URL(`${BASE_URL}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const respuesta = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return handleResponse(respuesta);
}