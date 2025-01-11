import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Project from '../components/project.tsx'

const Projects: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${apiUrl}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
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
      <div class="row">
          { projects.map((project, index) => (
            <Project project={project} className="col"></Project>
          ))}
      </div>
    </div>
  );
}

export default Projects;

