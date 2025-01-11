import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'

const Home: React.FC = () => {
  return (
    <div>
      <ContentDiv className="m-5">
        <h1 class="text-center m-0">Hi! I'm Cameron Kazmarski. <br/>A Software Engineer</h1>
      </ContentDiv>

      <ContentDiv className="m-2" childrenClass="ms-2">
        <h2>About Me</h2>
        <p>
        I am currently prusuing a computer science major with minors in web and mobile and cybersecurity. My experience with Python, Javascript, C#, and their associated libaries and frameworks shows my ability to learn new things quickly. My passion to learn and understand new technologies and subjects keeps me up to date when it comes to new innovations and solutions in the field.

        This passion for learning has pushed me to become a programmer in the ComECal club at Geneva College and get on the Dean's list for three consecutive semesters. As a programmer and a student I am always looking for new challenges to overcome. For this reason, I am on the lookout for new internship opportunities. If you would like to contact me regarding any such opportunities click here.

        Thank you for reading.</p>
        <p class="text-center mb-0">
          <Link to="/projects" class="btn btn-primary text-center mb-0">Projects</Link>
        </p>
      </ContentDiv>
    </div>
  );
}

export default Home;

