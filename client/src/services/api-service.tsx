export const ApiService = async ({url, formMethod = "GET", contentType = null, reqBody = {}, baseUrl = import.meta.env.VITE_API_URL}) => {
  //console.log(reqBody)
  //console.log(sessionStorage.getItem("authToken"));
  try {
    var reqOptions = {
      method: formMethod,
      headers: { 
        "authorization": `Bearer ${sessionStorage.getItem("authToken")}`
	  },
    }

	if (formMethod != "GET") {
	  reqOptions["body"] = reqBody;
	}

	if (contentType != null) {
	  console.log(`Content Type: ${contentType}`);
      reqOptions["headers"]["Content-Type"] = contentType;
	  console.log(`Content Type: ${contentType}`);
	}

    const response = await fetch(`${baseUrl}${url}`, reqOptions);

    if (!response.ok) {
      //console.log(response);
      throw new Error("Api call failed");
    }

	return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default ApiService;

