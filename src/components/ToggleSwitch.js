import React from 'react';

/**
 * @description Toggle switch component
 */

export default function ToggleSwitch({name, type, checked, onChange, labelText}) {

    return(
        <label className="toggle-switch">
            <input
                    name={name}
                   type={type}
                   checked={checked}
                   onChange={onChange}
            />
            <span className="toggle-slider"/>
            <span className="toggle-label">{labelText}</span>
        </label>
    );
}

