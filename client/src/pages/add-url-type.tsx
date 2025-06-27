import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import ApiService from '../services/api-service.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const AddUrlType: React.FC = () => {
  useTitle("Add Url Type");

  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form); 

	var response = await ApiService({url: "/api/project_url_types", formMethod: "POST", reqBody: formData});

	if (!response) {
	  return;
	}

	if (response.ok) {
	  console.log("Server response: ", await response.json());
	  navigate("/projects");
	}
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

