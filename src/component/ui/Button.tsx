import React from 'react'

interface FormButtonProps {
    type: 'submit' | 'button' | 'reset',
    className?: string,
    children: React.ReactNode;
}

const Button: React.FC<FormButtonProps> = ({
    type,
    className,
    children
}) => {
    return(
        <button 
            type={type}
            className={className}
        >
            {children}
        </button>
    )
}

export default Button;