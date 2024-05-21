import React, { useState } from "react";
import { BonoContext } from "./bonoContext";

export const BonoProvider = ({ children }) => {
    const [bonos, setBonos] = useState([]);
  
    const agregarBono = (nuevo_bono) => {
        setBonos([...bonos, nuevo_bono]);
    };
  
    const modificarBono = (marca, valor) => {
        const indice_bono = bonos.findIndex(bono => bono.marca == marca && bono.valor == valor);

        const nuevosBonos = [...bonos];
        nuevosBonos[indice_bono].cantidad -= 1;

        if(nuevosBonos[indice_bono].cantidad < 1) {
            nuevosBonos.splice(indice_bono, 1);
        }

        setBonos(nuevosBonos);
    };
  
    const eliminarBono = (indice_bono) => {
        const nuevos_bonos = [...bonos];
        nuevos_bonos.splice(indice_bono, 1);
        setBonos(nuevos_bonos);
    };
  
    return (
        <BonoContext.Provider value={{ bonos, agregarBono, modificarBono, eliminarBono }}>
            {children}
        </BonoContext.Provider>
    );
};