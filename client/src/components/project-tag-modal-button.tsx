import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select.tsx'
import Modal from '../components/modal.tsx'
import { AuthContext } from '../components/auth-provider.tsx'

interface ProjectTagModalButtonProps {
  projectId: int;
}

const ProjectTagModalButton: React.FC<ProjectTagModalButtonProps> = ({projectId}) => { 
  const { isLoggedIn } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      { isLoggedIn && (
		  <div className="col-auto">
		    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#tags-modal-${projectId}`}>Update Tags</button>
		  </div>
		)
	  } 
    </>
  );
}

export default ProjectTagModalButton;

