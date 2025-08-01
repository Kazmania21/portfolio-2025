import React, { useContext } from 'react';
import ContentDiv from '../components/content-div.tsx';
import EditableText from '../components/editable-text.tsx';
import DeleteButton from '../components/delete-button.tsx';
import ProjectTechnologies from '../components/project-technologies.tsx';
import ProjectUrls from '../components/project-urls.tsx';
import ProjectTags from '../components/project-tags.tsx';
import UpdateImageButton from '../components/update-image-button.tsx';
import { IProject } from '../types/project';
import { CrudContext } from '../components/crud-provider.tsx';
import '../styles/hover.css';

interface ProjectProps {
  project: IProject,
  className?: string;
}

const Project: React.FC<ProjectProps> = ({project, className=""}) => {
  //console.log(project);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];

  return (
    <div className={className}>
      <ContentDiv className="ms-3 me-3" childrenClass="ms-3 me-3">
        <div className="row">
            <div className="col">
              <EditableText text={project.name} Tag="h2" updateUrl={`/api/projects/${project._id}`} className="text-center m-0"></EditableText>
            </div>
	  		
			<DeleteButton onDelete={() => projects.deleteOne(project._id)} containerClassName="col-auto"></DeleteButton>
        </div>

        <div className="project-image position-relative">
          <img src={`${apiUrl}/${project.image_location}`} width="100%"></img>
		  <div className="project-button">
            <UpdateImageButton projectId={project._id} className="position-absolute top-0 end-0 m-2 p-1 px-2 bg-light rounded-1 border border-dark"></UpdateImageButton>
		  </div>
		</div>

        <div className="ms-2">
          <EditableText text={project.tagline} updateUrl={`/api/projects/${project._id}`} fieldName="tagline" className="mb-0"></EditableText>

		  <ProjectTechnologies projectId={project._id} technologies={project.technologies}></ProjectTechnologies>

		  <ProjectUrls projectId={project._id} urls={project.urls}></ProjectUrls>
		  <ProjectTags projectId={project._id} tags={project.tags}></ProjectTags>
        </div>

      </ContentDiv>
    </div>
  );
}

export default Project;

