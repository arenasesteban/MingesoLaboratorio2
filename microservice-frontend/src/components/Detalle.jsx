import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import registroService from "../services/registro.service";
import vehiculoService from "../services/vehiculo.service";
import BotonRegistrar from "./BotonRegistrar";

export default function Detalle() {
    const { id_registro } = useParams();
    const [registro, setRegistro] = useState({});
    const [vehiculo, setVehiculo] = useState({})

    async function buscarInformacion() {
        try {
            const response_registro = await registroService.obtenerRegistro(id_registro);
            console.log("Registro response: ", response_registro.data);
            setRegistro(response_registro.data);
            
            const response_vehiculo = await vehiculoService.obtenerVehiculo(response_registro.data.patente);
            console.log("Vehiculo response: ", response_vehiculo.data);
            setVehiculo(response_vehiculo.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarInformacion();
    }, []);

    const navigate = useNavigate();

    const redirecToReparaciones = () => {
        navigate("/reparaciones");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full gap-6">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-600 uppercase">Detalle - ID Reparacion {registro.id_registro}</h2>
                    </div>
                    <BotonRegistrar onClick={redirecToReparaciones} tipoAccion={"Volver a reparaciones"}/>
                </div>
                <div className="flex gap-6">
                    <div className="bg-white rounded-xl w-[350px] p-6 space-y-2 shadow-md">
                        <h3 className="font-semibold uppercase text-gray-900">Vehiculo</h3>
                        <div className="flex gap-8">
                            <div className="space-y-2 text-gray-800">
                                <h4 className="text-sm font-medium">Patente</h4>
                                <h4 className="text-sm font-medium">Marca</h4>
                                <h4 className="text-sm font-medium">Modelo</h4>
                                <h4 className="text-sm font-medium">Kilometraje</h4>
                                <h4 className="text-sm font-medium">Año fabricación</h4> 
                                <h4 className="text-sm font-medium">Numero de asientos</h4>
                            </div>
                            <div className="space-y-2 text-gray-800">
                                <p className="text-sm">{vehiculo.patente}</p>
                                <p className="text-sm">{vehiculo.marca}</p>
                                <p className="text-sm">{vehiculo.modelo}</p>
                                <p className="text-sm">{vehiculo.kilometraje} km</p>
                                <p className="text-sm">{vehiculo.ano_fabricacion}</p>   
                                <p className="text-sm">{vehiculo.numero_asientos}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl w-[350px] p-6 space-y-2 shadow-md">
                        <h3 className="font-semibold uppercase text-gray-900">Reparación</h3>
                        <div className="flex gap-8">
                            <div className="space-y-2 text-sm font-medium text-gray-800">
                                <h4>Fecha ingreso</h4>
                                <h4>Hora ingreso</h4>
                                <h4>Fecha salida</h4>
                                <h4>Hora salida</h4>
                                <h4>Fecha retiro</h4> 
                                <h4>Hora retiro</h4>
                            </div>
                            <div className="space-y-2 text-sm text-gray-800">
                                <p>{registro.fecha_ingreso}</p>
                                <p>{registro.hora_ingreso}</p>
                                <p>{registro.fecha_salida}</p>
                                <p>{registro.hora_salida}</p>
                                <p>{registro.fecha_retiro}</p>   
                                <p>{registro.hora_retiro}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-white border border-emerald-700 rounded-xl p-6 space-y-2 shadow-lg">
                        <h3 className="text-lg font-semibold uppercase text-gray-700">Detalle reparación</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end gap-16 text-gray-700">
                                <div>
                                    <h4 className="font-medium">Reparaciones</h4>
                                    <p className="text-sm text-gray-600">Suma del costo de todas las reparaciones individuales realizadas al vehículo</p>
                                </div>
                                <p>$ {registro.monto_reparaciones}</p>
                            </div>
                            <div className="flex justify-between items-end gap-16 text-gray-700">
                                <div>
                                    <h4 className="font-medium">Recargos</h4>
                                    <p className="text-sm text-gray-600">Cargos adicionales</p>
                                </div>
                                <p>$ {registro.monto_recargos}</p>
                            </div>
                            <div className="flex justify-between items-end gap-16 text-gray-700">
                                <div>
                                    <h4 className="font-medium">Descuentos</h4>
                                    <p className="text-sm text-gray-600">Reducciones</p>
                                </div>
                                <p>$ {registro.monto_descuentos}</p>
                            </div>
                            <div className="flex justify-between items-end gap-16 text-gray-700 border-t border-gray-400 pt-2">
                                <div>
                                    <h4 className="font-medium">SUB Total</h4>
                                    <p className="text-sm text-gray-600">Costo total de las reparaciones antes de aplicar el IVA</p>
                                </div>
                                <p>$ {registro.monto_reparaciones + registro.monto_recargos - registro.monto_descuentos}</p>
                            </div>
                            <div className="flex justify-between items-end gap-16 text-gray-700">
                                <div>
                                    <h4 className="font-medium">IVA</h4>
                                    <p className="text-sm text-gray-600">Impuesto obligatorio calculado sobre el subtotal de las reparaciones</p>
                                </div>
                                <p>$ {registro.monto_iva}</p>
                            </div>
                            <div className="flex justify-between items-end gap-16 text-gray-700 border-t border-gray-400 pt-2">
                                <div>
                                    <h4 className="font-medium">Costo total</h4>
                                </div>
                                <p>$ {registro.costo_total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}