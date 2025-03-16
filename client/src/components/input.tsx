interface InputProps {
  className?: string;
  labelText?: string;
  placeholder?: string;
  inputName?: string;
  inputType?: string;
}

const Input: React.FC<InputProps> = ({className="", inputType="text", inputName="", placeholder="", labelText=""}) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{labelText}</label>
      <input type={inputType} className={`form-control ${className}`} id={inputName} name={inputName} placeholder={placeholder} />
    </div>
  );
}

export default Input;

