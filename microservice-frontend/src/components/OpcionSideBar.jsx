import React from 'react';

export default function OpcionSideBar({ nombreOpcion, iconoOpcion, iconoDropdown, onClick, activo }) {
    return (
        <div className="mr-2 my-1">
            <button 
                onClick={onClick} 
                className={`flex items-center gap-3 w-full pl-8 py-3 rounded-r-3xl 
                            ${activo ? 'text-emerald-700 bg-gray-50' : 'text-gray-50 hover:bg-emerald-800'} `}>
                {iconoOpcion && <span>{iconoOpcion}</span>}
                {nombreOpcion}
                {iconoDropdown && <span>{iconoDropdown}</span>}
            </button>
        </div>
    );
}