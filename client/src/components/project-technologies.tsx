import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProjectTechnology from '../components/project-technology.tsx'
import ProjectTechnologyModal from '../components/project-technology-modal.tsx'
import ProjectTechnologyModalButton from '../components/project-technology-modal-button.tsx'
import ITechnology from '../types/technology.tsx'


interface ProjectTechnologiesProps {
  projectId: int;
  technologies: [ITechnology];
}

const ProjectTechnologies: React.FC<ProjectTechnologiesProps> = ({projectId, technologies}) => { 
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div>
      <div className="row">
	    <div className="col-auto">
          <h3>Technologies Used</h3>
	    </div>
	    <ProjectTechnologyModal projectId={projectId}></ProjectTechnologyModal> 
	    <ProjectTechnologyModalButton projectId={projectId}></ProjectTechnologyModalButton>
	  </div>
      {technologies.map((technology) => (
	    <ProjectTechnology projectId={projectId} technology={technology}></ProjectTechnology>
      ))}
	</div>
  );
}

export default ProjectTechnologies;

