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
      return { error: err.message };
    }
  }

  sign_in = async (username, password) => {
    try {
      const { username, password } = req.body;
      const user = await this.model.findOne({ username });
      if (!user) {
        return { error: 'Invalid username or password' };
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return { error: 'Invalid username or password' };
      }

	  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

      return { message: 'Login successful', token: token };
    } catch (err) {
      return { error: 'Server error' };
    }
  }
}


module.exports = AuthenticationQueryExecutor
