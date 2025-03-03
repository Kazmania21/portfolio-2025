//import React from 'react';
import { useState } from 'react';

const Input: React.FC = ({className="", inputType="text", inputName="", placeholder="", labelText=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(updateUrl);

  return (
    <div class="form-group">
      <label for={inputName}>{labelText}</label>
      <input type={inputType} class={`form-control ${className}`} id={inputName} name={inputName} placeholder={placeholder} />
    </div>
  );
}

export default Input;

