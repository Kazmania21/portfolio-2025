import { useState, useEffect, useRef } from 'react';
import ApiService from '../services/api-service';
import Tags from '../plugins/bootstrap5-tags-master/tags.js'

interface TagsInputProps {
  optionsUrl: string;
  className?: string;
  inputName?: string;
  defaultText?: string;
  labelText?: string;
  defaultTags?: string[];
  defaultTagUrl?: string;
}

interface SelectOption {
  _id: string;
}

const TagsInput: React.FC<TagsInputProps> = ({optionsUrl, className="", inputName="", defaultText="Select Item", labelText="", defaultTags=[], defaultTagUrl=""}) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const tagsInputRef = useRef<HTMLElement>(null);

  useEffect(() => {
	Tags.init("select[multiple]");

	const fetchOptions = async () => {
	  var response = await ApiService({url: optionsUrl});
	  var data = await response.json();
	  setOptions(data);
	}

	const fetchDefaultTags = async () => {
	  var response = await ApiService({url: defaultTagUrl});
	  var data = await response.json();
	  var tags = [...defaultTags, ...data]; 
	  var tagsInput = document.querySelector("select[multiple]");
	  var tag = Tags.getInstance(tagsInput);
	  tag.setData(tags);
	}

	fetchOptions();
	if (defaultTagUrl != "") {
	  fetchDefaultTags();
	}

	var tagsInput = Tags.getInstance(tagsInputRef.current);
	console.log(defaultTags);
	for (var tag of defaultTags) {
	  console.log(tag);
	  tagsInput.addItem(tag);
	}
	
	const interval = setInterval(() => {
	  fetchOptions();
	}, 5000)

	return () => {
	  clearInterval(interval);
	}
  }, [])

  useEffect(() => {
    var tagsInput = document.querySelector("select[multiple]");
	var tag = Tags.getInstance(tagsInputRef.current);
	tag.resetSuggestions();
  }, [options])

  return (
    <div className="form-group">
      <label htmlFor={inputName}>{labelText}</label>
      <select ref={tagsInputRef} className={`form-select ${className}`} name={inputName} multiple data-allow-clear="true" data-allow-new="true">
          <option disabled hidden value="">{defaultText}</option>
          { options.map((option, index) => (
              <option value={option._id}>{ option._id }</option>
			)
          )}
      </select>
    </div>
  );
}

export default TagsInput;

