import { React, useState, useEffect } from "react";
import reparacionService from "../services/reparacion.service";

export default function ReporteResumen() {
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
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Tipo reparación
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
                                        Monto total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reparacionesTipoVehiculo.map((reparacionTipoVehiculo, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
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
