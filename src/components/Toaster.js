import React from 'react';
import Icon from "./Icon";
import Button from "./Button";

/**
 * @description Toaster component
 */

export default function Toaster ({ name, className = '', description, onClick }) {

    return (
        <div className={`toaster`}>
            <Button
                className="btn-icon sm"
                onClick={onClick}
            >
                <Icon
                    name="clear"
                    className="color-white fs-md"
                />
            </Button>
           <h4>{name}</h4>
           <p>{description}</p>
        </div>
    );
}
