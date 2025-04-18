import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Project from '../components/project.tsx'
import { AuthContext } from '../components/auth-provider'
import ApiService from '../services/api-service.tsx'
import '../styles/scrollable-projects.css'

const Projects: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [projectCategories, setProjectCategories] = useState([]);
  const {isLoggedIn} = useContext(AuthContext);
  useEffect(() => { 
	const fetchProjects = async () => {
  	  var response = await ApiService({url: "/api/projects?groupBy=tags&sortBy=tags_group,name"});
	  var data = await response.json();
	  console.log(data);
	  setProjectCategories(data);
	}

	fetchProjects();

	/*const interval = setInterval(() => {
      fetchProjects();
    }, 5000);*/

	return () => {
	  //clearInterval(interval);
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
      <div>
          { projectCategories.map((projects) => (
		  	  <div>
			    <ContentDiv className="m-5">
				  <h2 className="text-center m-0">{projects._id}</h2>
			    </ContentDiv>
				<div className="d-flex overflow-auto flex-nowrap m-0">
		          {projects.data.map((project) => (
                    <Project project={project} className="scroll-item"></Project>
                  ))}
				</div>
			  </div>
		    )
		  )}
      </div>
    </div>
  );
}

export default Projects;

