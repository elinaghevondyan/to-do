import React from 'react';

/**
 * @description Button component
 */

export default function Button({ children, type = 'button',  className='', onClick, disabled = false }) {

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`btn ${className}`}
        >
            {children}
        </button>
    );
}
