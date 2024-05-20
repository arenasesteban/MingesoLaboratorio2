import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import registroService from "../services/registro.service";
import BotonRegistrar from "./BotonRegistrar";

export default function Detalle() {
    console.log("")

    const { idRegistro, bono } = useParams();
    const [detalle, setDetalle] = useState("");

    async function buscarInformacion() {
        try {
            const registroResponse = await registroService.calcularTotal(idRegistro, bono);
            setDetalle(registroResponse.data);
            console.log("Registro response: ", registroResponse.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarInformacion();
    }, [idRegistro]);

    const navigate = useNavigate();

    const manejarOnClickNavigate = () => {
        navigate("/reparaciones");
    }

    return (
        <div className="flex h-4/5 m-9 p-12 bg-gray-100 shadow-md border border-gray-300 rounded-md">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                    <div className="flex items-center text-gray-700">
                        <h1 className="text-3xl font-bold uppercase pr-4 mr-2">Detalle reparación</h1>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <div className="bg-white py-4 px-2 border rounded-md shadow">
                        <div className="flex justify-between space-x-56 bg-gray-100 mx-2 px-10 py-3 rounded-md">
                            <p className="font-bold text-gray-700 uppercase">Operación</p>
                            <p className="font-bold text-gray-700 uppercase">Monto</p>
                        </div>
                        <div className="flex justify-between space-x-56 px-12 py-3">
                            <p className="font-bold text-gray-700">Reparaciones</p>
                            <p className="text-gray-700">$ {detalle.reparaciones}</p>
                        </div>
                        <div className="flex justify-between space-x-56 px-12 py-3">
                            <p className="font-bold text-gray-700">Recargos</p>
                            <p className="text-gray-700">$ {detalle.recargos}</p>
                        </div>
                        <div className="flex justify-between space-x-56 px-12 py-3">
                            <p className="font-bold text-gray-700">Descuento</p>
                            <p className="text-gray-700">$ {detalle.descuentos}</p>
                        </div>
                        <div className="flex justify-between space-x-56 bg-gray-100 mx-2 px-10 py-3 rounded-md">
                            <p className="font-bold text-gray-700">Total</p>
                            <p className="text-gray-700">$ {detalle.reparaciones + detalle.recargos - detalle.descuentos}</p>
                        </div>
                        <div className="flex justify-between space-x-56 px-12 py-3">  
                            <p className="font-bold text-gray-700">IVA</p>
                            <p className="text-gray-700">$ {detalle.iva}</p>
                        </div>
                        <div className="flex justify-between space-x-56 bg-gray-100 mx-2 px-10 py-3 rounded-md">
                            <p className="font-bold text-gray-700">Monto total</p>
                            <p className="text-gray-700">$ {detalle.montoTotal}</p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <BotonRegistrar onClick={manejarOnClickNavigate} tipoAccion={"Cerrar detalle"}/>   
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}