//import React from 'react';
import { useState } from 'react';

const Input: React.FC = ({children, className="border p-2", legendText=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //console.log(updateUrl);
  var currentChildId = 1;

  const onAdd = () => {
    console.log("Adding Child");
    var children = document.getElementById(`${legendText}-children`);
    var originalChild = document.getElementById(`${legendText}-originalChild`);

	var newChild = document.importNode(originalChild, true);
	var inputs = newChild.getElementsByTagName("input");
	var dropdowns = newChild.getElementsByTagName("select");

	for (var input of inputs) {
      input.name = input.name.replace("[0]", `[${currentChildId}]`)
	}

	for (var dropdown of dropdowns) {
      dropdown.name = dropdown.name.replace("[0]", `[${currentChildId}]`)
	}

	children.appendChild(newChild);

	currentChildId++;
  }

  return (
    <fieldset class={className}>
      <legend class="w-auto text-left float-none"><h2>{ legendText }</h2></legend>
	  <div id={`${legendText}-children`}>
	    <div id={`${legendText}-originalChild`}>
          {children}
	    </div>
	  </div>
	  <button class="btn btn-success" onClick={onAdd} type="button">Add</button>
	  <button class="btn btn-danger" type="button">Remove</button>
    </fieldset>
  );
}

export default Input;

