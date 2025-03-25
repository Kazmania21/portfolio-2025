import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'
import ProjectTechnologies from '../components/project-technologies.tsx'
import ProjectUrls from '../components/project-urls.tsx'
import { IProject } from '../types/project';

interface ProjectProps {
  project: IProject,
  className?: string;
}

const Project: React.FC<ProjectProps> = ({project, className=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className={className}>
      <ContentDiv className="m-5" childrenClass="ms-3 me-3">
        <div className="row">
            <div className="col">
              <EditableText text={project.name} Tag="h2" updateUrl={`/api/projects/${project._id}`} className="text-center m-0"></EditableText>
            </div>
            <DeleteButton deleteUrl={`/api/projects/${project._id}`} containerClassName="col-auto"></DeleteButton>
        </div>

        <img src={`${apiUrl}/${project.image_location}`} width="100%"></img>

        <div className="ms-2">
          <EditableText text={project.tagline} updateUrl={`/api/projects/${project._id}`} fieldName="tagline" className="mb-0"></EditableText>

		  <ProjectTechnologies projectId={project._id} technologies={project.technologies}></ProjectTechnologies>

		  <ProjectUrls projectId={project._id} urls={project.urls}></ProjectUrls>
        </div>
      </ContentDiv>
    </div>
  );
}

export default Project;

