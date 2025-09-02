import React from 'react';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import Form from '../components/form.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const AddUrlType: React.FC = () => {
  useTitle("Add Url Type");

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Add URL Type</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <Form className="p-2" url="/api/project_url_types" method="POST" navigate="/projects">
          <Input labelText="Name" placeholder="Url Type Name" inputName="name" required minlength={5} maxlength={50}></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file" required maxSize={2}></Input>
        </Form>
      </ContentDiv>
    </div>
  );
}

export default AddUrlType;

