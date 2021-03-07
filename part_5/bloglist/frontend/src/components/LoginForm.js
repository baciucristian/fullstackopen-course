import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username{' '}
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          Password{' '}
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" id="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
