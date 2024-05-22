import React, { useEffect, useState } from "react";
import vehiculoService from "../services/vehiculo.service";
import reparaciones from "../data/reparacionesData";
import BotonRegistrar from "./BotonRegistrar";
import registroService from "../services/registro.service";
import reparacionService from "../services/reparacion.service";
import { useNavigate } from "react-router-dom";

export default function ReparacionesFormulario() {
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

    const [reparaciones_disponibles, setReparacionesDisponibles] = useState(reparaciones);
    const [reparaciones_seleccionadas, setReparacionesSeleccionadas] = useState([]);

    const manejarSeleccionarReparacion = (index) => {
        setReparacionesSeleccionadas([...reparaciones_seleccionadas, reparaciones_disponibles[index]].sort((a, b) => a.numero - b.numero));

        const reparaciones_disponibles_aux = reparaciones_disponibles.filter(function(_, i) {
            return i != index;
        });
        
        setReparacionesDisponibles(reparaciones_disponibles_aux);
    }

    const manejarEliminarReparacion = (index) => {
        setReparacionesDisponibles([...reparaciones_disponibles, reparaciones_seleccionadas[index]].sort((a, b) => a.numero - b.numero));

        const reparaciones_seleccionadas_aux = reparaciones_seleccionadas.filter(function(_, i) {
            return i != index;
        });
        
        setReparacionesSeleccionadas(reparaciones_seleccionadas_aux);
    }

    const [patente, setPatente] = useState("");
    const [motor, setMotor] = useState("");

    const [kilometraje, setKilometraje] = useState("");
    const [fecha_ingreso, setFechaIngreso] = useState("");
    const [hora_ingreso, setHoraIngreso] = useState("");

    const navigate = useNavigate();

    const calcularMontoReparaciones = (reparaciones, motor) => {
        let monto_reparaciones = 0;
        
        for(const reparacion of reparaciones) {
            switch (motor) {
                case "Gasolina":
                    monto_reparaciones += reparacion.gasolina;
                    break;
                case "Diesel":
                    monto_reparaciones += reparacion.diesel;
                    break;
                case "Híbrido":
                    monto_reparaciones += reparacion.hibrido;
                    break;
                case "Eléctrico":
                    monto_reparaciones += reparacion.electrico;
                    break;
            }
        }

        return monto_reparaciones;
    }

    const crearReparaciones = (reparaciones, motor, fecha_reparacion, hora_reparacion, id_registro, patente) => {
        const reparaciones_aux = []
        let monto_reparacion = 0;

        for(const reparacion of reparaciones) {
            switch (motor) {
                case "Gasolina":
                    monto_reparacion = reparacion.gasolina;
                    break;
                case "Diesel":
                    monto_reparacion = reparacion.diesel;
                    break;
                case "Híbrido":
                    monto_reparacion = reparacion.hibrido;
                    break;
                case "Eléctrico":
                    monto_reparacion = reparacion.electrico;
                    break;
            }

            const reparacion_objeto = {
                numero_reparacion: reparacion.numero_reparacion,
                tipo_reparacion: reparacion.tipo_reparacion,
                fecha_reparacion,
                hora_reparacion,
                monto_reparacion,
                id_registro,
                patente
            };
    
            reparaciones_aux.push(reparacion_objeto);
        }

        return reparaciones_aux;
    }

    async function manejarCrearRegistro(e) {
        e.preventDefault();

        try {
            const monto_reparaciones = calcularMontoReparaciones(reparaciones_seleccionadas, motor);
            console.log(monto_reparaciones);

            const response_registro = await registroService.crearRegistro({
                fecha_ingreso,
                hora_ingreso,
                monto_reparaciones,
                patente
            });
            console.log("Response - Crear registro: ", response_registro.data);

            const response_vehiculo = await vehiculoService.actualizarVehiculo(patente, kilometraje);
            console.log("Response - Actualizar vehiculo", response_vehiculo.data);

            const reparaciones_aux = crearReparaciones(reparaciones_seleccionadas, motor, fecha_ingreso, hora_ingreso, response_registro.data.id_registro, patente);

            const response_reparacion = await reparacionService.crearReparacion(reparaciones_aux);
            console.log("Response - Crear reparación", response_reparacion.data);

            alert("Éxito");
            navigate("/reparaciones");
        } catch (error) {
            console.log(error);
            alert("Error")
        }
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Nuevo registro</h2>
                    </div>
                </div>
                <div className="bg-white mt-6 p-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <form>
                        <div className="grid gap-4 grid-cols-2">
                            <div>
                                <label for="patente" class="block mb-2 font-medium text-gray-700">Patente</label>
                                <select id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                onChange={e => {
                                    const selectedValue = JSON.parse(e.target.value);
                                    setPatente(selectedValue.patente);
                                    setMotor(selectedValue.motor);
                                }} required>
                                    <option>Buscar patente</option>
                                    {
                                        vehiculos.map((vehiculo, index) => (
                                            <option key={index} value={JSON.stringify(vehiculo)}>
                                                {vehiculo.patente}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="kilometraje" class="block mb-2 font-medium text-gray-700">Kilometraje</label>
                                <input type="number" id="kilometraje" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setKilometraje(e.target.value)} required />
                            </div>
                            <div>
                                <label for="disponibles" class="block mb-2 font-medium text-gray-700">Reparaciones disponibles</label>
                                <select id="disponibles" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => (e.target.value !== "" ? manejarSeleccionarReparacion(e.target.value) : null)} required>
                                    <option value="">Elegir reparación</option>
                                    {
                                        reparaciones_disponibles.map((reparacion, index) => (
                                            <option key={index} value={index}>
                                                {reparacion.numero_reparacion} - {reparacion.tipo_reparacion}
                                            </option>
                                        ))    
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="seleccionadas" class="block mb-2 font-medium text-gray-700">Reparaciones seleccionadas</label>
                                <select id="seleccionadas" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => (e.target.value !== "" ? manejarEliminarReparacion(e.target.value) : null)} required>
                                    <option value="">Revisar selección</option>
                                    {
                                        reparaciones_seleccionadas.map((reparacion, index) => (
                                            <option key={index} value={index}>
                                                {reparacion.numero_reparacion} - {reparacion.tipo_reparacion}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label for="fecha_ingreso" class="block mb-2 font-medium text-gray-700">Fecha ingreso</label>
                                <input type="date" id="fecha_ingreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaIngreso(e.target.value)} required />
                            </div>
                            <div>
                                <label for="hora_ingreso" class="block mb-2 font-medium text-gray-700">Hora ingreso</label>
                                <input type="time" id="hora_ingreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraIngreso(e.target.value)} required />
                            </div>
                            <div className="col-span-2 flex items-end justify-end">
                                <BotonRegistrar onClick={manejarCrearRegistro} tipoAccion="Registrar"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}