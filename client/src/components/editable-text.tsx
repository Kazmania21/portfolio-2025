import { useState, useContext } from 'react';
import { AuthContext } from '../components/auth-provider';
import { ApiService } from '../services/api-service';

interface EditableTextProps {
  text?: string;
  className?: string;
  Tag?: React.ElementType;
  updateUrl?: string;
  fieldName?: string;
}

const EditableText: React.FC<EditableTextProps> = ({text="", className="", Tag="p", updateUrl="", fieldName="name"}) => {
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
          <input value={_text} autoFocus onChange={(e) => setText(e.target.value)} onBlur={handleBlur} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleBlur();
          }} className={`form-control invisible-box ${className}`}></input>
        ) : (
          <Tag onClick={() => setIsEditing(true)} className={className}>{_text}</Tag>
        )}
    </div>
  );
}

export default EditableText;

