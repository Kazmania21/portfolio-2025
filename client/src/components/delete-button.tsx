//import React from 'react';
import { useState } from 'react';

const EditableText: React.FC = ({className="", deleteUrl=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(updateUrl);

  const deleteItem = async () => {
    try {
      const response = await fetch(`${deleteUrl}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to delete text");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Optionally revert to the previous state if the delete fails
    }
  };

  return (
    <div>
        <i class="fa fa-solid fa-trash text-danger" onClick={deleteItem}></i>
    </div>
  );
}

export default EditableText;

