import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Fieldset from '../components/fieldset.tsx'
import Select from '../components/select.tsx'

const AddProject: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projectUrlTypes, setProjectUrlTypes] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/project_url_types`)
      .then((response) => response.json())
      .then((data) => {
        setProjectUrlTypes(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 class="text-center m-0">Add Project</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form class="p-2" method="POST" action={`${apiUrl}/api/projects`}>
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddProject;

