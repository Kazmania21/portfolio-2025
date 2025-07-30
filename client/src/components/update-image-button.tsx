import React, { useContext, useRef } from 'react';
import { AuthContext } from '../components/auth-provider.tsx';
import { CrudContext } from '../components/crud-provider.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

interface UpdateImageButtonProps {
  projectId: string | Number,
  className?: string;
}

const UpdateImageButton: React.FC<UpdateImageButtonProps> = ({projectId, className=""}) => {
  //console.log(project);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn } = useContext(AuthContext);
  const { endpoints } = useContext(CrudContext);
  const projects = endpoints["projects"];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imageFile', file);

    projects.updateOne(projectId, formData);
  }

  return (
    <>
	  { isLoggedIn && (
          <div className={className}>
	        <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
	        <FontAwesomeIcon icon={faPencil} onClick={() => inputRef.current?.click()} />
	      </div>
        )
	  }
	</>
  );
}

export default UpdateImageButton;

