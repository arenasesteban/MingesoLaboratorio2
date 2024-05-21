import { React, useState, useEffect } from "react";
import reporteService from "../services/reporte.service";
import reparaciones from "../data/reparacionesData";

export default function ReporteComparativa() {
    const [reporte_comparativa, setReporteComparativa] = useState([]);

    async function buscarReporteComparativa() {
        try {
            const tipo_reparaciones = reparaciones.map(reparacion => reparacion.tipo_reparacion);
            const mes = new Date().getMonth() + 1; // Obtener el mes actual

            const response = await reporteService.reporteComparativo(tipo_reparaciones, mes);
            setReporteComparativa(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
        }
    }

    useEffect(() => {
        buscarReporteComparativa();
    }, [])

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                    <h1 className="text-2xl text-gray-900">Comparativa General</h1>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold px-6 py-4">
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
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
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