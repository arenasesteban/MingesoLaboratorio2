import axios from "axios";
import config from "./config";

const REPORTE_API_URL = `http://localhost:${config.gatewayExternalPort}/reporte/`;

function reporteResumen(mes, ano) {
    return axios.get(REPORTE_API_URL + "resumen-reparaciones", {
        params: {
            mes: mes,
            ano: ano
        }
    });
}

function reporteComparativo(mes) {
    return axios.get(REPORTE_API_URL + "comparativo-reparaciones", {
        params: {
            mes: mes,
        }
    });
}

export default { reporteResumen, reporteComparativo };