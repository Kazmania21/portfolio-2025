import { useContext } from 'react';
import { AuthContext } from '../components/auth-provider.tsx'

interface ProjectTagModalButtonProps {
  projectId: Number | String;
}

const ProjectTagModalButton: React.FC<ProjectTagModalButtonProps> = ({projectId}) => { 
  const { isLoggedIn } = useContext(AuthContext);

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

