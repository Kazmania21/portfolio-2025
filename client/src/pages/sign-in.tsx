import React, { useState } from 'react';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import Form from '../components/form.tsx';
import ApiService from '../services/api-service.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const SignIn: React.FC = () => {
  useTitle("Sign In");

  const apiUrl = import.meta.env.VITE_API_URL; 
  const [errors, setErrors] = useState<string[]>([""]);

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Sign In</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <Form className="p-2" url="/api/sign_in" method="POST" contentType="application/json" navigate="/projects">
          <Input labelText="Username" placeholder="Username" inputName="username" required minlength="3" maxlength="20"></Input>
          <Input labelText="Password" placeholder="Password" inputName="password" inputType="password" required minlength="8" maxlength="128"></Input>
        </Form>
      </ContentDiv>
    </div>
  );
}

export default SignIn;

