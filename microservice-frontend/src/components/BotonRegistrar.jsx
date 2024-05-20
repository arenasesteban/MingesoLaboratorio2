import React from "react";

export default function BotonRegistrar({ onClick, tipoAccion }) {
    return (    
        <button onClick={onClick} class="flex items-center w-fit text-sm gap-2 px-3 py-2 text-white rounded-md bg-cyan-600 hover:bg-cyan-700 shadow-md font-semibold uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
            </svg>
            {tipoAccion}
        </button>
    )
}