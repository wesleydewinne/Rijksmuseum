import React from 'react';
import './BasicButton.css';

function BasicButton({
                         children,
                         onClick,
                         disabled = false,
                         loading = false,
                         type = 'button',
                         variant = 'default',
                         className = '',
                         icon = null,
                         iconPosition = 'left',
                     }) {
    const baseStyles = 'basic-button';

    const variants = {
        default: 'btn-default',
        primary: 'btn-primary',
        danger: 'btn-danger',
    };

    const disabledClass = disabled || loading ? 'btn-disabled' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${disabledClass} ${className}`}
        >
            {loading ? (
                <span className="btn-spinner">Bezig...</span>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
                    {children}
                    {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
                </>
            )}
        </button>
    );
}

export default BasicButton;

