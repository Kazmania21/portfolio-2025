//import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../components/auth-provider';

const EditableText: React.FC = ({text="", className="", Tag="p", updateUrl="", fieldName="name"}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [_text, setText] = useState(text);
  const {isLoggedIn} = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(updateUrl);

  const handleBlur = async () => {
    setIsEditing(false);
	var reqBody = {};
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
        {isEditing & isLoggedIn ? (
          <input value={_text} autoFocus onChange={(e) => setText(e.target.value)} onBlur={handleBlur} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleBlur();
          }} class={`form-control invisible-box ${className}`}></input>
        ) : (
          <Tag onClick={() => setIsEditing(true)} class={className}>{_text}</Tag>
        )}
    </div>
  );
}

export default EditableText;

