import axios from "axios";

const REPARACION_API_URL = "http://localhost:[EXTERNAL_PORT]/reparacion/";

function crearReparaciones(reparaciones) {
    return axios.post(REPARACION_API_URL, reparaciones);
}

function obtenerReparaciones() {
    return axios.get(REPARACION_API_URL);
}

export default { crearReparaciones, obtenerReparaciones };