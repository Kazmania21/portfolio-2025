import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'

const Project: React.FC = () => {
  return (
    <div>
      <ContentDiv className="m-5">
        <h1 class="text-center m-0">Projects</h1>
      </ContentDiv>
      <ContentDiv className="m-2" childrenClass="ms-2">
      
      <p class="text-center mb-0">
        <Link to="/projects" class="btn btn-primary text-center mb-0">Projects</Link>
      </p>
      </ContentDiv>
    </div>
  );
}

export default Project;

