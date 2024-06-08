import { React, useState } from "react";
import BotonRegistrar from "./BotonRegistrar";
import vehiculoService from "../services/vehiculo.service";
import { useNavigate } from "react-router-dom";

export default function VehiculosFormulario() {
    const [patente, setPatente] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipo, setTipo] = useState("Sedan");
    const [motor, setMotor] = useState("Gasolina");
    const [numero_asientos, setNumeroAsientos] = useState("");
    const [kilometraje, setKilometriaje] = useState("");
    const [ano_fabricacion, setAnoFabricacion] = useState("");

    const navigate = useNavigate();

    async function manejarRegistroVehiculo(e) {
        e.preventDefault();

        try {
            const response = await vehiculoService.registrarVehiculo({
                patente,
                marca, 
                modelo,
                tipo,
                motor,
                numero_asientos,
                kilometraje,
                ano_fabricacion
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
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Vehiculos</h1>
                        <h2 className="text-gray-500 uppercase">Registrar vehiculo</h2>
                    </div>
                </div>
                <div className="bg-white mt-6 p-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <form>
                        <div className="grid gap-4 grid-cols-2">
                            <div>
                                <label for="patente" class="block mb-2 font-semibold text-gray-700">Patente</label>
                                <input type="text" id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setPatente(e.target.value.toUpperCase())} required />
                            </div>
                            <div>
                                <label for="marca" class="block mb-2 font-semibold text-gray-700">Marca</label>
                                <input type="text" id="marca" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setMarca(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())} required />
                            </div>
                            <div>
                                <label for="modelo" class="block mb-2 font-semibold text-gray-700">Modelo</label>
                                <input type="text" id="modelo" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setModelo(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())} required />
                            </div>
                            <div>
                                <label for="tipo" class="block mb-2 font-semibold text-gray-700">Tipo</label>
                                <select id="tipo" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setTipo(e.target.value)} required>
                                    <option>Sedan</option>
                                    <option>Hatchback</option>
                                    <option>SUV</option>
                                    <option>Pickup</option>
                                    <option>Furgoneta</option>
                                </select>
                            </div>
                            <div>
                                <label for="motor" class="block mb-2 font-semibold text-gray-700">Motor</label>
                                <select id="motor" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setMotor(e.target.value)} required>
                                    <option>Gasolina</option>
                                    <option>Diesel</option>
                                    <option>Híbrido</option>
                                    <option>Eléctrico</option>
                                </select>
                            </div>
                            <div>
                                <label for="numero_asientos" class="block mb-2 font-semibold text-gray-700">Número asientos</label>
                                <input type="number" id="numero_asientos" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setNumeroAsientos(e.target.value)} required />
                            </div>
                            <div>
                                <label for="kilometraje" class="block mb-2 font-semibold text-gray-700">Kilometraje</label>
                                <input type="number" id="kilometraje" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setKilometriaje(e.target.value)} required />
                            </div>
                            <div>
                                <label for="ano_fabricacion" class="block mb-2 font-semibold text-gray-700">Año fabricación</label>
                                <input type="number" id="ano_fabricacion" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setAnoFabricacion(e.target.value)} required />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <BotonRegistrar onClick={manejarRegistroVehiculo} enlace="" tipoAccion="Registrar"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}