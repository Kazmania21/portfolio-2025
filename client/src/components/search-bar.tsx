import { useState, useEffect } from 'react';

interface SearchBarProps {
  text?: string;
  originalArray: Object[];
  setFilteredArray: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({text="", originalArray, setFilteredArray}) => {
  const [_text, setText] = useState<string>(text);

  useEffect(() => {
	var filteredArray = originalArray.filter(item => {
	  const stack = [item];

	  while (stack.length) {
		const val = stack.pop();

		if (val == null || typeof val !== 'object') {
		  if (String(val).toLowerCase().includes(_text.toLowerCase())) return true;
		  continue;
		}

		stack.push(...(Array.isArray(val) ? val : Object.values(val)));
	  }
	})

	console.log(`Searching`);
	console.log(originalArray);
	console.log(filteredArray);
	setFilteredArray(filteredArray);
  }, [originalArray, _text])

  return (
    <>
 	  <input placeholder="Search" className="form-floating form-control ms-5 me-2 border-secondary" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}></input>
    </>
  );
}

export default SearchBar;

