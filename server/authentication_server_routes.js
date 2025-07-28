const express = require('express');
const authMiddleware = require('./middleware/authorization');

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
      this.router.post('/sign_out', this.sign_out);
      this.router.get('/profile_info', authMiddleware, this.profile_info);
    }

	sign_up = async (req, res) => {
  	  const { username, password } = req.body;
  	  const response = await authentication_query_executor.sign_up(username, password);
  	  res.status(response.status).json(response);
	};

	sign_in = async (req, res) => {
  	  const { username, password } = req.body;
  	  const response = await authentication_query_executor.sign_in(username, password);
	  console.log(response);

	  if (response.status == 200) {
  	    res.status(response.status).cookie('token', response.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 15000
	    })
		.json({"Message": "Logged in successfully"});
		return
	  }

      res.status(response.status).json(response);
	};

	sign_out = async (req, res) => {
      res.status(200).clearCookie('token', { 
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15000
	  })
	  .json({"message": "Logged out successfully"});
	};

    profile_info = async (req, res) => {
      res.status(200).json({loggedIn: true});
	}
}

module.exports = AuthenticationServerRoute
