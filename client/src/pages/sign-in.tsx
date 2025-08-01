import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import ApiService from '../services/api-service.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const SignIn: React.FC = () => {
  useTitle("Sign In");

  const apiUrl = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([""]);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

	var response = await ApiService({url: "/api/sign_in", formMethod: "POST", contentType: "application/json", reqBody: JSON.stringify(Object.fromEntries(formData))});

	if (!response) {
	  return;
	}

	var data = await response.json();

	if (response.ok) {
	  console.log("Server response: ", data)
	  //sessionStorage.setItem('authToken', data.token); 
      navigate("/projects");
	}

    if (data.errors) {
      setErrors(data.errors);
	}
  }

  return (
    <div>
	  <ContentDiv className="m-5">
        <h1 className="text-center m-0">Sign In</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <form className="p-2" method="POST" onSubmit={submitForm}>
		  {(errors.length > 0) && (
			<div className="mb-3">
		      { errors.map((error, index) => (
		        <div className="m-0">
		          <p className="text-danger mb-1">{error}</p>
			    </div>
		      ))}
			</div>
		  )}
          <Input labelText="Username" placeholder="Username" inputName="username" required minlength="3" maxlength="20"></Input>
          <Input labelText="Password" placeholder="Password" inputName="password" inputType="password" required minlength="8" maxlength="128"></Input>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </ContentDiv>
    </div>
  );
}

export default SignIn;

