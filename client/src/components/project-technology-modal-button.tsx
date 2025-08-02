import { useContext } from 'react';
import { AuthContext } from '../components/auth-provider.tsx'

interface ProjectTechnologyModalButtonProps {
  projectId: Number | String;
}

const ProjectTechnologyModalButton: React.FC<ProjectTechnologyModalButtonProps> = ({projectId}) => { 
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      { isLoggedIn && (
          <div className="col-auto">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#technologies-modal-${projectId}`}>Add Technology</button>
          </div>
        )
      } 
    </>
  );
}

export default ProjectTechnologyModalButton;

