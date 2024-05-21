import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BotonNuevo from './BotonNuevo';
import vehiculoService from "../services/vehiculo.service";

export default function Vehiculos() {
    const [vehiculos, setVehiculos] = useState([]);

    async function buscarVehiculos() {
        try {
            const response = await vehiculoService.obtenerVehiculos();
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener los vehículos:', error);
        }
    }

    useEffect(() => {
        buscarVehiculos();
    }, [])

    const navigate = useNavigate();

    const manejarOnClickNavigate = () => {
        navigate("/vehiculos/registro");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Vehiculos</h1>
                        <h2 className="text-gray-500 uppercase">Lista de registrados</h2>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Registrar vehiculo"}/>
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
                                        Marca
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Modelo
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Tipo
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Motor
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Año fabricación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Asientos
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Kilometraje
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vehiculos.map((vehiculo, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {vehiculo.patente}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.marca}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.modelo}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.tipo}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.motor}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.ano_fabricacion}
                                            </td>
                                            <td class="px-6 py-3"> 
                                                {vehiculo.numero_asientos}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.kilometraje} km
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
