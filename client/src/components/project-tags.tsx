import ProjectTagModal from '../components/project-tag-modal.tsx'
import ProjectTagModalButton from '../components/project-tag-modal-button.tsx'


interface ProjectTagsProps {
  projectId: string | Number;
  tags: [string];
}

const ProjectTags: React.FC<ProjectTagsProps> = ({projectId, tags}) => { 
  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <h3>Tags</h3>
        </div>
        <ProjectTagModal projectId={projectId} tags={tags}></ProjectTagModal> 
        <ProjectTagModalButton projectId={projectId}></ProjectTagModalButton>
        { tags ? (
            <p>{tags.join(",")}</p>
          ) : (
            <p>No tags available at this time</p>   
          )
        }
      </div>
    </div>
  );
}

export default ProjectTags;

