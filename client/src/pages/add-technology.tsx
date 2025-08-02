import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import Select from '../components/select.tsx';
import Modal from '../components/modal.tsx';
import Form from '../components/form.tsx';
import ApiService from '../services/api-service.tsx';
import { useCrud } from '../hooks/use-crud.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const AddTechnology: React.FC = () => {
  useTitle("Add Technology");

  const technologyTypes = useCrud("/api/technology_types");
  console.log(technologyTypes);

  useEffect(() => {
	technologyTypes.read();
  }, [])

  return (
    <div>
	  <Modal modalId="addTechnologyTypeModal" title="Add Technology Type" onSave={(data: FormData) => technologyTypes.create(data)}>
		<Input labelText="Technology Type" placeholder="Technology Type" inputName="name" required minlength="5" maxlength="255"></Input>
	  </Modal>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Add Technology</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <Form className="p-2" url="/api/technologies" method="POST" navigate="/projects">
          <Input labelText="Name" placeholder="Technology Name" inputName="name" required minlength="5" maxlength="50"></Input>
          <Input labelText="URL" placeholder="Technology URL" inputName="url" required minlength="5" maxlength="255" type="url"></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file" required maxSize="2"></Input>
          <Select labelText="Technology Type" defaultOptions={technologyTypes.data} defaultText="Select Technology Type" inputName="type" required></Select>
		  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#addTechnologyTypeModal`}>Add Technology Type</button>
        </Form>
      </ContentDiv>
    </div>
  );
}

export default AddTechnology;

