import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api-service.tsx';

interface FormProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
  method?: string;
  contentType?: string;
  navigate?: string;
  onSubmit?: Function;
  includeButton?: false;
}

const Form: React.FC<FormProps> = ({ children, url="", method="", contentType, navigate, onSubmit, includeButton=true }) => {
  const _navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([""]);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const jsonFormData = JSON.stringify(Object.fromEntries(formData));

    if (url == "" && onSubmit) {
      const data = await onSubmit(formData);
      console.log(data);
      if (data.errors) {
        setErrors(data.errors);
      }
      return;
    }

    var response = await ApiService({url: url, formMethod: method, contentType: contentType, reqBody: contentType ? jsonFormData : formData});

    if (!response) {
      return;
    }

    var data = await response.json();

    if (response.ok) {
      console.log("Server response: ", data)
      if (onSubmit) {
        onSubmit(data);
      }
      //sessionStorage.setItem('authToken', data.token); 
      if (navigate) {
        _navigate(navigate);
      }
    }

    if (data.errors) {
      setErrors(data.errors);
    }
  }

  return (
    <form className="p-2" method="POST" onSubmit={submitForm}>
      {(errors.length > 0) && (
        <div className="mb-3">
          { errors.map((error) => (
            <div className="m-0">
              <p className="text-danger mb-1">{error}</p>
            </div>
          ))}
        </div>
      )}
      {children}
      { includeButton && (
        <button type="submit" className="btn btn-primary d-block mx-auto mt-3">Submit</button>
      )}
    </form>
  );
}

export default Form;

