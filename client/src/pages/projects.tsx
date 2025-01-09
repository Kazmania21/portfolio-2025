import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import Project from '../components/project.tsx'

const Projects: React.FC = () => {
  return (
    <div>
      <ContentDiv className="m-5">
        <h1 class="text-center m-0">Projects</h1>
      </ContentDiv>
    </div>
  );
}

export default Projects;

