import { useState } from 'react';
import ProjectTechnology from '../components/project-technology.tsx'
import CompactProjectTechnology from '../components/compact-project-technology.tsx'
import ProjectTechnologyModal from '../components/project-technology-modal.tsx'
import ProjectTechnologyModalButton from '../components/project-technology-modal-button.tsx'
import { ITechnology } from '../types/technology.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ProjectTechnologiesProps {
  projectId: string | Number;
  technologies: [ITechnology];
}

const ProjectTechnologies: React.FC<ProjectTechnologiesProps> = ({projectId, technologies}) => { 
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-3 mb-3">
      <div className="row">
	    <div className="col-auto">
          <h3>Technologies Used</h3>
	    </div>
	    <ProjectTechnologyModal projectId={projectId}></ProjectTechnologyModal>
	    <ProjectTechnologyModalButton projectId={projectId}></ProjectTechnologyModalButton>
		<button className="btn btn-link col-auto pt-0" onClick={() => setIsExpanded(!isExpanded)}>
		  Expand
		  { isExpanded ? (
		  	  <FontAwesomeIcon icon={faChevronDown} rotation={180}></FontAwesomeIcon>
			) :
			(
		  	  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
			)
		  }
		</button>
	  </div>
	  <div className="row">
      {technologies.map((technology) => (
	    isExpanded ? (
	      <ProjectTechnology projectId={projectId} technology={technology}></ProjectTechnology>
		) : (
	      <CompactProjectTechnology projectId={projectId} technology={technology}></CompactProjectTechnology>
		)
      ))}
	  </div>
	</div>
  );
}

export default ProjectTechnologies;

