//import React from 'react';
import { useState } from 'react';

const Input: React.FC = ({children, className="border p-2", legendText=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(updateUrl);

  return (
    <fieldset class={className}>
      <legend class="w-auto text-left float-none"><h2>{ legendText }</h2></legend>
      {children}
    </fieldset>
  );
}

export default Input;

