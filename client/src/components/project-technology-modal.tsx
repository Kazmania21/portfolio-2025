import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select.tsx'
import Modal from '../components/modal.tsx'

interface ProjectTechnologyModalProps {
  projectId: int;
}

const ProjectTechnologyModal: React.FC<ProjectTechnologyModalProps> = ({projectId}) => { 
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
     <Modal modalId={`technologies-modal-${projectId}`} title="Add Technology to Project" formMethod="PATCH" formUrl={`/api/projects/${projectId}/add`} >
	   <Select labelText="Technology" defaultText="Select Technology" optionsUrl={`/api/technologies`} inputName="technologies"></Select>
	   <Link to="/add-technology">Technology not listed?</Link>
	 </Modal>
  );
}

export default ProjectTechnologyModal;

