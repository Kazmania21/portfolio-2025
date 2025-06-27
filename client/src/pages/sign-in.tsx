import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'
import ApiService from '../services/api-service.tsx'
import { useTitle } from '../hooks/use-title.tsx';

const SignIn: React.FC = () => {
  useTitle("Sign In");

  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

	var response = await ApiService({url: "/api/sign_in", formMethod: "POST", contentType: "application/json", reqBody: JSON.stringify(Object.fromEntries(formData))});

	if (!response) {
	  return;
	}

	if (response.ok) {
	  var data = await response.json();
	  console.log("Server response: ", data)
	  sessionStorage.setItem('authToken', data.token); 
      navigate("/projects");
	}
  }

  return (
    <div>
	  <ContentDiv className="m-5">
        <h1 className="text-center m-0">Sign In</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form className="p-2" method="POST" action={`${apiUrl}/api/technologies`} onSubmit={submitForm}>
          <Input labelText="Username" placeholder="Username" inputName="username"></Input>
          <Input labelText="Password" placeholder="Password" inputName="password" inputType="password"></Input>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default SignIn;

