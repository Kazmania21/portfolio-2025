import React, { useEffect, useRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  modalId: string;
  title: string;
  onSave: Function;
}

const Modal: React.FC<ModalProps> = ({children, modalId, title, onSave}) => {
  var closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    console.log("closing");
    document.body.classList.remove("modal-open");
	document.body.setAttribute("style", "");
	var modalBackdrops = document.getElementsByClassName("modal-backdrop");

	for (var modalBackdrop of modalBackdrops) {
	  modalBackdrop.className = "";
	}

	if (closeButtonRef.current) {
	  closeButtonRef.current.click();
	}
  }

  useEffect(() => {
	return() => {
      handleClose();
	}
  }, []);

  const handleSave = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
	console.log("Saving Data");

	onSave(formData);

	/*if (response.ok) {
	  console.log("Closing");
	  handleClose();
	}*/
	handleClose();
  };

  return (
  	<div>
      <form onSubmit={handleSave}>
		<div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog modal-dialog-centered">
			<div className="modal-content">
			  <div className="modal-header">
				<h5 className="modal-title" id="exampleModalLabel">{title}</h5>
				<button ref={closeButtonRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			  </div>
			  <div className="modal-body">
				  {children}
			  </div>
			  <div className="modal-footer">
				<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="submit" className="btn btn-primary">Save changes</button>
			  </div>
			</div>
		  </div>
		</div>
	  </form>
	</div>
  );
}

export default Modal;

