import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonNuevo from './BotonNuevo';
import registroService from "../services/registro.service";

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

    const manejarOnClickNavigate = () => {
        navigate("/reparaciones/registrar");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Historial de reparaciones</h2>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Nueva reparación"}/>
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
                                        Monto total
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
                                                {registro.fechaIngreso}
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.fechaSalida}
                                            </td>
                                            <td class="px-6 py-3">
                                                {registro.fechaRetiro}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {registro.montoTotal}
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
