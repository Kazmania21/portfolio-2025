import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Project from '../components/project.tsx'
import { AuthContext } from '../components/auth-provider'
import ApiService from '../services/api-service.tsx'

const Projects: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState([]);
  const {isLoggedIn} = useContext(AuthContext);
  useEffect(() => { 
	const fetchProjects = async () => {
  	  var response = await ApiService({url: "/api/projects"});
	  setProjects(await response.json());
	}

	fetchProjects();

	const interval = setInterval(() => {
      fetchProjects();
    }, 5000);

	return () => {
	  clearInterval(interval);
	}
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
      <div className="row m-0">
          { projects.map((project) => (
            <Project project={project} className="col-12 col-md-6"></Project>
          ))}
      </div>
    </div>
  );
}

export default Projects;

