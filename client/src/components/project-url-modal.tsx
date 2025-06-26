import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from '../components/select.tsx';
import Input from '../components/input.tsx';
import Modal from '../components/modal.tsx';
import { CrudContext } from './crud-provider.tsx';

interface ProjectUrlModalProps {
  projectId: string | Number;
}

const ProjectUrlModal: React.FC<ProjectUrlModalProps> = ({projectId}) => { 
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];
  const urlTypes = endpoints["url_types"];

  return (
    <Modal modalId={`urls-modal-${projectId}`} title="Add URL to Project" onSave={(data: FormData) => projects.patchAddOne(projectId, data)}>
	  <Select labelText="URL Type" defaultText="Select URL Type" defaultOptions={urlTypes.data} inputName="urls[type]"></Select>
	  <Input labelText="URL" placeholder="URL" inputName="urls[url]"></Input>
	  <Link to="/add-url-type">URL type not listed?</Link>
	</Modal>
  );
}

export default ProjectUrlModal;

