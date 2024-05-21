import axios from "axios";

const REGISTRO_API_URL = "http://localhost:8080/registro/";

function crearRegistro(registro) {
    return axios.post(REGISTRO_API_URL, registro);
}

function obtenerRegistros() {
    return axios.get(REGISTRO_API_URL);
}

function calcularTotal(registro, bono) {
    return axios.get(REGISTRO_API_URL + "calcular-total",  registro, { params: { descuento_bono: bono }});
}

export default { crearRegistro, obtenerRegistros, calcularTotal };