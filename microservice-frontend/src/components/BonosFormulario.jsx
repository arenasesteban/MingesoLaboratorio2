import React, { useContext, useState } from "react";
import { BonoContext } from "../context/bonoContext";
import { useNavigate } from "react-router-dom";
import BotonRegistrar from "./BotonRegistrar";

export default function BonosFormulario() {
    const [marca, setMarca] = useState("");
    const [valor, setMonto] = useState(0);
    const [cantidad, setCantidad] = useState(0);

    const { agregarBono } = useContext(BonoContext);
    const navigate = useNavigate();

    const manejarNuevoBono = () => {
        agregarBono({
            marca,
            valor,
            cantidad
        })

        navigate("/bonos");
    }

    return ( 
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Bonos</h1>
                        <h2 className="text-gray-500 uppercase">Ingresar bono</h2>
                    </div>
                </div>
                <div className="bg-white mt-6 p-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <form>
                        <div className="grid gap-4 grid-cols-3">
                            <div>
                                <label for="marca" class="block mb-2 font-medium text-gray-700">Marca vehiculo</label>
                                <input type="text" id="marca" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setMarca(e.target.value)} required />
                            </div>
                            <div>
                                <label for="monto" class="block mb-2 font-medium text-gray-700">Monto bono</label>
                                <input type="number" id="monto" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setMonto(e.target.value)} required />
                            </div>
                            <div>
                                <label for="cantidad" class="block mb-2 font-medium text-gray-700">Cantidad bonos</label>
                                <input type="number" id="cantidad" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" onChange={e => setCantidad(e.target.value)} required />
                            </div>
                            <div className="col-span-3 flex items-end justify-end">
                                <BotonRegistrar onClick={manejarNuevoBono} tipoAccion="Registrar"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}