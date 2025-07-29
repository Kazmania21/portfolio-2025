const csrf = require('csurf');

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    sameSite: 'Strict',
    secure: true,
  },
})

module.exports = csrfProtection;
