import React from 'react';

export default function OpcionSideBar({ nombreOpcion, iconoOpcion, iconoDropdown, onClick, activo }) {
    return (
        <div className="mr-2 my-1">
            <button 
                onClick={onClick} 
                className={`flex gap-3 items-center w-full pl-8 py-3 font-semibold rounded-r-3xl 
                            ${activo ? 'text-cyan-600 bg-white' : 'text-white hover:bg-cyan-700'} `}>
                {iconoOpcion && <span>{iconoOpcion}</span>}
                {nombreOpcion}
                {iconoDropdown && <span>{iconoDropdown}</span>}
            </button>
        </div>
    );
}