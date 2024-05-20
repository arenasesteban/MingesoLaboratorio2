import axios from "axios";

const VEHICULO_API_URL = "http://localhost:80/vehiculo/";

function registrarVehiculo(vehiculo) {
    return axios.post(VEHICULO_API_URL, vehiculo)
}

function obtenerVehiculos() {
    return axios.get(VEHICULO_API_URL);
}

function actualizarVehiculo(patente, kilometraje) {
    return axios.put(VEHICULO_API_URL, null, { params: { patente: patente, kilometraje: kilometraje}});
}   

function obtenerPatentesMotor() {
    return axios.get(VEHICULO_API_URL + "patentes-motor");
}

function obtenerPromedioReparacion() {
    return axios.get(VEHICULO_API_URL + "tiempo-reparacion-por-marca");
}

export default { registrarVehiculo, obtenerVehiculos, actualizarVehiculo, obtenerPatentesMotor, obtenerPromedioReparacion };