interface InputProps {
  className?: string;
  labelText?: string;
  placeholder?: string;
  inputName?: string;
  inputType?: string;
  required?: boolean;
  minlength?: string | undefined;
  maxlength?: string | undefined;
}

const Input: React.FC<InputProps> = ({className="", inputType="text", inputName="", placeholder="", labelText="", required=false, minlength, maxlength}) => {
  return (
    <div className="form-group">
	  {labelText && (
	    <label htmlFor={inputName}>
	      {labelText}
	      {required && <span class="text-danger">*</span>}
	    </label>
	  )}
      <input type={inputType} className={`form-control ${className}`} id={inputName} name={inputName} placeholder={placeholder} required={required} minlength={minlength} maxlength={maxlength} />
    </div>
  );
}

export default Input;

