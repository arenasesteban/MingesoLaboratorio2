import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar'
import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Vehiculos from './components/Vehiculos';
import Reparaciones from './components/Reparaciones';
import ReporteComparativa from './components/ReporteComparativa';
import ReporteResumen from './components/ReporteResumen';
import Bonos from './components/Bonos';
import VehiculosFormulario from './components/VehiculosFormulario';
import ReparacionesFormulario from './components/ReparacionesFormulario';
import ListaReparaciones from './components/ListaReparaciones';
import ReparacionesEditar from './components/ReparacionesEditar';
import BonosFormulario from './components/BonosFormulario';
import Detalle from './components/Detalle';
import { BonoProvider } from './context/BonoProvider';

export default function App() {
    return (
        <BrowserRouter>
            <div className="grid grid-cols-10 h-screen bg-emerald-700">
                <div className="col-span-2">
                    <SideBar />
                </div>
                <div className="col-span-8 h-screen bg-gray-50 border-8 border-emerald-700 rounded-3xl">
                    <NavBar />
                    <BonoProvider>
                        <Routes>
                            <Route path="/" element={<Inicio />}></Route>
                            <Route path="/vehiculos" element={<Vehiculos />}></Route>
                            <Route path="/vehiculos/registro" element={<VehiculosFormulario />}></Route>
                            <Route path="/reparaciones" element={<Reparaciones />}></Route>
                            <Route path="/reparaciones/registrar" element={<ReparacionesFormulario />}></Route>
                            <Route path="/reparaciones/lista-reparaciones" element={<ListaReparaciones />}></Route>
                            <Route path="/reparaciones/editar/:id_registro" element={<ReparacionesEditar />}></Route>
                            <Route path="/reparaciones/detalle/:id_registro" element={<Detalle />}></Route>
                            <Route path="/reporte/comparativa" element={<ReporteComparativa />}></Route>
                            <Route path="/reporte/resumen" element={<ReporteResumen />}></Route>
                            <Route path="/bonos" element={<Bonos />}></Route>
                            <Route path="/bonos/bonos-formulario" element={<BonosFormulario />}></Route>
                        </Routes>
                    </BonoProvider>
                </div>
            </div>
        </BrowserRouter>
    )
}