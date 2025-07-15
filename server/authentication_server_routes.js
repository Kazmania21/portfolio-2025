const express = require('express');

class AuthenticationServerRoute {
    constructor(authentication_query_executor, insert_form=null) {
	  this.authentication_query_executor = authentication_query_executor;
      this.insert_form = insert_form;
        
      this.router = express.Router("");
      this.initRoutes();
    }

    initRoutes = () => {
      this.router.post('/sign_up', this.sign_up);
      this.router.post('/sign_in', this.sign_in);
    }

	sign_up = async (req, res) => {
  	  const { username, password } = req.body;
  	  const response = await authentication_query_executor.sign_up(username, password);
  	  res.json(response);
	};

	sign_in = async (req, res) => {
  	  const { username, password } = req.body;
  	  const response = await authentication_query_executor.sign_in(username, password);
  	  res.json(response);
	};
}

module.exports = AuthenticationServerRoute
