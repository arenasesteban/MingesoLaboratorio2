import axios from "axios";
import config from "./config";

const REPARACION_API_URL = `http://localhost:${config.gatewayExternalPort}/reparacion/`;

function crearReparaciones(reparaciones) {
    return axios.post(REPARACION_API_URL, reparaciones);
}

function obtenerReparaciones() {
    return axios.get(REPARACION_API_URL);
}

export default { crearReparaciones, obtenerReparaciones };