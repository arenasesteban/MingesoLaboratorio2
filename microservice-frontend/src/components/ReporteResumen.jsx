import { React, useState, useEffect } from "react";
import reporteService from "../services/reporte.service";
import reparaciones from "../data/reparacionesData";

export default function ReporteResumen() {
    const [reporteResumen, setReporteResumen] = useState([]);

    async function buscarReporteResumen() {
        try {
            const tipo_reparaciones = reparaciones.map(reparacion => reparacion.tipo_reparacion);
            const mes = new Date().getMonth() + 1; // Obtener el mes actual
            const ano = new Date().getFullYear(); // Obtener el año actual

            const response = await reporteService.reporteResumen(tipo_reparaciones, mes, ano);
            setReporteResumen(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener el reporte:', error);
        }
    }

    useEffect(() => {
        buscarReporteResumen();
    }, [])
    
    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                    <h1 className="text-2xl text-gray-900">Resumen Mensual</h1>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold px-6 pr-4">
                                        Reparación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Sedan
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Hatchback
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        SUV
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Pickup
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Furgoneta
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reporteResumen.map((reporteResumen, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 pr-4 font-medium text-gray-900">
                                                {reporteResumen.tipo_reparacion}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_sedan}<br/>
                                                $ {reporteResumen.monto_sedan}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_hatchback}<br/>
                                                $ {reporteResumen.monto_hatchback}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_suv}<br/>
                                                $ {reporteResumen.monto_suv}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_pickup}<br/>
                                                $ {reporteResumen.monto_pickup}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_furgoneta}<br/>
                                                $ {reporteResumen.monto_furgoneta}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reporteResumen.cantidad_total}<br/>
                                                $ {reporteResumen.monto_total}
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
