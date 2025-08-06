const express = require('express');
const authMiddleware = require('../middleware/authorization');
const validateForm = require('../middleware/validate_form');
const Response = require('../utils/response');

class AuthenticationServerRoute {
  constructor(authenticationQueryExecutor, authenticationForm) {
    this.authenticationQueryExecutor = authenticationQueryExecutor;
    this.authenticationForm = authenticationForm;
        
    this.router = express.Router('');
    this.initRoutes();
  };

  initRoutes = () => {
    this.router.post('/sign_up', validateForm(this.authenticationForm), this.signUp);
    this.router.post('/sign_in', validateForm(this.authenticationForm), this.signIn);
    this.router.post('/sign_out', this.signOut);
    this.router.get('/profile_info', authMiddleware, this.profileInfo);
  };

  signUp = async (req, res) => {
    console.log(this.authenticationForm.validate(req));
    const { username, password } = req.body;
    const response = await this.authenticationQueryExecutor.signUp(username, password);
    res.status(response.status).json(response.getResponse());
  };

  signIn = async (req, res) => {
    const { username, password } = req.body;
    const response = await this.authenticationQueryExecutor.signIn(username, password);
    console.log(response);

    if (response.status === 200) {
      res
        .status(response.status)
        .cookie('token', response.token, {
          httpOnly: true,
          secure: true,
          sameSite: 'Strict',
          maxAge: 1000 * 60 * 15
        })
        .json(response.getResponse());
      return;
    }

    res.status(response.status).json(response.getResponse());
  };

  signOut = async (req, res) => {
    const response = new Response(200, { 'message': 'Logged out successfully' });

    res
      .status(response.status)
      .clearCookie('token', { 
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15000
      })
      .json(response.getResponse());
  };

  profileInfo = async (req, res) => {
    const response = new Response(200, { 'data': { loggedIn: true } });

    res.status(response.status).json(response.getResponse());
  };
}

module.exports = AuthenticationServerRoute;
