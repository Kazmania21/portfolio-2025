class Response {
  constructor(status = 200, { message, data, errors, token }) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.token = token;
  }

  getResponse() {
    return { 
      'message': this.message, 
      'data': this.data, 
      'errors': this.errors, 
      'token': this.token 
    };
  }
}

module.exports = Response;
