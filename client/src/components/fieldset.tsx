interface FieldsetProps {
  children: React.ReactNode,
  className?: string,
  legendText?: string
}

const Fieldset: React.FC<FieldsetProps> = ({children, className="border p-2", legendText=""}) => {
  var currentChildId = 1;

  const onAdd = () => {
    console.log("Adding Child");
    var children = document.getElementById(`${legendText}-children`);
    var originalChild = document.getElementById(`${legendText}-originalChild`);

	var newChild = document.importNode(originalChild!, true) as Element;
	var inputs = newChild.getElementsByTagName("input");
	var dropdowns = newChild.getElementsByTagName("select");

	for (var input of inputs) {
      input.name = input.name.replace("[0]", `[${currentChildId}]`)
	}

	for (var dropdown of dropdowns) {
      dropdown.name = dropdown.name.replace("[0]", `[${currentChildId}]`)
	}

	if (children) {
	  children.appendChild(newChild);
	}

	currentChildId++;
  }

  return (
    <fieldset className={className}>
      <legend className="w-auto text-left float-none"><h2>{ legendText }</h2></legend>
	  <div id={`${legendText}-children`}>
	    <div id={`${legendText}-originalChild`}>
          {children}
	    </div>
	  </div>
	  <button className="btn btn-success" onClick={onAdd} type="button">Add</button>
	  <button className="btn btn-danger" type="button">Remove</button>
    </fieldset>
  );
}

export default Fieldset;

