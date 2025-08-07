import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useTitle } from '../hooks/use-title.tsx';

const Contact: React.FC = () => {
  useTitle("Contact");

  return (
    <div>
      <ContentDiv className="m-5" childrenClass="ms-2">
        <h1>Contact Me</h1>
        <p>
          <b className="me-1">
            <FontAwesomeIcon icon={faPhone} className="me-1" />
            Phone:
          </b> 
          <Link to="tel:7249449263">(724) 944-9263</Link>
        </p>

        <p>
          <b className="me-1">
            <FontAwesomeIcon icon={faEnvelope} className="me-1" />
            Email:
          </b> 
          <Link to="mailto:cameronkazmarski@gmail.com">cameronkazmarski@gmail.com</Link>
        </p>

        <p className="mb-0">
          <b className="me-1">
            <FontAwesomeIcon icon={faLinkedin} className="me-1" />
            LinkedIn:
          </b> 
          <Link to="https://www.linkedin.com/in/cameron-kazmarski-66b4a7260/">https://www.linkedin.com/in/cameron-kazmarski-66b4a7260/</Link>
        </p>
      </ContentDiv>
    </div>
  );
}

export default Contact;

