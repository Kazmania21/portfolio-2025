import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'
import Modal from '../components/modal.tsx'
import Select from '../components/select.tsx'
import Input from '../components/input.tsx'
import { AuthContext } from '../components/auth-provider.tsx'
import { IProject } from '../types/project';

interface ProjectProps {
  project: IProject,
  className?: string;
}

const Project: React.FC<ProjectProps> = ({project, className=""}) => {
  //console.log(project);
  //console.log(project.urls);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className={className}>
      <ContentDiv className="m-5" childrenClass="ms-3 me-3">
        <div className="row">
            <div className="col">
            <EditableText text={project.name} Tag="h2" updateUrl={`${apiUrl}/api/projects/${project._id}`} className="text-center m-0"></EditableText>
            </div>
			{ isLoggedIn && (
                <div className="col-auto">
                  <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}`}></DeleteButton>
                </div> 
			  )
			}
        </div>
        <img src={`${apiUrl}/${project.image_location}`} width="100%"></img>
        <div className="ms-2">
          <EditableText text={project.tagline} updateUrl={`${apiUrl}/api/projects/${project._id}`} fieldName="tagline" className="mb-0"></EditableText>
		  <div className="row">
		    <Modal modalId={`technologies-modal-${project._id}`} title="Add Technology to Project" formMethod="PATCH" formUrl={`${apiUrl}/api/projects/${project._id}/add`} >
			  <Select labelText="Technology" defaultText="Select Technology" optionsUrl={`${apiUrl}/api/technologies`} inputName="technologies"></Select>
			  <Link to="/add-technology">Technology not listed?</Link>
			</Modal>
		  	<div className="col-auto">
              <h3>Technologies Used</h3>
			</div>
			{ isLoggedIn && (
			    <div className="col-auto">
		          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#technologies-modal-${project._id}`}>Add Technology</button>
			    </div>
			  )
			}
		  </div>
          {project.technologies.map((technology) => (
            <div className="row">
			  <div className="col-auto">
                <span><b>{technology.type.name}:</b></span>
                <Link to={technology.url} className="text-center mb-0">
                  <img src={`${apiUrl}/${technology.image_location}`} width="50px"></img>
                  {technology.name}
                </Link>
			  </div>

			  { isLoggedIn && (
			      <div className="col-auto">
                    <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}/remove`}  reqBody={{"technologies": technology._id}} formMethod="PATCH"></DeleteButton>
			      </div>
			    )
			  }
            </div>
          ))} 
		  <Modal modalId={`urls-modal-${project._id}`} title="Add URL to Project" formMethod="PATCH" formUrl={`${apiUrl}/api/projects/${project._id}/add`} >
			  <Select labelText="URL Type" defaultText="Select URL Type" optionsUrl={`${apiUrl}/api/project_url_types`} inputName="urls[type]"></Select>
			  <Input labelText="URL" placeholder="URL" inputName="urls[url]"></Input>
			  <Link to="/add-url-type">URL type not listed?</Link>
			</Modal>
		  <div className="row">
		    <div className="col-auto">
              <h3>Project Links</h3>
			</div>
			{ isLoggedIn && (
			    <div className="col-auto">
		          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#urls-modal-${project._id}`}>Add Link</button>
		        </div>
			  )
			}
		  </div>
          <div className="row justify-content-center">
            {project.urls.map((url) => (
              <p className="col col-auto">
			  	<div className="row">
				  <div className="col-auto">
                    <Link to={url.url} className="btn btn-primary text-center mb-0">
                      <img src={`${apiUrl}/${url.type.image_location}`} width="20px"></img>
                      {url.type.name}
                    </Link>
				  </div>
				
			      { isLoggedIn && (
				      <div className="col-auto">
                        <DeleteButton deleteUrl={`${apiUrl}/api/projects/${project._id}/remove`}  reqBody={{"urls": url}} formMethod="PATCH"></DeleteButton>
				      </div>
				    )
				  }
				</div>
              </p>
            ))}

			{ Number(project.urls.length) === 0 && (
                <p>No Links available at this time</p>
			  )
			}
          </div>
        </div>
      </ContentDiv>
    </div>
  );
}

export default Project;

