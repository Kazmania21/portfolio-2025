import React from 'react';
import ContentDiv from '../components/content-div.tsx';
import Input from '../components/input.tsx';
import Fieldset from '../components/fieldset.tsx';
import Select from '../components/select.tsx';
import TagsInput from '../components/tags-input.tsx';
import Form from '../components/form.tsx';
import { useTitle } from '../hooks/use-title.tsx';

const AddProject: React.FC = () => {
  useTitle("Add Project");

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 className="text-center m-0">Add Project</h1>
      </ContentDiv>
      <ContentDiv className="m-5">
        <Form className="p-2" url="/api/projects" method="POST" navigate="/projects">
          <Input labelText="Name" placeholder="Project Name" inputName="name" required minlength={5} maxlength={50}></Input>
          <Input labelText="Tagline" placeholder="Project Tagline" inputName="tagline" minlength={5} maxlength={50}></Input>
          <Input labelText="Image" placeholder="Project Image" inputName="imageFile" inputType="file" required maxSize={2}></Input>
          <Fieldset legendText="Urls">
            <Select labelText="Url Type" optionsUrl={`/api/project_url_types`} defaultText="Select Url Type" inputName="urls[0][type]" required></Select>
            <Input labelText="Url" placeholder="Project Url" inputName="urls[0][url]" required minlength={5} maxlength={255} inputType="url"></Input>
          </Fieldset>
          <Fieldset legendText="Technologies">
            <Select labelText="Technology" optionsUrl={`/api/technologies`} defaultText="Select Technology" inputName="technologies[0]" required></Select>
          </Fieldset>
          <TagsInput labelText="Tags" optionsUrl={`/api/projects?groupBy=tags`} defaultText="Add Tag" inputName="tags[]"></TagsInput>
        </Form>
      </ContentDiv>
    </div>
  );
}

export default AddProject;

