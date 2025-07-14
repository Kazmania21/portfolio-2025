import { useState, useEffect } from 'react';

type FilterOptionGroupProps = {
  options: { id: string; name: string }[];
  header?: string;
};

export default function FilterOptionGroup({ options, header=null, selected=new Set(), setSelected, getItemField, originalArray=[], setFilteredArray }: FilterOptionGroupProps) {
  /*useEffect(() => {
	let filteredArray = originalArray.filter(item => {
	  const itemField = getItemField(item);
	  for (const selectedItem of selected) {
        if (!itemField.has(selectedItem)) return false;
	  }
	  return true;
    });

	setFilteredArray(filteredArray);
  }, [originalArray])*/

  const handleToggle = (id: string) => {
    if (selected.has(id)) {
      selected.delete(id);
    }
	else {
      selected.add(id);
	}

	console.log(selected);
	setSelected(new Set(selected));
  };

  return (
    <div>
	  <h2>{header}</h2>
      <div className="d-flex flex-wrap" style={{width: "80vw"}}>
        {options.map(({ _id, name }) => (
          <div className="form-check me-2" key={_id}>
            <input className="form-check-input" type="checkbox" value="" id={_id} onChange={() => handleToggle(_id)} />
            <label className="form-check-label" htmlFor={_id}>
              {name}
            </label>
          </div>
        ))}
      </div>
	</div>
  );
}
