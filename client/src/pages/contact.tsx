import React from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';

const Contact: React.FC = () => {
  return (
    <div>
      <ContentDiv className="m-5" childrenClass="ms-2">
        <h1>Contact Me</h1>
        <p><b>Phone:</b> <Link to="tel:7249449263">(724) 944-9263</Link></p>
        <p><b>Email:</b> <Link to="mailto:cameronkazmarski@gmail.com">cameronkazmarski@gmail.com</Link></p>
        <p class="mb-0"><b>LinkedIn:</b> <Link to="https://www.linkedin.com/in/cameron-kazmarski-66b4a7260/">https://www.linkedin.com/in/cameron-kazmarski-66b4a7260/</Link></p>
      </ContentDiv>
    </div>
  );
}

export default Contact;

