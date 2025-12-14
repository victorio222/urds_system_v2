import React, { ButtonHTMLAttributes } from 'react'

// Define a type that includes the necessary props for styling and content,
// AND all standard HTML button attributes (like 'disabled', 'onClick', etc.)
export interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // You only need to explicitly redefine props here if you want to make 
    // them required or override their type, but usually extending 
    // ButtonHTMLAttributes is sufficient. 
    // We are ensuring 'children' is present for clarity:
    children: React.ReactNode;
}

// NOTE: Since your component is named 'Button' but imported as 'FormButton', 
// I will keep the component name as 'Button' for this file, but the props
// interface is named 'FormButtonProps' for clarity with your other file.

const Button: React.FC<FormButtonProps> = ({
    children,
    className,
    // Destructure props we handle explicitly, use '...' for the rest
    // We remove 'type' from the explicit destructuring since it is handled by ...props
    ...props 
}) => {
    return(
        // Pass all remaining props, including type, disabled, onClick, etc., here
        <button 
            className={className}
            {...props} 
        >
            {children}
        </button>
    )
}

export default Button;