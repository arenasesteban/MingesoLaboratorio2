import { React, useState, useEffect } from "react";
import reparacionService from "../services/reparacion.service";

export default function ReparacionTipoVehiculo() {
    const [reparacionesTipoVehiculo, setReparacionesTipoVehiculo] = useState([]);

    async function buscarReparacionesTipoVehiculo() {
        try {
            const response = await reparacionService.obtenerRepracionTipoVehiculo();
            setReparacionesTipoVehiculo(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error al obtener los registros:', error);
        }
    }

    useEffect(() => {
        buscarReparacionesTipoVehiculo();
    }, [])
    
    return (
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2 border-r border-gray-400">Reporte</h1>
                        <h2 className="text-2xl font-light ml-2">Número de reparaciones por cada tipo de vehiculo</h2>
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
                                        Sedan
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Hatchback
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        SUV
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Pickup
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Furgoneta
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Monto total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reparacionesTipoVehiculo.map((reparacionTipoVehiculo, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {reparacionTipoVehiculo.tipoReparacion}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reparacionTipoVehiculo.cantidadSedan}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reparacionTipoVehiculo.cantidadHatchback}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reparacionTipoVehiculo.cantidadSUV}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reparacionTipoVehiculo.cantidadPickup}
                                            </td>
                                            <td class="px-6 py-3">
                                                {reparacionTipoVehiculo.cantidadFurgoneta}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacionTipoVehiculo.montoTotal}
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
