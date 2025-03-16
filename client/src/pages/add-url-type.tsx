import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'

const AddUrlType: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    fetch(`${apiUrl}/api/project_url_types`, {
      method: "POST",
	  headers: {
        "authorization": `Bearer ${sessionStorage.getItem("authToken")}`
	  },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
          console.log("Server response:", data)
          navigate("/projects")
        })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Add URL Type</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form className="p-2" method="POST" action={`${apiUrl}/api/technologies`} onSubmit={submitForm}>
          <Input labelText="Name" placeholder="Technology Name" inputName="name"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file"></Input>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddUrlType;

