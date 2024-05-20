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
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="text-3xl font-bold text-gray-700 uppercase">
                        <h1>Vehiculos registrados</h1>
                    </div>
                    <BotonNuevo onClick={manejarOnClickNavigate} tipoElemento={"Registrar vehiculo"}/>
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
                                        Marca
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Modelo
                                    </th>
                                    <th scope="col" class="px-6 py-4">
                                        Tipo
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Motor
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Año fabricación
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Asientos
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Kilometraje
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vehiculos.map((vehiculo, index) => (
                                        <tr key={index} class="bg-white border-b hover:bg-gray-50">
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
                                                {vehiculo.tipoAuto}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.tipoMotor}
                                            </td>
                                            <td class="px-6 py-3">
                                                {vehiculo.anoFabricacion}
                                            </td>
                                            <td class="px-6 py-3"> 
                                                {vehiculo.numeroAsientos}
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
