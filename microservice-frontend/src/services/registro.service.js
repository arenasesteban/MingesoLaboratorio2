import axios from "axios";

const REGISTRO_API_URL = "http://localhost:[EXTERNAL_PORT]/registro/";

function crearRegistro(registro) {
    return axios.post(REGISTRO_API_URL, registro);
}

function crearDetalles(detalles) {
    return axios.post(REGISTRO_API_URL + "detalle", detalles);
}

function obtenerRegistros() {
    return axios.get(REGISTRO_API_URL);
}

function obtenerRegistro(id_registro) {
    return axios.get(REGISTRO_API_URL + id_registro, null)
}

function calcularTotal(registro, bono) {
    return axios.post(REGISTRO_API_URL + "calcular-total", registro, {
        params: {
            descuento_bono: bono
        }
    });
}

function actualizarRegistro(registro) {
    return axios.put(REGISTRO_API_URL, registro);
}

export default { crearRegistro, crearDetalles, obtenerRegistros, calcularTotal, obtenerRegistro, actualizarRegistro };