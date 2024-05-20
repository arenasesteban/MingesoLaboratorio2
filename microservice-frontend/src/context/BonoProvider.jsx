import React, { useState } from "react";
import { BonoContext } from "./bonoContext";

export const BonoProvider = ({ children }) => {
    const [bonos, setBonos] = useState([]);
  
    const agregarBono = (nuevoBono) => {
        setBonos([...bonos, nuevoBono]);
    };
  
    const modificarBono = (marca, valor) => {
        const indiceBono = bonos.findIndex(bono => bono.marca == marca && bono.valor == valor);

        const nuevosBonos = [...bonos];
        nuevosBonos[indiceBono].cantidad -= 1;

        if(nuevosBonos[indiceBono].cantidad < 1) {
            nuevosBonos.splice(indiceBono, 1);
        }

        setBonos(nuevosBonos);
    };
  
    const eliminarBono = (indiceBono) => {
        const nuevosBonos = [...bonos];
        nuevosBonos.splice(indiceBono, 1);
        setBonos(nuevosBonos);
    };
  
    return (
        <BonoContext.Provider value={{ bonos, agregarBono, modificarBono, eliminarBono }}>
            {children}
        </BonoContext.Provider>
    );
};