import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'

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
          <p class="mb-0">{project.tagline}</p>
          <h3>Technologies Used</h3>
          {project.technologies.map((technology) => (
            <div>
              <span><b>{technology.type.name}:</b></span>
              <Link to={technology.url} class="text-center mb-0">
                <img src={`${apiUrl}/${technology.image_location}`} width="50px"></img>
                {technology.name}
              </Link>
            </div>
          ))}
          <h3>Project Links</h3>
          <div class="row justify-content-center">
            {project.urls.map((url) => (
              <p class="col col-auto">
                <Link to={url.url} class="btn btn-primary text-center mb-0">
                  <img src={`${apiUrl}/${url.type.image_location}`} width="20px"></img>
                  {url.type.name}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </ContentDiv>
    </div>
  );
}

export default Project;

