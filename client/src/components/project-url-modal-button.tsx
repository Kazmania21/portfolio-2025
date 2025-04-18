import { useContext } from 'react';
import { AuthContext } from '../components/auth-provider.tsx'

interface ProjectUrlModalButtonProps {
  projectId: Number | String;
}

const ProjectUrlModalButton: React.FC<ProjectUrlModalButtonProps> = ({projectId}) => { 
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
	  { isLoggedIn && (
		  <div className="col-auto">
		    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#urls-modal-${projectId}`}>Add Link</button>
		  </div>
	    )
	  }
    </>
  );
}

export default ProjectUrlModalButton;

