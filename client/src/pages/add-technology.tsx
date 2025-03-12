import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Fieldset from '../components/fieldset.tsx'
import Select from '../components/select.tsx'

const AddTechnology: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${apiUrl}/api/technologies`, {
      method: "POST",
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
        <h1 class="text-center m-0">Add Technology</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form class="p-2" method="POST" action={`${apiUrl}/api/technologies`} onSubmit={submitForm}>
          <Input labelText="Name" placeholder="Technology Name" inputName="name"></Input>
          <Input labelText="URL" placeholder="Technology URL" inputName="url"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file"></Input>
          <Select labelText="Url Type" optionsUrl={`${apiUrl}/api/technology_types`} defaultText="Select Technology Type" inputName="type"></Select>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddTechnology;

