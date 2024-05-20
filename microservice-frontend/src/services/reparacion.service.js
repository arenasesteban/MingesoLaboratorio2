import axios from "axios";

const REPARACION_API_URL = "http://localhost:80/reparacion/";

function crearReparacion(reparaciones, idRegistro, tipoMotor) {
    return axios.post(REPARACION_API_URL, reparaciones, { params: { idRegistro: idRegistro, tipoMotor: tipoMotor}});
}

function obtenerRepracionTipoVehiculo() {
    return axios.get(REPARACION_API_URL + "reparaciones-por-tipo-auto");
}

function obtenerReparacionTipoMotor() {
    return axios.get(REPARACION_API_URL + "reparaciones-por-tipo-motor");
}

export default { crearReparacion, obtenerRepracionTipoVehiculo, obtenerReparacionTipoMotor };