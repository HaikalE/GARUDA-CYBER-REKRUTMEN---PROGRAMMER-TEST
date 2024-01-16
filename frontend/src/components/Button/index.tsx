// Button.tsx

import React, { ReactNode, ButtonHTMLAttributes } from 'react';

// Define the props for the Button component
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // You can add more custom props as needed
}

// Create the Button component
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;
