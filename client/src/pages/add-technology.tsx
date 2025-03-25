import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import Select from '../components/select.tsx'
import Modal from '../components/modal.tsx'
import ApiService from '../services/api-service.tsx'

const AddTechnology: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form); 

	var response = await ApiService({url: "/api/technologies", formMethod: "POST", reqBody: formData});
	if (response.ok) {
		console.log("Server Response: ", await response.json());
		navigate("/projects");
	}
  }

  return (
    <div>
	  <Modal modalId="addTechnologyTypeModal" title="Add Technology Type" formMethod="POST" formUrl={`/api/technology_types`}>
		<Input labelText="TechnologyType" placeholder="Technology Type" inputName="name"></Input>
	  </Modal>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Add Technology</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form className="p-2" method="POST" action={`${apiUrl}/api/technologies`} onSubmit={submitForm}>
          <Input labelText="Name" placeholder="Technology Name" inputName="name"></Input>
          <Input labelText="URL" placeholder="Technology URL" inputName="url"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file"></Input>
          <Select labelText="Url Type" optionsUrl={`/api/technology_types`} defaultText="Select Technology Type" inputName="type"></Select>
		  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#addTechnologyTypeModal`}>Add Technology Type</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default AddTechnology;

