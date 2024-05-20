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
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="text-3xl font-bold text-gray-700 uppercase">
                        <h1>Historial de reparaciones</h1>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Nueva reparación"}/>
                </div>
                <div className="mt-6 overflow-auto shadow">
                    <div>
                        <table className="bg-white text-left w-full">
                            <thead className="text-gray-700 uppercase border-b">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Patente
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Fecha ingreso
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Fecha salida
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Fecha retiro
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Monto total
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registros.map((registro, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
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
