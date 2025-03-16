interface DeleteButtonProps {
  className?: string;
  deleteUrl?: string;
  formMethod?: string;
  reqBody?: Record<string, unknown>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({className="", deleteUrl="", formMethod="DELETE", reqBody={}}) => {
  const deleteItem = async () => {
    console.log(reqBody);
    try {
      const response = await fetch(`${deleteUrl}`, {
        method: formMethod,
        headers: { 
		  "Content-Type": "application/json" ,
          "authorization": `Bearer ${sessionStorage.getItem("authToken")}`
		},
		body: JSON.stringify(reqBody)
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to delete text");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Optionally revert to the previous state if the delete fails
    }
  };

  return (
    <div>
        <i className={`fa fa-solid fa-trash text-danger ${className}`} onClick={deleteItem}></i>
    </div>
  );
}

export default DeleteButton;

