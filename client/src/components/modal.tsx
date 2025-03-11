import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentDiv from '../components/content-div.tsx'
import EditableText from '../components/editable-text.tsx'
import DeleteButton from '../components/delete-button.tsx'
import { Modal as BootstrapModal } from 'bootstrap';

const Modal: React.FC = ({children, modalId, title, formMethod, formUrl, className=""}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSave = async () => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
	console.log("Saving Data");

    try {
      const response = await fetch(`${formUrl}`, {
        method: formMethod,
		headers: {
		  "Content-Type": "application/JSON",
		},
        body: JSON.stringify(Object.fromEntries(formData)),
      });

	  if (response.ok) {
	    console.log("Closing");
		document.querySelector(`#${modalId} [data-bs-dismiss="modal"]`).click();
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
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

