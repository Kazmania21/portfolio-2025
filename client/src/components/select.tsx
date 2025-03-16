//import React from 'react';
import { useState, useEffect } from 'react';

interface SelectProps {
  optionsUrl: string;
  className?: string;
  inputName?: string;
  defaultText?: string;
  labelText?: string;
}

interface SelectOption {
  _id: string;
  name: string;
}

/*interface SelectOptionsState {
  options: SelectOption,
  setOptions: React.Dispatch<React.SetStateAction<UrlType[]>>;
}*/

const Select: React.FC<SelectProps> = ({optionsUrl, className="", inputName="", defaultText="Select Item", labelText=""}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

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
    <div className="form-group">
      <label htmlFor={inputName}>{labelText}</label>
      <select className={`form-select ${className}`} name={inputName}>
          <option selected>{defaultText}</option>
          { options.map((option) => (
            <option value={option._id}>{ option.name }</option>
          ))}
        </select>
    </div>
  );
}

export default Select;

