import { React, useState } from "react";
import reporteService from "../services/reporte.service";
import BotonNuevo from './BotonNuevo';

export default function ReporteComparativa() {
    const [mes, setMes] = useState([])

    const [reporte_comparativa, setReporteComparativa] = useState([]);

    async function manejarReporteComparativa(e) {
        e.preventDefault();

        try {
            const response = await reporteService.reporteComparativo(mes);
            setReporteComparativa(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener el reporte: ", error);
        }
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Comparativa General</h1>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-4">
                            <label for="mes" class="block font-semibold text-gray-700">Mes</label>
                            <select id="mes" class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setMes(e.target.value)} required>
                                <option value="0">Escoger mes</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <BotonNuevo onClick={manejarReporteComparativa} tipoElemento={"Generar Reporte"}/>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold pl-6 py-4">
                                        Reparación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        {reporte_comparativa.length > 0
                                            ? `${reporte_comparativa[0].primer_mes}`
                                            : "Primer mes"
                                        }
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Variación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        {reporte_comparativa.length > 0
                                            ? `${reporte_comparativa[0].segundo_mes}`
                                            : "Segundo mes"
                                        }
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Variación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        {reporte_comparativa.length > 0
                                            ? `${reporte_comparativa[0].tercer_mes}`
                                            : "Tercer mes"
                                        }
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reporte_comparativa.map((reporte_comparativa, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="pl-6 py-4 font-medium text-gray-900">
                                                {reporte_comparativa.tipo_reparacion}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporte_comparativa.cantidad_primer_mes}<br/>
                                                $ {reporte_comparativa.monto_primer_mes}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporte_comparativa.primera_variacion_cantidad} %<br/>
                                                {reporte_comparativa.primera_variacion_monto} %
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporte_comparativa.cantidad_segundo_mes}<br/>
                                                $ {reporte_comparativa.monto_segundo_mes}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporte_comparativa.segunda_variacion_cantidad} %<br/>
                                                {reporte_comparativa.segunda_variacion_monto} %
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporte_comparativa.cantidad_tercer_mes}<br/>
                                                $ {reporte_comparativa.monto_tercer_mes}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
           </div>
        </div>
    );
}