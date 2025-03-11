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
        <div class="row justify-content-end">
          <div class="col-4">
            <h1 class="text-center m-0">Projects</h1>
          </div>
          <div class="col-4">
            <Link class="btn btn-primary text-center" to="/add-project">Add Project</Link>
          </div>
        </div>
      </ContentDiv>
      <div class="row m-0">
          { projects.map((project, index) => (
            <Project project={project} className="col-12 col-md-6"></Project>
          ))}
      </div>
    </div>
  );
}

export default Projects;

