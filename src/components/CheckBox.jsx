import React, { useState, useEffect } from 'react'

function CheckBox({ imgKey, selected, handleChange }) {
    const [stateSelected, setStateSelected] = useState(selected)
    useEffect(() => { setStateSelected(selected) }, [selected]);

    return (
        <label htmlFor={imgKey} className={`absolute w-full h-full rounded-md duration-500 cursor-pointer ${stateSelected ? "selected" : "notSelected"}`}>
            <input id={imgKey} type="checkbox" checked={stateSelected} onChange={() => handleChange(imgKey)} className={`${!stateSelected && "hidden"} hover:inline cursor-pointer relative top-3 left-3`} />
        </label>
    )
}

export default CheckBox