import { useState, useEffect, useRef } from 'react';
import ApiService from '../services/api-service';
import Tags from 'bootstrap5-tags';

interface TagsInputProps {
  options?: string[];
  optionsUrl?: string;
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

const TagsInput: React.FC<TagsInputProps> = ({options=[], optionsUrl="", className="", inputName="", defaultText="Select Item", labelText="", defaultTags=[], defaultTagUrl=""}) => {
  const [_options, setOptions] = useState<SelectOption[]>([]);
  const tagsInputRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    Tags.init("select[multiple]");

    const fetchOptions = async () => {
      var response = await ApiService({url: optionsUrl});
      if (!response) {return;}
      var data = await response.json();
      setOptions(data.data);
    }

    const fetchDefaultTags = async () => {
      var response = await ApiService({url: defaultTagUrl});
      if (!response) {return;}
      var data = await response.json();
      var tags = [...defaultTags, ...data.data]; 
      var tagInput = Tags.getInstance(tagsInputRef.current!);
      tagInput.setData(tags);
    }

    fetchOptions();
    if (defaultTagUrl != "") {
      fetchDefaultTags();
    }

    var tagsInput = Tags.getInstance(tagsInputRef.current!);
    console.log(defaultTags);
    for (var tag of defaultTags) {
      console.log(tag);
      tagsInput.addItem(tag);
    }
    
    /*const interval = setInterval(() => {
      fetchOptions();
    }, 5000)

    return () => {
      clearInterval(interval);
    }*/
  }, [])

  useEffect(() => {
    var tagInput = Tags.getInstance(tagsInputRef.current!);
    tagInput.resetSuggestions();
  }, [options])

  return (
    <div className="form-group">
      <label htmlFor={inputName}>{labelText}</label>
      <select ref={tagsInputRef} className={`form-select ${className}`} name={inputName} multiple data-allow-clear="true" data-allow-new="true">
          <option disabled hidden value="">{defaultText}</option>
          { _options.map((option) => (
              <option value={option._id}>{ option._id }</option>
            )
          )}
      </select>
    </div>
  );
}

export default TagsInput;

