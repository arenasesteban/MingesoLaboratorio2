import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonNuevo from './BotonNuevo';
import BotonSecundario from "./BotonSecundario";
import registroService from "../services/registro.service";
import BotonCalcular from "./BotonCalcular";
import BotonDetalle from "./BotonDetalle";

export default function Reparaciones() {
    const [registros, setRegistros] = useState([]);

    async function buscarRegistros() {
        try {
            const response = await registroService.obtenerRegistros();
            setRegistros(response.data);
        } catch (error) {
            console.error("Error al obtener los registros: ", error);
        }
    }

    useEffect(() => {
        buscarRegistros();
    }, [])

    const navigate = useNavigate();

    const redirecToReparacionesRegistrar = () => {
        navigate("/reparaciones/registrar");
    }

    const redirecToListaReparaciones = () => {
        navigate("/reparaciones/lista-reparaciones");
    }

    const redirectToReparacionesEditar = (id_registro) => {
        navigate(`/reparaciones/editar/${id_registro}`);
    }

    const redirectToReparacionesDetalle = (id_registro) => {
        navigate(`/reparaciones/detalle/${id_registro}`);
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Historial de reparaciones</h2>
                    </div>
                    <div className="flex gap-4">
                        <BotonSecundario onClick={redirecToListaReparaciones}></BotonSecundario>
                        <BotonNuevo onClick={redirecToReparacionesRegistrar} tipoElemento={"Nueva reparación"}/>
                    </div>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Patente
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Fecha ingreso
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Fecha salida
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Fecha retiro
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Costo total
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registros.map((registro, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {registro.patente}
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.fecha_ingreso}
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.fecha_salida !== null
                                                    ? `${registro.fecha_salida}`
                                                    : "-"
                                                }
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.fecha_retiro !== null
                                                    ? `${registro.fecha_retiro}`
                                                    : "-"
                                                }
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.costo_total !== null
                                                    ? `$ ${registro.costo_total}`
                                                    : "-"
                                                }
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.costo_total !== null
                                                    ? <BotonDetalle onClick={() => redirectToReparacionesDetalle(registro.id_registro)} />
                                                    : <BotonCalcular onClick={() => redirectToReparacionesEditar(registro.id_registro)} />
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
