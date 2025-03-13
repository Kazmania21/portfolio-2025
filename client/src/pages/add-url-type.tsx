import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Fieldset from '../components/fieldset.tsx'
import Select from '../components/select.tsx'

const AddUrlType: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(`${apiUrl}/api/project_url_types`, {
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
        <h1 class="text-center m-0">Add URL Type</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form class="p-2" method="POST" action={`${apiUrl}/api/technologies`} onSubmit={submitForm}>
          <Input labelText="Name" placeholder="Technology Name" inputName="name"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file"></Input>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddUrlType;

