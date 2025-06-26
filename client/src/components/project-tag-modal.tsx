import { useContext } from 'react';
import Modal from '../components/modal.tsx';
import TagsInput from '../components/tags-input.tsx';
import { CrudContext } from './crud-provider.tsx';

interface ProjectTagModalProps {
  projectId: string | Number;
  tags: [string];
}

const ProjectTagModal: React.FC<ProjectTagModalProps> = ({projectId, tags}) => { 
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];

  return (
     <Modal modalId={`tags-modal-${projectId}`} title="Add Tags to Project" onSave={(data: FormData) => projects.updateOne(projectId, data)}>
      <TagsInput labelText="Tags" optionsUrl={`/api/projects?groupBy=tags`} defaultText="Add Tag" inputName="tags[]" defaultTags={tags}></TagsInput>
	 </Modal>
  );
}

export default ProjectTagModal;

