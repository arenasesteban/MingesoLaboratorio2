import React from "react";

export default function BotonNuevo({ tipoElemento, onClick }) {
    return (
        <button onClick={onClick} class="flex items-center w-fit text-sm gap-2 px-3 py-2 text-white rounded-md bg-cyan-600 hover:bg-cyan-700 shadow-md font-semibold uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>  
            {tipoElemento}
        </button>
    )
}