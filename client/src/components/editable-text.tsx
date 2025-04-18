import { useState, useContext } from 'react';
import { AuthContext } from '../components/auth-provider';
import { ApiService } from '../services/api-service';

interface EditableTextProps {
  text?: string;
  className?: string;
  Tag?: React.ElementType;
  updateUrl?: string;
  fieldName?: string;
  InputTag?: React.ElementType;
}

const EditableText: React.FC<EditableTextProps> = ({text="", className="", Tag="p", updateUrl="", fieldName="name", InputTag="input"}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [_text, setText] = useState(text);
  const {isLoggedIn} = useContext(AuthContext);

  const handleBlur = async () => {
    setIsEditing(false);
	var reqBody: Record<string, string> = {};
	reqBody[fieldName] = _text;

	ApiService({url: updateUrl, formMethod: "PUT", contentType: "application/json", reqBody: JSON.stringify(reqBody)});
  }

  return (
    <div>
        {isEditing && isLoggedIn ? (
          <InputTag value={_text} autoFocus onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} onBlur={handleBlur} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !e.shiftKey) handleBlur();
          }} className={`form-control invisible-box ${className}`}></InputTag>
        ) : (
          <Tag onClick={() => setIsEditing(true)} className={className}>
		    {_text.split("\n").map((line) => ( 
			  <p className={className}>
		        {line}
			    <br />
			  </p>
			))}
		  </Tag>
        )}
    </div>
  );
}

export default EditableText;

