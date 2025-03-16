import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Fieldset from '../components/fieldset.tsx'
import Select from '../components/select.tsx'

const AddProject: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    fetch(`${apiUrl}/api/projects`, {
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
        <h1 className="text-center m-0">Add Project</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form className="p-2" method="POST" action={`${apiUrl}/api/projects`} onSubmit={submitForm}>
          <Input labelText="Name" placeholder="Project Name" inputName="name"></Input>
          <Input labelText="Tagline" placeholder="Project Tagline" inputName="tagline"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file"></Input>
          <Fieldset legendText="Urls">
            <Select labelText="Url Type" optionsUrl={`${apiUrl}/api/project_url_types`} defaultText="Select Url Type" inputName="urls[0][type]"></Select>
            <Input labelText="Url" placeholder="Project Url" inputName="urls[0][url]"></Input>
          </Fieldset>
          <Fieldset legendText="Technologies">
            <Select labelText="Technology" optionsUrl={`${apiUrl}/api/technologies`} defaultText="Select Technology" inputName="technologies[0]"></Select>
          </Fieldset>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddProject;

