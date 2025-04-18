import { Link } from 'react-router-dom';
import Select from '../components/select.tsx'
import Input from '../components/input.tsx'
import Modal from '../components/modal.tsx'

interface ProjectUrlModalProps {
  projectId: Number | String;
}

const ProjectUrlModal: React.FC<ProjectUrlModalProps> = ({projectId}) => { 
  return (
    <Modal modalId={`urls-modal-${projectId}`} title="Add URL to Project" formMethod="PATCH" formUrl={`/api/projects/${projectId}/add`} >
	  <Select labelText="URL Type" defaultText="Select URL Type" optionsUrl={`/api/project_url_types`} inputName="urls[type]"></Select>
	  <Input labelText="URL" placeholder="URL" inputName="urls[url]"></Input>
	  <Link to="/add-url-type">URL type not listed?</Link>
	</Modal>
  );
}

export default ProjectUrlModal;

