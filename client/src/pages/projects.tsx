import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Project from '../components/project.tsx'

const Projects: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(import.meta.env);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setProjects(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  })

  return (
    <div>
      <ContentDiv className="m-5">
        <h1 class="text-center m-0">Projects</h1>
      </ContentDiv>
      { projects.map((project, index) => (
        <Project project={project}></Project>
      ))}
    </div>
  );
}

export default Projects;

