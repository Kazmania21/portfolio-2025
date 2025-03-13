import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'
import Modal from '../components/modal.tsx'
import Select from '../components/select.tsx'
import Input from '../components/input.tsx'

const Project: React.FC = ({project, className=""}) => {
  //console.log(project);
  //console.log(project.urls);
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div class={className}>
      <ContentDiv className="m-5" childrenClass="ms-3 me-3">
        <div class="row">
            <div class="col">
            <EditableText text={project.name} Tag="h2" updateUrl={`${apiUrl}/api/projects/${project._id}`} className="text-center m-0"></EditableText>
            </div>
            <div class="col-auto">
            <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}`}></DeleteButton>
            </div>
        </div>
        <img src={`${apiUrl}/${project.image_location}`} width="100%"></img>
        <div class="ms-2">
          <EditableText text={project.tagline} updateUrl={`${apiUrl}/api/projects/${project._id}`} fieldName="tagline" class="mb-0"></EditableText>
		  <div class="row">
		    <Modal modalId={`technologies-modal-${project._id}`} title="Add Technology to Project" formMethod="PATCH" formUrl={`${apiUrl}/api/projects/${project._id}/add`} >
			  <Select labelText="Technology" defaultText="Select Technology" optionsUrl={`${apiUrl}/api/technologies`} inputName="technologies"></Select>
			  <Link to="/add-technology">Technology not listed?</Link>
			</Modal>
		  	<div class="col-auto">
              <h3>Technologies Used</h3>
			</div>
			<div class="col-auto">
		      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#technologies-modal-${project._id}`}>Add Technology</button>
			</div>
		  </div>
          {project.technologies.map((technology) => (
            <div class="row">
			  <div class="col-auto">
                <span><b>{technology.type.name}:</b></span>
                <Link to={technology.url} class="text-center mb-0">
                  <img src={`${apiUrl}/${technology.image_location}`} width="50px"></img>
                  {technology.name}
                </Link>
			  </div>
			  <div class="col-auto">
                <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}/remove`}  reqBody={{"technologies": technology._id}} formMethod="PATCH"></DeleteButton>
			  </div>
            </div>
          ))} 
		  <Modal modalId={`urls-modal-${project._id}`} title="Add URL to Project" formMethod="PATCH" formUrl={`${apiUrl}/api/projects/${project._id}/add`} >
			  <Select labelText="URL Type" defaultText="Select URL Type" optionsUrl={`${apiUrl}/api/project_url_types`} inputName="urls[type]"></Select>
			  <Input labelText="URL" placeholderText="URL" inputName="urls[url]"></Input>
			  <Link to="/add-url-type">URL type not listed?</Link>
			</Modal>
		  <div class="row">
		    <div class="col-auto">
              <h3>Project Links</h3>
			</div>
			<div class="col-auto">
		      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#urls-modal-${project._id}`}>Add Link</button>
		    </div>
		  </div>
          <div class="row justify-content-center">
            {project.urls.map((url) => (
              <p class="col col-auto">
			  	<div class="row">
				  <div class="col-auto">
                    <Link to={url.url} class="btn btn-primary text-center mb-0">
                      <img src={`${apiUrl}/${url.type.image_location}`} width="20px"></img>
                      {url.type.name}
                    </Link>
				  </div>
				
				  <div class="col-auto">
                    <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}/remove`}  reqBody={{"urls": url}} formMethod="PATCH"></DeleteButton>
				  </div>
				</div>
              </p>
            ))}
          </div>
        </div>
      </ContentDiv>
    </div>
  );
}

export default Project;

