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
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input.tsx';
import FilterOptionGroup from '../components/filter-option-group.tsx';

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
  const [search, setSearch] = useState<string>("");

  const tags = groupedProjects.map(project => ({
    _id: project._id,
    name: project._id,
  }));

  const [selectedTechnologies, setSelectedTechnologies] = useState<IGroupedData[]>(new Set());
  const [selectedUrlTypes, setSelectedUrlTypes] = useState<IGroupedData[]>(new Set());
  const [selectedTags, setSelectedTags] = useState<IGroupedData[]>(new Set());

  useEffect(() => {
  	endpoints["grouped_projects"].read();
	endpoints["projects"].read();
	endpoints["technologies"].read();
  	endpoints["url_types"].read();
  }, [])

  useEffect(() => {
	console.log("filtering");
	console.log(selectedTechnologies);

    var searchedProjects = projects.filter(project => {
	  const stack = [project];

	  while (stack.length) {
		const val = stack.pop();

		if (val == null | typeof val !== 'object') {
		  if (String(val).toLowerCase().includes(search.toLowerCase())) return true;
		  continue;
		}

		stack.push(...(Array.isArray(val) ? val : Object.values(val)));
	  }
	})

    searchedProjects = searchedProjects.filter(project => {
	  const projectTechnologies = new Set(project.technologies.map(technology => technology._id));
	  for (const technology of selectedTechnologies) {
        if (!projectTechnologies.has(technology)) return false;
	  }
	  return true;
    });

	searchedProjects = searchedProjects.filter(project => {
	  const projectUrls = new Set(project.urls.map(url => url.type._id));
	  for (const url of selectedUrlTypes) {
        if (!projectUrls.has(url)) return false;
	  }
	  return true;
    }); 

	searchedProjects = searchedProjects.filter(project => {
	  const projectTags = new Set(project.tags);
	  for (const tag of selectedTags) {
        if (!projectTags.has(tag)) return false;
	  }
	  return true;
    }); 

	setFilteredProjects(searchedProjects);
  }, [projects, search, selectedTechnologies, selectedUrlTypes, selectedTags])

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
	  <ContentDiv className="m-5">
	    <h2 className="text-center">Search and Filter</h2>
		<div className="input-group justify-content-center pb-2">
		  <input placeholder="Search" className="form-floating form-control ms-5 me-2 border-secondary" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}></input>
		<div className="dropdown me-5">
      	  <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FontAwesomeIcon icon={faFilter} /> Filter
          </button>
          <div className="dropdown-menu p-3" style={{ minWidth: "200px" }} onClick={(e) => e.stopPropagation()}>
            <FilterOptionGroup header="Technologies" options={endpoints["technologies"].data} selected={selectedTechnologies} setSelected={setSelectedTechnologies}></FilterOptionGroup>
			<hr></hr>
            <FilterOptionGroup header="Url Type" options={endpoints["url_types"].data} selected={selectedUrlTypes} setSelected={setSelectedUrlTypes}></FilterOptionGroup>
			<hr></hr>
            <FilterOptionGroup header="Tags" options={tags} selected={selectedTags} setSelected={setSelectedTags}></FilterOptionGroup>
          </div>
        </div>
		</div>
	  </ContentDiv>
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

