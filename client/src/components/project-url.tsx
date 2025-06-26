import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IUrl } from '../types/url.tsx'
import DeleteButton from '../components/delete-button.tsx'
import { CrudContext } from '../components/crud-provider.tsx'

interface ProjectUrlProps {
  projectId: string | Number;
  url: IUrl;
}

const ProjectUrl: React.FC<ProjectUrlProps> = ({projectId, url}) => { 
  const apiUrl = import.meta.env.VITE_API_URL;
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];

  return (
    <div className="row">
	  <div className="col-auto">
        <Link to={url.url} className="btn btn-primary text-center mb-0">
          <img src={`${apiUrl}/${url.type.image_location}`} width="20px"></img>
          {url.type.name}
        </Link>
	  </div>
	  
	  <DeleteButton onDelete={() => projects.patchRemoveOne(projectId, "urls", url)} containerClassName="col-auto"></DeleteButton>
	</div> 
  );
}

export default ProjectUrl;

