import Modal from '../components/modal.tsx'
import TagsInput from '../components/tags-input.tsx'

interface ProjectTagModalProps {
  projectId: Number | String;
  tags: [string];
}

const ProjectTagModal: React.FC<ProjectTagModalProps> = ({projectId, tags}) => { 
  return (
     <Modal modalId={`tags-modal-${projectId}`} title="Add Tags to Project" formMethod="PUT" formUrl={`/api/projects/${projectId}`}>
      <TagsInput labelText="Tags" optionsUrl={`/api/projects?groupBy=tags`} defaultText="Add Tag" inputName="tags[]" defaultTags={tags}></TagsInput>
	 </Modal>
  );
}

export default ProjectTagModal;

