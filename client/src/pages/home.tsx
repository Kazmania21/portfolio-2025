import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx';
import EditableText from '../components/editable-text.tsx';
import ApiService from '../services/api-service.tsx';
import { IMetadata } from '../types/metadata.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { useTitle } from '../hooks/use-title.tsx';

const Home: React.FC = () => {
  useTitle("About");
  const [metadata, setMetadata] = useState<IMetadata>();

  useEffect(() => { 
    const fetchMetadata = async () => {
      var response = await ApiService({url: "/api/metadata"});

      if (!response) {
        return;
      }

      var data = await response.json();
      setMetadata(data[0]);
    }

    fetchMetadata();

    const interval = setInterval(() => {
      fetchMetadata();
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div>
      <ContentDiv className="m-5">
        { metadata && (
          <EditableText text={metadata.greeting} Tag="h1" InputTag="textarea" updateUrl={`/api/metadata/${metadata._id}`} fieldName="greeting" className="text-center m-0"></EditableText>
        )}
      </ContentDiv>

      <ContentDiv className="m-2" childrenClass="ms-2">
        <h2>About Me</h2>
        { metadata && (
          <EditableText text={metadata.bio} Tag="p" InputTag="textarea" updateUrl={`/api/metadata/${metadata._id}`} fieldName="bio" className="indented"></EditableText>
        )}
        <p className="text-center mb-0">
          <Link to="/projects" className="btn btn-primary text-center mb-0">
            <FontAwesomeIcon icon={faFolder} className="me-1" />
            Projects
          </Link>
        </p>
      </ContentDiv>
    </div>
  );
}

export default Home;

