interface ApiServiceParams {
  url: string;
  formMethod?: string;
  contentType?: string;
  reqBody?: BodyInit;
  baseUrl?: string;
}

export const ApiService = async ({url, formMethod = "GET", contentType, reqBody, baseUrl = import.meta.env.VITE_API_URL}: ApiServiceParams) => {
  //console.log(reqBody)
  //console.log(sessionStorage.getItem("authToken"));
  try {
    var csrfToken = "";

    if (formMethod != "GET") {
      csrfToken = (await (await fetch(`${baseUrl}/api/csrf-token`, {credentials: "include"})).json()).csrfToken;
	  console.log(csrfToken);
	}

	var headers: HeadersInit = { 
      "authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
	  "X-CSRF-Token": csrfToken
	}

    var reqOptions: RequestInit = {
      method: formMethod,
      headers: headers,
	  credentials: "include"
    }

	if (formMethod != "GET") {
	  reqOptions["body"] = reqBody;
	}

	if (contentType != null) {
	  console.log(`Content Type: ${contentType}`);
      headers["Content-Type"] = contentType;
	  console.log(`Content Type: ${contentType}`);
	}

    const response = await fetch(`${baseUrl}${url}`, reqOptions);

    if (!response.ok) {
      //console.log(response);
	  return response;
      throw new Error("Api call failed");
    }

	return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default ApiService;

