import React, { useContext, useRef } from 'react';
import ContentDiv from '../components/content-div.tsx';
import EditableText from '../components/editable-text.tsx';
import DeleteButton from '../components/delete-button.tsx';
import ProjectTechnologies from '../components/project-technologies.tsx';
import ProjectUrls from '../components/project-urls.tsx';
import ProjectTags from '../components/project-tags.tsx';
import { IProject } from '../types/project';
import { CrudContext } from '../components/crud-provider.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

interface UpdateImageButtonProps {
  projectId: string | Number,
  className?: string;
}

const UpdateImageButton: React.FC<UpdateImageButtonProps> = ({projectId, className=""}) => {
  //console.log(project);
  const apiUrl = import.meta.env.VITE_API_URL;
  const inputRef = useRef<HTMLInputElement>(null);
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];

  const handleFileChange = async (e: React.ChangeEvent<HTNLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imageFile', file);

    projects.updateOne(projectId, formData);
  }

  return (
    <div className={className}>
	  <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
	  <FontAwesomeIcon icon={faPencil} onClick={() => inputRef.current?.click()} />
	</div>
  );
}

export default UpdateImageButton;

