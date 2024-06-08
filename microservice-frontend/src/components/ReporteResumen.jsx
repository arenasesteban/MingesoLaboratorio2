import { React, useState } from "react";
import reporteService from "../services/reporte.service";
import BotonNuevo from './BotonNuevo';

export default function ReporteResumen() {
    const[mes, setMes] = useState(0);
    const[ano, setAno] = useState(0);

    const [reporteResumen, setReporteResumen] = useState([]);

    async function manejarReporteResumen(e) {
        e.preventDefault();

        try {
            const response = await reporteService.reporteResumen(mes, ano);
            setReporteResumen(response.data);
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
                        <h1 className="text-2xl text-gray-900">Resumen Mensual</h1>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-4">
                            <label for="mes" class="block font-semibold text-gray-700">Mes</label>
                            <select id="mes" class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setMes(e.target.value)} required>
                                <option>Escoger mes</option>
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
                        <div className="flex items-center gap-4">
                            <label for="ano" class="block font-semibold text-gray-700">Año</label>
                            <input type="number" id="ano" class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5" placeholder="" onChange={e => setAno(e.target.value)} required />
                        </div>
                        <BotonNuevo onClick={manejarReporteResumen} tipoElemento={"Generar Reporte"}/>
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
                                            <td scope="row" class="pl-6 pr-4 font-medium text-gray-900">
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
