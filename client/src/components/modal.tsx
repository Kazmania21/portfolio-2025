import React, { useEffect, Component, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'
import { Modal as BootstrapModal } from 'bootstrap';

const Modal: React.FC = ({children, modalId, title, formMethod, formUrl, className=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  var closeButtonRef = useRef<HTMLElement | null>(null);
  const [closeButton, setCloseButton] = useState<HTMLElement | null>(null);
  //var closeButton = null;
  //var closeButton = null;

  const handleClose = () => {
    console.log("closing");
    document.body.classList.remove("modal-open");
	document.body.style = "";
	var modalBackdrops = document.getElementsByClassName("modal-backdrop");
	for (var modalBackdrop of modalBackdrops) {
	  modalBackdrop.className = "";
	}
    //alert("hi")
	//console.log(closeButton);
	if (closeButtonRef.current) {
	  closeButtonRef.current.click();
	}
	//let myModal = new bootstrap.Modal(document.getElementById(modalId));
	//console.log(myModal);
	//myModal.hide();
	//console.log(document.getElementById(modalId))
	//document.getElementById(modalId).modal('hide');
	//console.log(BootstrapModal);
	//let myModal = BootstrapModal.getInstance(document.getElementById(modalId));
	//console.log(myModal.hide);
	//myModal.hide();
	//console.log(myModal.hide());
	//console.log(myModal);

  }

  //componentWillUnmount() {
  //  document.body.classList.remove("modal-open");
  //}
  
  const location = useLocation();

  useEffect(() => {
    //document.body.classList.remove("modal-open");
	//console.log("hi");
	/*if (!closeButtonRef) {
	  console.log("setting close button");
	  console.log(document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).cloneNode());
	  let button = document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).cloneNode();
      //setCloseButton(button);
	  console.log(button);
	  closeButton = document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).cloneNode();
	}
	console.log(closeButton);*/
	/*if (!closeButton) {
	  await setCloseButton(closeButtonRef.current.cloneNode(true) as HTMLElement);
	  console.log(closeButtonRef.current.cloneNode(true));
	}*/
	//console.log(closeButton);

	return() => {
      handleClose();
	}
  }, []);

  const handleSave = async () => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
	console.log("Saving Data");

    try {
      console.log(new URLSearchParams(formData).toString());
      const response = await fetch(`${formUrl}`, {
        method: formMethod,
		headers: {
		  "Content-Type": "application/x-www-form-urlencoded",
		},
        body: new URLSearchParams(formData).toString(),
      });

	  if (response.ok) {
	    console.log("Closing");
		handleClose();
	  }

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
  	<div>
      <form onSubmit={handleSave}>
		<div class="modal fade" id={modalId} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
			  <div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">{title}</h5>
				<button ref={closeButtonRef} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			  </div>
			  <div class="modal-body">
				  {children}
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="submit" class="btn btn-primary">Save changes</button>
			  </div>
			</div>
		  </div>
		</div>
	  </form>
	</div>
  );
}

export default Modal;

