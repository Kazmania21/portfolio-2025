import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Input from '../components/input.tsx'

const SignIn: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    fetch(`${apiUrl}/api/sign_in`, {
      method: "POST",
	  headers: {
		"Content-Type": "application/json"
	  },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then((response) => response.json())
      .then((data) => {
          console.log("Server response:", data)
		  sessionStorage.setItem('authToken', data.token); 
          navigate("/projects")
        })
      .catch((error) => console.error("Error:", error));
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

