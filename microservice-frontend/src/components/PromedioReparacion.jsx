import { React, useState, useEffect } from "react";
import vehiculoService from "../services/vehiculo.service";

export default function PromedioReparacion() {
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
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2 border-r border-gray-400">Reporte</h1>
                        <h2 className="text-2xl font-light ml-2">Tiempo promedio de reparación de un vehiculo por marca</h2>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow">
                    <div>
                        <table className="bg-white text-left w-full">
                            <thead className="text-gray-700 uppercase border-b">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Marca vehiculo
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Tiempo promedio de reparación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    promediosReparaciones.map((promedioReparacion, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
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