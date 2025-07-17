import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface FilterButtonProps {
  children: React.ReactNode; 
}

const FilterButton: React.FC<FilterButtonProps> = ({children}) => {
  return (
    <div className="dropdown me-5">
      <button
        className="btn btn-outline-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
      <FontAwesomeIcon icon={faFilter} /> Filter
      </button>
      <div className="dropdown-menu p-3" style={{ minWidth: "200px" }} onClick={(e) => e.stopPropagation()}>
	    {children} 
      </div>
    </div>
  );
}

export default FilterButton;

