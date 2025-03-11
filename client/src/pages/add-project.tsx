import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    //const formData = new FormData(form);

    const formData = new FormData();

    // Manually append all form fields
    new FormData(form).forEach((value, key) => {
      formData.append(key, value);
    });

	var formEntries = new URLSearchParams();

	for (const [key, value] of formData.entries()) {
	  //console.log(`${key}:`, value);
	  //if (key.includes("File")) {
        //formEntries[key] = Object.fromEntries(value);
	  //}
	  //else {
	    //formEntries[key] = value;
	  //}

      console.log(value);
	  //if (key.includes("File")) {
      //  value = value.toJSON();
	  //}
	  formEntries.append(key, value);
	  console.log(formEntries.get(key));
	}

    //form.submit();
    console.log(JSON.stringify(formEntries));
    fetch(`${apiUrl}/api/projects`, {
      method: "POST",
	  //headers: {
      //  "Content-Type": "application/x-www-form-urlencoded"
	  //},
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
        <h1 class="text-center m-0">Add Project</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form class="p-2" method="POST" action={`${apiUrl}/api/projects`} onSubmit={submitForm}>
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

