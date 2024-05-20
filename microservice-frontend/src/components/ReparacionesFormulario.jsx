import React, { useContext, useEffect, useState } from "react";
import vehiculoService from "../services/vehiculo.service";
import reparaciones from "../data/reparacionesData";
import BotonRegistrar from "./BotonRegistrar";
import registroService from "../services/registro.service";
import reparacionService from "../services/reparacion.service";
import { useNavigate } from "react-router-dom";
import { BonoContext } from "../context/bonoContext";

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

    const [reparacionesDisponibles, setReparacionesDisponibles] = useState(reparaciones);
    const [reparacionesSeleccionadas, setReparacionesSeleccionadas] = useState([]);

    const manejarSeleccionarReparacion = (index) => {
        setReparacionesSeleccionadas([...reparacionesSeleccionadas, reparacionesDisponibles[index]].sort((a, b) => a.numero - b.numero));

        const nuevasReparacionesDisponibles = reparacionesDisponibles.filter(function(_, i) {
            return i != index;
        });
        
        setReparacionesDisponibles(nuevasReparacionesDisponibles);
    }

    const manejarEliminarReparacion = (index) => {
        setReparacionesDisponibles([...reparacionesDisponibles, reparacionesSeleccionadas[index]].sort((a, b) => a.numero - b.numero));

        const nuevasReparacionesSeleccionadas = reparacionesSeleccionadas.filter(function(_, i) {
            return i != index;
        });
        
        setReparacionesSeleccionadas(nuevasReparacionesSeleccionadas);
    }


    const [marca, setMarca] = useState("");
    const [bonosDisponibles, setbonosDisponibles] = useState([]);

    const manejarBonosDisponibles = (marca) => {
        const bonosDisponibles = bonos.filter(bono => bono.marca === marca);
        setbonosDisponibles(bonosDisponibles);
    }

    const [patente, setPatente] = useState("");
    const [tipoMotor, setTipoMotor] = useState("");

    const [kilometraje, setKilometriaje] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [horaIngreso, setHoraIngreso] = useState("");
    const [fechaSalida, setFechaSalida] = useState("");
    const [horaSalida, setHoraSalida] = useState("");
    const [fechaRetiro, setFechaRetiro] = useState("");
    const [horaRetiro, setHoraRetiro] = useState("");
    const [bono, setBono] = useState(0);

    const { bonos, modificarBono } = useContext(BonoContext);
    const navigate = useNavigate();

    const calcularPrecioReparaciones = (reparaciones, tipoMotor) => {
        const reparacionesConPrecio = []
        let precio = 0;

        for(const reparacion of reparaciones) {
            switch (tipoMotor) {
                case "Gasolina":
                    precio = reparacion.gasolina;
                    break;
                case "Diesel":
                    precio = reparacion.diesel;
                    break;
                case "Híbrido":
                    precio = reparacion.hibrido;
                    break;
                case "Eléctrico":
                    precio = reparacion.electrico;
                    break;
            }

            const reparacionObjeto = {
                numeroReparacion: reparacion.numeroReparacion,
                tipoReparacion: reparacion.tipoReparacion,
                precio,
            };
    
            reparacionesConPrecio.push(reparacionObjeto);
        }

        return reparacionesConPrecio;
    }

    async function manejarCrearRegistro(e) {
        e.preventDefault();

        try {
            const responseRegistro = await registroService.crearRegistro({
                fechaIngreso,
                horaIngreso,
                fechaSalida,
                horaSalida,
                fechaRetiro,
                horaRetiro,
                patente
            });
            console.log("Response - Crear registro: ", responseRegistro.data);

            const responseVehiculo = await vehiculoService.actualizarVehiculo(patente, kilometraje);
            console.log("Response - Actualizar vehiculo", responseVehiculo.data);

            const reparacionesConPrecio = calcularPrecioReparaciones(reparacionesSeleccionadas, tipoMotor);
            const responseReparacion = await reparacionService.crearReparacion(reparacionesConPrecio, responseRegistro.data.idRegistro);
            console.log("Response - Crear reparación", responseReparacion.data);

            if(bono > 0) {
                modificarBono(marca, bono);
            }

            alert("[ÉXITO]");
            navigate(`/reparaciones/registrar/detalle/${responseRegistro.data.idRegistro}/${bono}`);
        } catch (error) {
            console.log(error);
            alert("[ERROR]")
        }
    }

    return (
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2 border-r border-gray-700">Reparaciones</h1>
                        <h2 className="text-2xl font-light ml-2">Registrar reparación</h2>
                    </div>
                </div>
                <form className="mt-6">
                    <div className="grid gap-4 grid-cols-3">
                        <div>
                            <label for="patente" class="block mb-2 font-medium text-gray-700">Patente</label>
                            <select id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            onChange={e => {
                                const selectedValue = JSON.parse(e.target.value);
                                setPatente(selectedValue.patente);
                                setTipoMotor(selectedValue.tipoMotor);
                                setMarca(selectedValue.marca);
                                manejarBonosDisponibles(selectedValue.marca);
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
                            <input type="number" id="kilometraje" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setKilometriaje(e.target.value)} required />
                        </div>
                        <div>
                            <label for="bono" class="block mb-2 font-medium text-gray-700">Bono</label>
                            <select id="bono" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setBono(e.target.value)} required>
                                <option value="">Seleccionar opción</option>
                                <option value="0">No aplicar</option>
                                {
                                    bonosDisponibles.map((bono, index) => (
                                        <option key={index} value={bono.valor}>
                                            $ {bono.valor}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label for="patente" class="block mb-2 font-medium text-gray-700">Reparaciones disponibles</label>
                            <select id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => (e.target.value !== "" ? manejarSeleccionarReparacion(e.target.value) : null)} required>
                                <option value="">Elegir reparación</option>
                                {
                                    reparacionesDisponibles.map((reparacion, index) => (
                                        <option key={index} value={index}>
                                            {reparacion.numeroReparacion} - {reparacion.tipoReparacion}
                                        </option>
                                    ))    
                                }
                            </select>
                        </div>
                        <div>
                            <label for="patente" class="block mb-2 font-medium text-gray-700">Reparaciones seleccionadas</label>
                            <select id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => (e.target.value !== "" ? manejarEliminarReparacion(e.target.value) : null)} required>
                                <option value="">Revisar selección</option>
                                {
                                    reparacionesSeleccionadas.map((reparacion, index) => (
                                        <option key={index} value={index}>
                                            {reparacion.numeroReparacion} - {reparacion.tipoReparacion}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div></div>
                        <div>
                            <label for="fechaIngreso" class="block mb-2 font-medium text-gray-700">Fecha ingreso</label>
                            <input type="date" id="fechaIngreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaIngreso(e.target.value)} required />
                        </div>
                        <div>
                            <label for="horaIngreso" class="block mb-2 font-medium text-gray-700">Hora ingreso</label>
                            <input type="time" id="horaIngreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraIngreso(e.target.value)} required />
                        </div>
                        <div></div>
                        <div>
                            <label for="fechaSalida" class="block mb-2 font-medium text-gray-700">Fecha salida</label>
                            <input type="date" id="fechaSalida" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaSalida(e.target.value)} required />
                        </div>
                        <div>
                            <label for="horaSalida" class="block mb-2 font-medium text-gray-700">Hora salida</label>
                            <input type="time" id="horaSalida" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraSalida(e.target.value)} required />
                        </div>
                        <div></div>
                        <div>
                            <label for="fechaRetiro" class="block mb-2 font-medium text-gray-700">Fecha retiro</label>
                            <input type="date" id="fechaRetiro" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaRetiro(e.target.value)} required />
                        </div>
                        <div>
                            <label for="horaRetiro" class="block mb-2 font-medium text-gray-700">Hora retiro</label>
                            <input type="time" id="horaRetiro" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraRetiro(e.target.value)} required />
                        </div>
                        <div className="flex items-end justify-end">
                            <BotonRegistrar onClick={manejarCrearRegistro} tipoAccion="Registrar"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}