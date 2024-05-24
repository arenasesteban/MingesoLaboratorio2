import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonNuevo from './BotonNuevo';
import reparacionService from "../services/reparacion.service";

export default function ListaReparaciones() {
    const [reparaciones, setReparaciones] = useState([]);

    async function buscarListaReparaciones() {
        try {
            const response = await reparacionService.obtenerReparaciones();
            setReparaciones(response.data);
        } catch (error) {
            console.error("Error al obtener los registros: ", error);
        }
    }

    useEffect(() => {
        buscarListaReparaciones();
    }, [])

    const navigate = useNavigate();

    const redirecToListaReparacionesRegistrar = () => {
        navigate("/");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Lista reparaciones - Disponibles</h2>
                    </div>
                    <BotonNuevo onClick={redirecToListaReparacionesRegistrar} tipoElemento={"Crear reparación"}/>
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
                                        Gasolina
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Diesel
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Híbrido
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Eléctrico
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reparaciones.map((reparacion, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {reparacion.tipo_reparacion}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_gasolina}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_diesel}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_hibrido}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_electrico}
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
