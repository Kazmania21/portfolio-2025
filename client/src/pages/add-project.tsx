import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Fieldset from '../components/fieldset.tsx'
import Select from '../components/select.tsx'
import ApiService from '../services/api-service.tsx'
import TagsInput from '../components/tags-input.tsx'

const AddProject: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    var response = await ApiService({url: "/api/projects", formMethod: "POST", reqBody: formData});

	if (!response) {
	  return;
	}

	if (response.ok) {
		console.log("Server Response: ", await response.json());
		navigate("/projects");
	}
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
            <Select labelText="Url Type" optionsUrl={`/api/project_url_types`} defaultText="Select Url Type" inputName="urls[0][type]"></Select>
            <Input labelText="Url" placeholder="Project Url" inputName="urls[0][url]"></Input>
          </Fieldset>
          <Fieldset legendText="Technologies">
            <Select labelText="Technology" optionsUrl={`/api/technologies`} defaultText="Select Technology" inputName="technologies[0]"></Select>
          </Fieldset>
          <TagsInput labelText="Tags" optionsUrl={`/api/projects?groupBy=tags`} defaultText="Add Tag" inputName="tags[]"></TagsInput>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddProject;

