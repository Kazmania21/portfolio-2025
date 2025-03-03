//import React from 'react';
import { useState, useEffect } from 'react';

const Select: React.FC = ({optionsUrl, className="", inputName="", defaultText="Select Item", labelText=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(optionsUrl);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetch(`${optionsUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  return (
    <div class="form-group">
      <label for={inputName}>{labelText}</label>
      <select class={`form-select ${className}`} name={inputName}>
          <option selected>{defaultText}</option>
          { options.map((option, index) => (
            <option value={option._id}>{ option.name }</option>
          ))}
        </select>
    </div>
  );
}

export default Select;

