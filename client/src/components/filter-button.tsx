import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/auth-provider';
import { ApiService } from '../services/api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

interface FilterButtonProps {
  filters?: string[];
  itemFields?: Function[];
}

const FilterButton: React.FC<FilterButtonProps> = ({children, filters=[], itemFields=[]}) => {
  /*useEffect(() => {
    for (const [index, itemField] of itemFields.entries) {
	  let filteredItems = searchedProjects.filter(item => {
	    const projectTechnologies = itemField(item);
	    for (const technology of filters[index]) {
          if (!projectTechnologies.has(technology)) return false;
	    }
	    return true;
      });
	}
  }, [filters])*/

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

