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
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="text-3xl font-bold text-gray-700 uppercase">
                        <h1>Administración de Bonos</h1>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Nuevo bono"}/>
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
                                        Cantidad de Bonos
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Monto bono
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bonos.map((bono, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
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