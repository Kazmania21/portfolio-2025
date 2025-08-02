const express = require('express');
const authMiddleware = require('./middleware/authorization');
const validateForm = require('./middleware/validate_form');
const Response = require('./response');

class AuthenticationServerRoute {
    constructor(authentication_query_executor, authentication_form) {
      this.authentication_query_executor = authentication_query_executor;
      this.authentication_form = authentication_form;
        
      this.router = express.Router("");
      this.initRoutes();
    }

    initRoutes = () => {
      this.router.post('/sign_up', validateForm(this.authentication_form), this.sign_up);
      this.router.post('/sign_in', validateForm(this.authentication_form), this.sign_in);
      this.router.post('/sign_out', this.sign_out);
      this.router.get('/profile_info', authMiddleware, this.profile_info);
    }

    sign_up = async (req, res) => {
      console.log(this.authentication_form.validate(req));
      const { username, password } = req.body;
      const response = await authentication_query_executor.sign_up(username, password);
      res.status(response.status).json(response.getResponse());
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
          maxAge: 1000 * 60 * 15
        })
        .json(response.getResponse());
        return
      }

      res.status(response.status).json(response.getResponse());
    };

    sign_out = async (req, res) => {
     const response = new Response(200, {"message": "Logged out successfully"});

      res.status(response.status).clearCookie('token', { 
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15000
      })
      .json(response.getResponse());
    };

    profile_info = async (req, res) => {
      const response = new Response(200, {"data": {loggedIn: true}});

      res.status(response.status).json(response.getResponse());
    }
}

module.exports = AuthenticationServerRoute
