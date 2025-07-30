import React, { useEffect, useContext, useState } from 'react';
import ContentDiv from '../components/content-div.tsx';
import { IGroupedData } from '../types/grouped.tsx';
import { IProject } from '../types/project.tsx';
import { CrudContext } from '../components/crud-provider';
import '../styles/scrollable-projects.css';
import FilterOptionGroup, { Option } from '../components/filter-option-group.tsx';
import SearchBar from '../components/search-bar.tsx';
import FilterButton from '../components/filter-button.tsx';
import { ITechnology } from '../types/technology.tsx';
import { IUrlType } from '../types/url_type.tsx';
import '../styles/column-wrap.css';

type ProjectFilterProps = {
  setFilteredProjects: Function;
};

const ProjectFilter: React.FC<ProjectFilterProps> = ({setFilteredProjects}) => {
  const {endpoints} = useContext(CrudContext);

  const projects = endpoints["projects"].data as IProject[];
  const groupedProjects = endpoints["grouped_projects"].data as IGroupedData[];
  const technologies = endpoints["technologies"].data as ITechnology[];
  const technologyTypes = endpoints["technology_types"].data as ITechnology[];
  const urlTypes = endpoints["url_types"].data as IUrlType[];
  const [searchedProjects, setSearchedProjects] = useState<IProject[]>(projects);

  const tags = groupedProjects.map(project => ({
    _id: project._id,
    name: project._id,
  }));

  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<Option>>(new Set());
  const [selectedUrlTypes, setSelectedUrlTypes] = useState<Set<Option>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<Option>>(new Set());

  const getProjectTechnologies = (project: IProject) => new Set(project.technologies.map(technology => technology._id));
  const getProjectUrls = (project: IProject) => new Set(project.urls.map(url => url.type._id));
  const getProjectTags = (project: IProject) => new Set(project.tags);

  const filterProjects = (originalArray: IProject[], getItemField: Function, selectedItems: Set<Option>) => {
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

  const removeEndBorders = () => {
    const items = document.querySelectorAll('.has-end-border');
    const rowMap = new Map();

    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const key = Math.round(rect.top); // row position
      if (!rowMap.has(key)) {
        rowMap.set(key, []);
      }
      rowMap.get(key).push(el);
    });

    // Remove any prior markings
    items.forEach((el) => el.classList.remove('is-last-in-column'));

    // Mark last item in each column
    for (const group of rowMap.values()) {
      const last = group[group.length - 1];
      last.classList.add('is-last-in-column');
    }
  }
  
  useEffect(() => {
    removeEndBorders();
	window.addEventListener("resize", removeEndBorders);
    return () => window.removeEventListener("resize", removeEndBorders);
  }, [technologyTypes]);

  return (
    <div>
	  <ContentDiv className="m-5">
	    <h2 className="text-center">Search and Filter</h2>
		<div className="input-group justify-content-center pb-2">
		  <SearchBar originalArray={projects} setFilteredArray={setSearchedProjects}></SearchBar>
		  <FilterButton>
		    <h2>Technologies</h2>
			<div className="column-wrap gap-4" style={{width: "80vw"}}>
			{ technologyTypes.map((technologyType) => (
			  <div className="has-end-border">
		        <FilterOptionGroup header={technologyType.name} options={technologies.filter(technology => technology.type.name == technologyType.name)} selected={selectedTechnologies} setSelected={setSelectedTechnologies} HeaderTag="h3" width="auto"></FilterOptionGroup>
			  </div>
			  )
			)}
			</div>
		    <hr></hr>
            <FilterOptionGroup header="Url Type" options={urlTypes} selected={selectedUrlTypes} setSelected={setSelectedUrlTypes}></FilterOptionGroup>
		    <hr></hr>
            <FilterOptionGroup header="Tags" options={tags} selected={selectedTags} setSelected={setSelectedTags}></FilterOptionGroup>
		  </FilterButton>
		</div>
	  </ContentDiv>
    </div>
  );
}

export default ProjectFilter;

