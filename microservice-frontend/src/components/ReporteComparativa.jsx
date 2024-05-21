import { React, useState, useEffect } from "react";
import vehiculoService from "../services/vehiculo.service";

export default function ReporteComparativa() {
    const [promediosReparaciones, setPromediosReparaciones] = useState([]);

    async function buscarPromediosReparaciones() {
        try {
            const response = await vehiculoService.obtenerPromedioReparacion();
            setPromediosReparaciones(response.data);
        } catch (error) {
            console.error('Error al obtener los registros:', error);
        }
    }

    useEffect(() => {
        buscarPromediosReparaciones();
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
                                        Marca vehiculo
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Tiempo promedio de reparación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    promediosReparaciones.map((promedioReparacion, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {promedioReparacion.marca}
                                            </td>
                                            <td className="px-6 py-3">
                                                {promedioReparacion.tiempoPromedioReparacion !== -1
                                                    ? (promedioReparacion.tiempoPromedioReparacion > 1
                                                        ? `${promedioReparacion.tiempoPromedioReparacion} días`
                                                        : `${promedioReparacion.tiempoPromedioReparacion} día`)
                                                    : "Aún no hay reparaciones"
                                                }
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