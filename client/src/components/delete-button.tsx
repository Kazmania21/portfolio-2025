import { useContext } from 'react';
import ApiService from '../services/api-service'; 
import { AuthContext } from '../components/auth-provider.tsx'

interface DeleteButtonProps {
  containerClassName?: string;
  className?: string;
  deleteUrl?: string;
  formMethod?: string;
  reqBody?: Record<string, unknown>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({containerClassName="", className="", deleteUrl="", formMethod="DELETE", reqBody={}}) => { 
  const { isLoggedIn } = useContext(AuthContext);
  
  const deleteItem = async () => {
    ApiService({url: deleteUrl, formMethod: formMethod, contentType: "application/json", reqBody: JSON.stringify(reqBody)});
  }

  return (
    <>
		{ isLoggedIn && (
			<div className={containerClassName}>
              <i className={`fa fa-solid fa-trash text-danger ${className}`} onClick={deleteItem}></i>
			</div>
		  )
		}
    </>
  );
}

export default DeleteButton;

