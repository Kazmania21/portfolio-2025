import '../styles/column-wrap.css';

export type Option = {
  _id: string;
  name: string;
}

type FilterOptionGroupProps = {
  options: Option[];
  header?: string;
  selected: Set<unknown>;
  setSelected: Function;
  HeaderTag?: React.ElementType;
  width?: string;
};

export default function FilterOptionGroup({ options, header="", selected, setSelected, HeaderTag="h2", width="80vw" }: FilterOptionGroupProps) {
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
      <HeaderTag>{header}</HeaderTag>
      <div className="column-wrap" style={{width: width}}>
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
