import { useContext } from 'react';
import { AuthContext } from '../components/auth-provider.tsx'

interface DeleteButtonProps {
  containerClassName?: string;
  className?: string;
  onDelete?: Function;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({containerClassName="", className="", onDelete=null}) => { 
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
		{ isLoggedIn && (
			<div className={containerClassName}>
              <i className={`fa fa-solid fa-trash text-danger ${className}`} onClick={() => onDelete?.()}></i>
			</div>
		  )
		}
    </>
  );
}

export default DeleteButton;

