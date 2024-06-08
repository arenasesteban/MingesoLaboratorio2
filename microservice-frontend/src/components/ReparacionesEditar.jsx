import React, { useState, useEffect, useContext  } from "react";
import BotonRegistrar from "./BotonRegistrar";
import registroService from "../services/registro.service";
import { useParams, useNavigate } from "react-router-dom";
import { BonoContext } from "../context/bonoContext";
import vehiculoService from "../services/vehiculo.service";

export default function ReparacionesEditar() {
    const { id_registro } = useParams();
    const [registro, setRegistro] = useState({});
    const [vehiculo, setVehiculo] = useState({});
    const { bonos, modificarBono } = useContext(BonoContext);
    const [bonos_disponibles, setBonosDisponibles] = useState([]);

    const manejarBonosDisponibles = (marca) => {
        const bonos_disponibles = bonos.filter(bono => bono.marca === marca);
        setBonosDisponibles(bonos_disponibles);
    }

    useEffect(() => {
        const buscarRegistro = async () => {
            try {
                const response_registro = await registroService.obtenerRegistro(id_registro);
                setRegistro(response_registro.data);

                const response_vehiculo = await vehiculoService.obtenerVehiculo(response_registro.data.patente);
                setVehiculo(response_vehiculo.data);
                
                manejarBonosDisponibles(response_vehiculo.data.marca);
            } catch (error) {
                console.error('Error', error);
            }
        };
        
        buscarRegistro();
    }, [id_registro]);

    const [fecha_salida, setFechaSalida] = useState("");
    const [hora_salida, setHoraSalida] = useState("");
    const [fecha_retiro, setFechaRetiro] = useState("");
    const [hora_retiro, setHoraRetiro] = useState("");
    const [bono, setBono] = useState(0);

    const navigate = useNavigate();

    async function manejarCalcularTotal(e) {
        e.preventDefault();
    
        try {
            const response_registro = await registroService.actualizarRegistro({
                id_registro: registro.id_registro,
                fecha_ingreso: registro.fecha_ingreso,
                hora_ingreso: registro.hora_ingreso,
                monto_reparaciones: registro.monto_reparaciones,
                fecha_salida,
                hora_salida,
                fecha_retiro,
                hora_retiro,
                patente: registro.patente 
            });
            console.log(response_registro.data);
    
            const response_calcular_total = await registroService.calcularTotal(response_registro.data, bono);
            console.log(response_calcular_total);
    
            if(bono > 0) {
                modificarBono(vehiculo.marca, bono);
            }
    
            alert("Éxito");
            navigate(`/reparaciones/detalle/${registro.id_registro}`)
        } catch (error) {
            console.log(error);
            alert("Error");
        }
    }
    return (
        <div className="flex h-4/    mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Nuevo registro</h2>
                    </div>
                </div>
                <div className="bg-white mt-6 p-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <form className="space-y-4">
                        <div className="grid gap-4 grid-cols-4">
                            <div>
                                <label for="patente" class="block mb-2 font-medium text-gray-700">Patente</label>
                                <input type="number" id="patente" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={registro.patente} disabled />
                            </div>
                            <div>
                                <label for="kilometraje" class="block mb-2 font-medium text-gray-700">Kilometraje</label>
                                <input type="number" id="kilometraje" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={vehiculo.kilometraje} disabled />
                            </div>
                            <div>
                                <label for="fecha_ingreso" class="block mb-2 font-medium text-gray-700">Fecha ingreso</label>
                                <input type="number" id="fecha_ingreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={registro.fecha_ingreso} disabled />
                            </div>
                            <div>
                                <label for="hora_ingreso" class="block mb-2 font-medium text-gray-700">Hora ingreso</label>
                                <input type="number" id="hora_ingreso" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={registro.hora_ingreso} disabled />
                            </div>

                        </div>
                        <div className="grid gap-4 grid-cols-2">
                            <div>
                                <label for="fecha_salida" class="block mb-2 font-medium text-gray-700">Fecha salida</label>
                                <input type="date" id="fecha_salida" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaSalida(e.target.value)} required />
                            </div>
                            <div>
                                <label for="hora_salida" class="block mb-2 font-medium text-gray-700">Hora salida</label>
                                <input type="time" id="hora_salida" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraSalida(e.target.value)} required />
                            </div>
                            <div>
                                <label for="fecha_retiro" class="block mb-2 font-medium text-gray-700">Fecha retiro</label>
                                <input type="date" id="fecha_retiro" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setFechaRetiro(e.target.value)} required />
                            </div>
                            <div>
                                <label for="hora_retiro" class="block mb-2 font-medium text-gray-700">Hora retiro</label>
                                <input type="time" id="hora_retiro" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setHoraRetiro(e.target.value)} required />
                            </div>
                            <div>
                                <label for="bono" class="block mb-2 font-medium text-gray-700">Bono</label>
                                <select id="bono" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={e => setBono(e.target.value)} required>
                                    <option value="">Seleccionar opción</option>
                                    <option value="0">No aplicar</option>
                                    {
                                        bonos_disponibles.map((bono, index) => (
                                            <option key={index} value={bono.valor}>
                                                $ {bono.valor}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex items-end justify-end">
                                <BotonRegistrar onClick={manejarCalcularTotal} tipoAccion="Calcular Total"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}