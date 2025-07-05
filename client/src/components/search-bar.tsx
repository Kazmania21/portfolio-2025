import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/auth-provider';
import { ApiService } from '../services/api-service';

interface SearchBarProps {
  text?: string;
  setText?: Function;
}

const SearchBar: React.FC<EditableTextProps> = ({text="", originalArray=[], setFilteredArray=null}) => {
  const [_text, setText] = useState<string>(text);

  useEffect(() => {
	var filteredArray = originalArray.filter(item => {
	  const stack = [item];

	  while (stack.length) {
		const val = stack.pop();

		if (val == null | typeof val !== 'object') {
		  if (String(val).toLowerCase().includes(_text.toLowerCase())) return true;
		  continue;
		}

		stack.push(...(Array.isArray(val) ? val : Object.values(val)));
	  }
	})

	setFilteredArray(filteredArray);
  }, [originalArray, _text])

  return (
    <>
 	  <input placeholder="Search" className="form-floating form-control ms-5 me-2 border-secondary" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}></input>
    </>
  );
}

export default SearchBar;

