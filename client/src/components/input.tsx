import { useState, useRef } from 'react';

interface InputProps {
  className?: string;
  labelText?: string;
  placeholder?: string;
  inputName?: string;
  inputType?: string;
  required?: boolean;
  minlength?: number | undefined;
  maxlength?: number | undefined;
  maxSize?: number | undefined;
}

const Input: React.FC<InputProps> = ({className="", inputType="text", inputName="", placeholder="", labelText="", required=false, minlength, maxlength, maxSize}) => {
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !maxSize) {
      return;
    }

    const file = files[0];
    
    setError('');
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB.`);
      inputRef.current!.value = "";
    }
  }

  return (
    <div className="form-group">
      {labelText && (
        <label htmlFor={inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <input type={inputType} className={`form-control ${className}`} id={inputName} name={inputName} placeholder={placeholder} required={required} minLength={minlength} maxLength={maxlength} onChange={handleFileChange} ref={inputRef} />
      <span className="text-danger">{error}</span>
    </div>
  );
}

export default Input;

