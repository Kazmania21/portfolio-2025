import { useContext } from 'react';
import { Link } from 'react-router-dom';
import ITechnology from '../types/technology.tsx'
import DeleteButton from '../components/delete-button.tsx'

interface ProjectTechnologyProps {
  projectId: int;
  technology: ITechnology;
}

const CompactProjectTechnology: React.FC<ProjectTechnologyProps> = ({projectId, technology}) => { 
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="col-auto">
      <Link to={technology.url} className="text-center mb-0">
        <img src={`${apiUrl}/${technology.image_location}`} width="50px"></img>
      </Link>

      <DeleteButton deleteUrl={`/api/projects/${projectId}/remove`} reqBody={{"technologies": technology._id}} formMethod="PATCH" containerClassName="col-auto"></DeleteButton>
    </div>
  );
}

export default CompactProjectTechnology;

