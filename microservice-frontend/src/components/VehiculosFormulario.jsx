import { React, useState } from "react";
import BotonRegistrar from "./BotonRegistrar";
import vehiculoService from "../services/vehiculo.service";
import { useNavigate } from "react-router-dom";

export default function VehiculosFormulario() {
    const [patente, setPatente] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipoAuto, setTipoAuto] = useState("Sedan");
    const [anoFabricacion, setAnoFabricacion] = useState("");
    const [tipoMotor, setTipoMotor] = useState("Gasolina");
    const [numeroAsientos, setNumeroAsientos] = useState("");
    const [kilometraje, setKilometriaje] = useState("");

    const navigate = useNavigate();

    async function manejarRegistroVehiculo(e) {
        e.preventDefault();

        try {
            const response = await vehiculoService.registrarVehiculo({
                patente,
                marca, 
                modelo,
                tipoAuto,
                anoFabricacion,
                tipoMotor,
                numeroAsientos,
                kilometraje
            });

            console.log(response.data);
            alert("Se ha realizado el registro del nuevo vehiculo con éxito.");
            navigate("/vehiculos");
        } catch (error) {
            console.log(error);
            alert("Ha ocurrido algo, no se ha podido registrar correctamente el vehiculo ingresado.")
        }
    }

    return (
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2 border-r border-gray-700">Vehiculos</h1>
                        <h2 className="text-2xl font-light ml-2">Registrar vehiculo</h2>
                    </div>
                </div>
                <form className="mt-6">
                    <div className="grid gap-4 grid-cols-2">
                        <div>
                            <label for="patente" class="block mb-2 font-medium text-gray-700">Patente</label>
                            <input type="text" id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setPatente(e.target.value.toUpperCase())} required />
                        </div>
                        <div>
                            <label for="marca" class="block mb-2 font-medium text-gray-700">Marca</label>
                            <input type="text" id="marca" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setMarca(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())} required />
                        </div>
                        <div>
                            <label for="modelo" class="block mb-2 font-medium text-gray-700">Modelo</label>
                            <input type="text" id="modelo" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setModelo(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())} required />
                        </div>
                        <div>
                            <label for="anoFabricacion" class="block mb-2 font-medium text-gray-700">Año fabricación</label>
                            <input type="number" id="anoFabricacion" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setAnoFabricacion(e.target.value)} required />
                        </div>
                        <div>
                            <label for="tipoMotor" class="block mb-2 font-medium text-gray-700">Motor</label>
                            <select id="tipoMotor" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setTipoMotor(e.target.value)} required>
                                <option>Gasolina</option>
                                <option>Diesel</option>
                                <option>Híbrido</option>
                                <option>Eléctrico</option>
                            </select>
                        </div>
                        <div>
                            <label for="tipoAuto" class="block mb-2 font-medium text-gray-700">Tipo</label>
                            <select id="tipoAuto" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setTipoAuto(e.target.value)} required>
                                <option>Sedan</option>
                                <option>Hatchback</option>
                                <option>SUV</option>
                                <option>Pickup</option>
                                <option>Furgoneta</option>
                            </select>
                        </div>
                        <div>
                            <label for="numeroAsientos" class="block mb-2 font-medium text-gray-700">Número asientos</label>
                            <input type="number" id="numeroAsientos" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setNumeroAsientos(e.target.value)} required />
                        </div>
                        <div>
                            <label for="kilometraje" class="block mb-2 font-medium text-gray-700">Kilometraje</label>
                            <input type="number" id="kilometraje" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setKilometriaje(e.target.value)} required />
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <BotonRegistrar onClick={manejarRegistroVehiculo} enlace="" tipoAccion="Registrar"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}