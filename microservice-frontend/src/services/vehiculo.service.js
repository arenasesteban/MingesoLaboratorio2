import axios from "axios";

const VEHICULO_API_URL = `http://localhost:8080/vehiculo/`;

function registrarVehiculo(vehiculo) {
    return axios.post(VEHICULO_API_URL, vehiculo)
}

function obtenerVehiculos() {
    return axios.get(VEHICULO_API_URL);
}

function obtenerVehiculo(patente) {
    return axios.get(VEHICULO_API_URL + "patente", { params: { patente }});
}

function actualizarVehiculo(patente, kilometraje) {
    return axios.put(VEHICULO_API_URL, null, { params: { patente, kilometraje }});
}

export default { registrarVehiculo, obtenerVehiculos, obtenerVehiculo, actualizarVehiculo };