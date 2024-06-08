import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BotonNuevo from "./BotonNuevo";
import BotonRegistrar from "./BotonRegistrar";
import reparacionService from "../services/reparacion.service";

export default function ListaReparacionesCrear() {
    const [reparaciones, setReparaciones] = useState([]);

    const navigate = useNavigate();

    const [tipo_reparacion, setTipoReparacion] = useState("");
    const [precio_gasolina, setPrecioGasolina] = useState("");
    const [precio_diesel, setPrecioDiesel] = useState("");
    const [precio_hibrido, setPrecioHibrido] = useState("");
    const [precio_electrico, setPrecioElectrico] = useState("");

    const manejarAñadirReparacion = (e) => {
        e.preventDefault();

        setReparaciones([...reparaciones, { 
            tipo_reparacion,
            precio_gasolina,
            precio_diesel,
            precio_hibrido,
            precio_electrico
        }]);

        setTipoReparacion("");
        setPrecioGasolina("");
        setPrecioDiesel("");
        setPrecioHibrido("");
        setPrecioElectrico("");
    }

    async function manejarCrearReparaciones(e) {
        e.preventDefault();

        try {
            console.log("Reparaciones creadas: ", reparaciones);
            const response = await reparacionService.crearReparaciones(reparaciones);
            console.log("Reparaciones guardadas: ", response.data);

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
                        <h2 className="text-gray-500 uppercase">Lista reparaciones - Crear</h2>
                    </div>
                </div>
                <div className="bg-white mt-6 p-6 shadow-lg shadow-gray-200 rounded-xl">
                    <form>
                        <div className="grid gap-4 grid-cols-5">
                            <div className="col-span-2">
                                <label for="marca" class="block mb-2 font-medium text-gray-700">Tipo Reparacion</label>
                                <input type="text" id="marca" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={tipo_reparacion} onChange={e => setTipoReparacion(e.target.value)} required />
                            </div>
                            <div className="col-span-3"></div>
                            <div>
                                <label for="monto" class="block mb-2 font-medium text-gray-700">Precio gasolina</label>
                                <input type="number" id="monto" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={precio_gasolina} onChange={e => setPrecioGasolina(e.target.value)} required />
                            </div>
                            <div>
                                <label for="cantidad" class="block mb-2 font-medium text-gray-700">Precio diesel</label>
                                <input type="number" id="cantidad" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={precio_diesel} onChange={e => setPrecioDiesel(e.target.value)} required />
                            </div>
                            <div>
                                <label for="cantidad" class="block mb-2 font-medium text-gray-700">Precio hibrido</label>
                                <input type="number" id="cantidad" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={precio_hibrido} onChange={e => setPrecioHibrido(e.target.value)} required />
                            </div>
                            <div>
                                <label for="cantidad" class="block mb-2 font-medium text-gray-700">Precio electrico</label>
                                <input type="number" id="cantidad" class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " value={precio_electrico } onChange={e => setPrecioElectrico(e.target.value)} required />
                            </div>
                            <div className="flex items-end justify-around">
                                <BotonNuevo onClick={manejarAñadirReparacion} />
                                <BotonRegistrar onClick={manejarCrearReparaciones} tipoAccion={"Terminar"}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Reparación
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Gasolina
                                    </th>
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Diesel
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Híbrido
                                    </th>
                                    <th scope="col" class="font-semibold px-6 py-4">
                                        Eléctrico
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reparaciones.map((reparacion, index) => (
                                        <tr key={index} class="bg-white font-light border-b hover:bg-gray-50">
                                            <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                                {reparacion.tipo_reparacion}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_gasolina}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_diesel}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_hibrido}
                                            </td>
                                            <td class="px-6 py-3">
                                                $ {reparacion.precio_electrico}
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