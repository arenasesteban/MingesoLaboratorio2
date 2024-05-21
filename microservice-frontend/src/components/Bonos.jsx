import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import BotonNuevo from './BotonNuevo';
import BotonEliminar from './BotonEliminar';
import { BonoContext } from '../context/bonoContext';

export default function Bonos() {
    const { bonos, eliminarBono } = useContext(BonoContext);
    
    const navigate = useNavigate();

    const manejarOnClickNavigate = () => {
        navigate("/bonos/bonos-formulario");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Bonos</h1>
                        <h2 className="text-gray-500 uppercase">Administración de bonos</h2>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Nuevo bono"}/>
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
                                        Cantidad de Bonos
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Monto bono
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bonos.map((bono, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {bono.marca}
                                            </td>
                                            <td class="px-6 py-3">
                                                {bono.cantidad}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {bono.valor}
                                            </td>
                                            <td class="px-6 py-3">
                                                <BotonEliminar onClick={() => eliminarBono(index)}/>
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