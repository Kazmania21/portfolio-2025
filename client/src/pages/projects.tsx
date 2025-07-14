import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import Project from '../components/project.tsx';
import { IGroupedData } from '../types/grouped.tsx';
import { IProject } from '../types/project.tsx';
import { AuthContext } from '../components/auth-provider';
import { CrudContext, CrudProvider } from '../components/crud-provider';
import { useCrud } from '../hooks/use-crud.tsx';
import '../styles/scrollable-projects.css';
import { useTitle } from '../hooks/use-title.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input.tsx';
import FilterOptionGroup from '../components/filter-option-group.tsx';
import SearchBar from '../components/search-bar.tsx';
import FilterButton from '../components/filter-button.tsx';
import ProjectFilter from '../components/project-filter.tsx';

const Projects: React.FC = () => {
  return (
	<CrudProvider>
	  <ProjectContent></ProjectContent>
	</CrudProvider>
  )
}

const ProjectContent: React.FC = () => {
  useTitle("Projects");
  const {isLoggedIn} = useContext(AuthContext);
  const {endpoints} = useContext(CrudContext);

  //endpoints["projects"] = useCrud("/api/projects", {groupBy: "tags", sortBy: "tags_group,name"});
  endpoints["grouped_projects"] = useCrud("/api/projects", {groupBy: "tags", sortBy: "tags_group,name"});
  endpoints["projects"] = useCrud("/api/projects", {sortBy: "name"});
  endpoints["technologies"] = useCrud("/api/technologies", {sortBy: "name"});
  endpoints["url_types"] = useCrud("/api/project_url_types", {sortBy: "name"});

  const projects = endpoints["projects"].data as IGroupedData[];
  const groupedProjects = endpoints["grouped_projects"].data as IGroupedData[];
  const [filteredProjects, setFilteredProjects] = useState<IGroupedData[]>(projects);

  useEffect(() => {
  	endpoints["grouped_projects"].read();
	endpoints["projects"].read();
	endpoints["technologies"].read();
  	endpoints["url_types"].read();
  }, [])

  return (
    <div>
      <ContentDiv className="m-5">
		{ isLoggedIn ? (
            <div className="row justify-content-end">
              <div className="col-4">
                <h1 className="text-center m-0">Projects</h1>
              </div>
              <div className="col-4">
                <Link className="btn btn-primary text-center" to="/add-project">Add Project</Link>
              </div>
            </div>
		  ) : ( 
			<div className="row justify-content-center">
              <div className="col-4">
                <h1 className="text-center m-0">Projects</h1>
              </div>
            </div>
		  )
	    }
      </ContentDiv>
	  <ProjectFilter filteredProjects={filteredProjects} setFilteredProjects={setFilteredProjects}></ProjectFilter>
      {/*<div>
          { projects.map((projects) => (
		  	  <div>
			    <ContentDiv className="m-5">
				  <h2 className="text-center m-0">{projects._id}</h2>
			    </ContentDiv>
				<div className="d-flex overflow-auto flex-nowrap m-0">
		          {projects.data.map((project: IProject) => (
                    <Project project={project} className="scroll-item"></Project>
                  ))}
				</div>
			  </div>
		    )
		  )}
      </div>-->*/}
	  <div className="d-flex flex-wrap m-0 justify-content-center">
          { filteredProjects.map((project: IProject) => (
              <Project project={project} className="scroll-item m-2"></Project>
		    )
		  )}
      </div>
    </div>
  );
}

export default Projects;

