import { React, useState, useEffect } from "react";
import reparacionService from "../services/reparacion.service";

export default function ReparacionTipoMotor() {
    const [reparacionesTipoMotor, setReparacionesTipoMotor] = useState([]);

    async function buscarReparacionesTipoMotor() {
        try {
            const response = await reparacionService.obtenerReparacionTipoMotor();
            setReparacionesTipoMotor(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener los registros:', error);
        }
    }

    useEffect(() => {
        buscarReparacionesTipoMotor();
    }, [])
    
    return (
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2 border-r border-gray-400">Reporte</h1>
                        <h2 className="text-2xl font-light ml-2">Número de reparaciones por cada tipo de motor</h2>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow">
                    <div>
                        <table className="bg-white text-left w-full">
                            <thead className="text-gray-700 uppercase border-b">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Tipo reparación
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Gasolina
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Diesel
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Híbrido
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Eléctrico
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Monto total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reparacionesTipoMotor.map((reparacionTipoMotor, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {reparacionTipoMotor.tipoReparacion}
                                            </td>
                                            <td scope="row" class="px-6 py-4 text-gray-900">
                                                {reparacionTipoMotor.cantidadGasolina}
                                            </td>
                                            <td scope="row" class="px-6 py-4 text-gray-900">
                                                {reparacionTipoMotor.cantidadDiesel}
                                            </td>
                                            <td scope="row" class="px-6 py-4 text-gray-900">
                                                {reparacionTipoMotor.cantidadHibrido}
                                            </td>
                                            <td scope="row" class="px-6 py-4 text-gray-900">
                                                {reparacionTipoMotor.cantidadElectrico}
                                            </td>
                                            <td scope="row" class="px-6 py-4 text-gray-900">
                                                $ {reparacionTipoMotor.montoTotal}
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
