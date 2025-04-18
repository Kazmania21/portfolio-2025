import ProjectUrl from '../components/project-url.tsx'
import ProjectUrlModal from '../components/project-url-modal.tsx'
import ProjectUrlModalButton from '../components/project-url-modal-button.tsx'
import { IUrl } from '../types/url.tsx'


interface ProjectUrlsProps {
  projectId: Number | String;
  urls: [IUrl];
}

const ProjectUrls: React.FC<ProjectUrlsProps> = ({projectId, urls}) => { 
  return (
    <div>
	  <ProjectUrlModal projectId={projectId}></ProjectUrlModal>
      <div className="row">
		<div className="col-auto">
          <h3>Project Links</h3>
	    </div>
	    <ProjectUrlModalButton projectId={projectId}></ProjectUrlModalButton>
      </div>
      <div className="row justify-content-center">
        {urls.map((url) => (
          <p className="col col-auto">
			<ProjectUrl projectId={projectId} url={url}></ProjectUrl>
          </p>
        ))}

	    { Number(urls.length) === 0 && (
            <p>No Links available at this time</p>
	      )
		}
      </div>
	</div>
  );
}

export default ProjectUrls;

