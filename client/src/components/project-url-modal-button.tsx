import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select.tsx'
import Modal from '../components/modal.tsx'
import { AuthContext } from '../components/auth-provider.tsx'

interface ProjectUrlModalButtonProps {
  projectId: int;
}

const ProjectUrlModalButton: React.FC<ProjectUrlModalButtonProps> = ({projectId}) => { 
  const { isLoggedIn } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
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

