import axios from "axios";

const REPARACION_API_URL = "http://gateway-server-service:8080/reparacion/";

function crearReparaciones(reparaciones) {
    return axios.post(REPARACION_API_URL, reparaciones);
}

function obtenerReparaciones() {
    return axios.get(REPARACION_API_URL);
}

export default { crearReparaciones, obtenerReparaciones };