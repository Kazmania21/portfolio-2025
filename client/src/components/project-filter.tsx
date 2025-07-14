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

const ProjectFilter: React.FC = ({filteredProjects, setFilteredProjects}) => {
  const {endpoints} = useContext(CrudContext);

  const projects = endpoints["projects"].data as IGroupedData[];
  const groupedProjects = endpoints["grouped_projects"].data as IGroupedData[];
  const [searchedProjects, setSearchedProjects] = useState<IGroupedData[]>(projects);

  const tags = groupedProjects.map(project => ({
    _id: project._id,
    name: project._id,
  }));

  const [selectedTechnologies, setSelectedTechnologies] = useState<IGroupedData[]>(new Set());
  const [selectedUrlTypes, setSelectedUrlTypes] = useState<IGroupedData[]>(new Set());
  const [selectedTags, setSelectedTags] = useState<IGroupedData[]>(new Set());

  const getProjectTechnologies = (project) => new Set(project.technologies.map(technology => technology._id));
  const getProjectUrls = (project) => new Set(project.urls.map(url => url.type._id));
  const getProjectTags = (project) => new Set(project.tags);

  const filterProjects = (originalArray: string[], getItemField: Function, selectedItems: string[]) => {
	let filteredProjects = originalArray.filter(project => {
	  const projectTechnologies = getItemField(project);
	  for (const item of selectedItems) {
        if (!projectTechnologies.has(item)) return false;
	  }
	  return true;
    });
	console.log("Filtering Projects");
	console.log(filteredProjects);
	console.log(originalArray);
	return filteredProjects;
  }

  useEffect(() => {
	console.log("filtering");
	console.log(selectedTechnologies);

	console.log(searchedProjects);

	let filtered = filterProjects(searchedProjects, getProjectTechnologies, selectedTechnologies);
	filtered = filterProjects(filtered, getProjectUrls, selectedUrlTypes);
	filtered = filterProjects(filtered, getProjectTags, selectedTags);
	setFilteredProjects(filtered);

  }, [projects, searchedProjects, selectedTechnologies, selectedUrlTypes, selectedTags])

  return (
    <div>
	  <ContentDiv className="m-5">
	    <h2 className="text-center">Search and Filter</h2>
		<div className="input-group justify-content-center pb-2">
		  <SearchBar originalArray={projects} setFilteredArray={setSearchedProjects}></SearchBar>
		  <FilterButton>
		    <FilterOptionGroup header="Technologies" options={endpoints["technologies"].data} selected={selectedTechnologies} setSelected={setSelectedTechnologies} getItemField={getProjectTechnologies} originalArray={searchedProjects} setFilteredArray={setFilteredProjects}></FilterOptionGroup>
		    <hr></hr>
            <FilterOptionGroup header="Url Type" options={endpoints["url_types"].data} selected={selectedUrlTypes} setSelected={setSelectedUrlTypes} getItemField={getProjectUrls} originalArray={searchedProjects} setFilteredArray={setFilteredProjects}></FilterOptionGroup>
		    <hr></hr>
            <FilterOptionGroup header="Tags" options={tags} selected={selectedTags} setSelected={setSelectedTags} getItemField={getProjectTags} originalArray={searchedProjects} setFilteredArray={setFilteredProjects}></FilterOptionGroup>
		  </FilterButton>
		</div>
	  </ContentDiv>
    </div>
  );
}

export default ProjectFilter;

