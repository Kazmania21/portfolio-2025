//import React from 'react';
import { useState, useEffect } from 'react';
import ApiService from '../services/api-service';

interface SelectProps {
  optionsUrl?: string;
  defaultOptions?: unknown[];
  className?: string;
  inputName?: string;
  defaultText?: string;
  labelText?: string;
}

interface SelectOption {
  _id: string;
  name: string;
}

const Select: React.FC<SelectProps> = ({optionsUrl=null, defaultOptions=null, className="", inputName="", defaultText="Select Item", labelText=""}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
	const fetchOptions = async () => {
	  var response = await ApiService({url: optionsUrl!});
	  if (!response) {return;}
	  setOptions((await response.json()).data);
	}

	if (optionsUrl) {
	  fetchOptions();
	}

	if (defaultOptions) {
	  setOptions(defaultOptions as SelectOption[]);
	}
	
	/*const interval = setInterval(() => {
	  fetchOptions();
	}, 5000)

	return () => {
	  clearInterval(interval);
	}*/
  }, [defaultOptions])

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

