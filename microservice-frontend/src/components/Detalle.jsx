import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import registroService from "../services/registro.service";
import BotonRegistrar from "./BotonRegistrar";

export default function Detalle() {
    const { id_registro } = useParams();
    const [registro, setRegistro] = useState("");

    async function buscarInformacion() {
        try {
            const response = await registroService.obtenerRegistro(id_registro);
            setRegistro(response.data);
            console.log("Registro response: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarInformacion();
    }, [id_registro]);

    const navigate = useNavigate();

    const redirecToReparaciones = () => {
        navigate("/reparaciones");
    }

    return (
        <div className="flex h-4/5 mx-10 my-6">   
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <h1 className="text-2xl text-gray-900">Reparaciones</h1>
                        <h2 className="text-gray-500 uppercase">Detalle - Id Registro {registro.id_registro}</h2>
                    </div>
                    <BotonRegistrar onClick={redirecToReparaciones} tipoAccion={"Volver a reparaciones"}/>
                </div>
                <div className="mt-6 overflow-auto shadow-lg shadow-gray-200 rounded-xl">
                    <div>
                        <table className="text-left w-full">
                            <thead className="border-b bg-white">
                                <tr className="text-gray-700">
                                    <th scope="col" className="font-semibold px-6 py-4">
                                        Operación
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        Monto Reparaciones
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.monto_reparaciones}
                                    </td>
                                </tr>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        Recargos
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.monto_recargos}
                                    </td>
                                </tr>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        Descuentos
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.monto_descuentos}
                                    </td>
                                </tr>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        Monto total
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.monto_reparaciones + registro.monto_recargos - registro.monto_descuentos}
                                    </td>
                                </tr>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        IVA
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.monto_iva}
                                    </td>
                                </tr>
                                <tr class="bg-white font-light border-b hover:bg-gray-50">
                                    <td scope="row" class="px-6 py-4 font-medium text-gray-900">
                                        Costo total
                                    </td>
                                    <td class="px-6 py-3">
                                        $ {registro.costo_total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}