import React from 'react';
import './index.css'

const Button = ({children,type,className,onClick}) => {
  console.log(children)
  return (
    <button type={type} className={className} onClick={onClick}>
     {children}
    </button>
  );
}

export default Button;
