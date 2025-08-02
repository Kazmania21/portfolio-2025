import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select.tsx';
import Modal from '../components/modal.tsx';
import { CrudContext } from '../components/crud-provider.tsx';

interface ProjectTechnologyModalProps {
  projectId: string | Number;
}

const ProjectTechnologyModal: React.FC<ProjectTechnologyModalProps> = ({projectId}) => { 
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];
  const technologies = endpoints["technologies"];

  return (
     <Modal modalId={`technologies-modal-${projectId}`} title="Add Technology to Project" onSave={(data: FormData) => {return projects.patchAddOne(projectId, data)}}>
       <Select labelText="Technology" defaultText="Select Technology" defaultOptions={technologies.data} inputName="technologies" required></Select>
       <Link to="/add-technology">Technology not listed?</Link>
     </Modal>
  );
}

export default ProjectTechnologyModal;

