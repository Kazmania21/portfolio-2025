const jwt = require('jsonwebtoken');
const config = require('./config/config');


class AuthenticationQueryExecutor {
  constructor(database_connector, model) {
	this.database_connector = database_connector;
    this.model = model;
  }

  sign_up = async (username, password) => {
    try {
      const user = new this.model({ username, password });
      await user.save();
      return { message: 'User registered successfully' };
    } catch (err) {
      return { status: 400, error: err.message };
    }
  }

  sign_in = async (username, password) => {
	const SECRET_KEY = config.SECRET_KEY;

    try {
      const user = await this.model.findOne({ username });
      if (!user) {
        return { status: 400, error: 'Invalid username or password' };
      }
	  //user.attempts = 0;

	  if (!user.attempts) {
        user.attempts = 0;
	  }

	  console.log(`Attempts: ${user.attempts}`);

	  if (user.attempts > 3) {
        return { status: 400, error: 'Account locked out' };
	  }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
		user.attempts++;
		user.save();
        return { status: 400, error: 'Invalid username or password' };
      }

	  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

	  user.attempts = 0;
	  user.save();

      return { status: 200, message: 'Login successful', token: token };
    } catch (err) {
	  console.log(err);
      return { status: 500, error: `Server error: ${err}` };
    }
  }
}


module.exports = AuthenticationQueryExecutor
