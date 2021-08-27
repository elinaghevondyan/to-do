import React from 'react';

/**
 * @description Icon component
 */

export default function Icon ({ name, className = '' }) {

    return (
        <i className={`icon-${name} ${className}`} />
    );
}
