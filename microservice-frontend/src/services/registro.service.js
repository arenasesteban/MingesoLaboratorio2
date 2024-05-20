import axios from "axios";

const REGISTRO_API_URL = "http://localhost:80/registro/";

function crearRegistro(registro) {
    return axios.post(REGISTRO_API_URL, registro);
}

function obtenerRegistros() {
    return axios.get(REGISTRO_API_URL);
}

function calcularTotal(idRegistro, bono) {
    return axios.get(REGISTRO_API_URL + "calcular-total", { params: { idRegistro: idRegistro, descuentoPorBono: bono }});
}

export default { crearRegistro, obtenerRegistros, calcularTotal };