//import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../components/auth-provider';

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

    try {
      const response = await fetch(`${updateUrl}`, {
        method: "PUT",
        headers: { 
		  "Content-Type": "application/json",
		  "authorization": `Bearer ${sessionStorage.getItem("authToken")}`
		},
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to update text");
      }
    } catch (error) {
      console.error("Error updating text:", error);
      // Optionally revert to the previous state if the update fails
    }
  };

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

