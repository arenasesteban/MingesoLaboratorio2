import axios from "axios";

const REPORTE_API_URL = "http://localhost:8080/reporte/";

function reporteResumen(tipo_reparaciones, mes, ano) {
    return axios.get(REPORTE_API_URL + "resumen-reparaciones", {
        params: {
            tipo_reparaciones: tipo_reparaciones.join(','),
            mes: mes,
            ano: ano
        }
    });
}

function reporteComparativo(tipo_reparaciones, mes) {
    return axios.get(REPORTE_API_URL + "comparativo-reparaciones", {
        params: {
            tipo_reparaciones: tipo_reparaciones.join(','),
            mes: mes,
        }
    });
}

export default { reporteResumen, reporteComparativo };