import axios from "axios";

const REPARACION_API_URL = "http://localhost:8080/reparacion/";

function crearReparacion(reparaciones) {
    return axios.post(REPARACION_API_URL, reparaciones);
}

export default { crearReparacion };