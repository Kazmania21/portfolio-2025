import React, { createContext } from 'react';
import { UseCrudReturn } from '../hooks/use-crud.tsx';

interface CrudContextProps {
  children: React.ReactNode;
}

interface CrudContextType {
  endpoints: Record<string, UseCrudReturn>
}

export const CrudContext = createContext<CrudContextType>({endpoints: {}});

export const CrudProvider: React.FC<CrudContextProps> = ({children}) => {
  const endpoints: Record<string, UseCrudReturn> = {};

  return (
	<CrudContext.Provider value={{ endpoints }}>
	  {children}
	</CrudContext.Provider>
  );
}

export default CrudProvider;

