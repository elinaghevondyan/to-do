import React from 'react';

/**
 * @description Input Field component
 */

export default function InputField({
                                       labelText,
                                       type = 'text',
                                       placeholder,
                                       className='',
                                       name,
                                       value,
                                       touched,
                                       errorMessage,
                                       handleClick,
                                       onChange,
                                       disabled,
                                   }) {

    return (
        <div className={`text-field ${className} ${errorMessage ? 'error' : ''}`}>
            <label>{labelText}</label>
            <input
                name={name}
                type={type}
                onChange={onChange}
                disabled={disabled}
                value={value}
                onClick={handleClick}
                placeholder={placeholder}
            />
            { errorMessage && <p className='error-msg'>{errorMessage}</p> }
        </div>
    );
}
