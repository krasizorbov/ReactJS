import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const { name, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name && !password) {
      return;
    }
    login(name, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='ui center aligned three column grid'>
        <div className='ui hidden divider'></div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='row'>
          <h2 className='heading'>Log in</h2>
        </div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
      </div>

      <div className='ui center aligned four column grid'>
        <div className='row'>
          <form className='ui form' onSubmit={onSubmit}>
            <div className='field'>
              <label>Username</label>
              <input
                style={{ width: '300px', height: '30px' }}
                type='text'
                name='name'
                value={name}
                onChange={onChange}
              />
            </div>
            <div className='field'>
              <label>Password</label>
              <input
                style={{ width: '300px', height: '30px' }}
                type='password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </div>
            <button className='fluid ui button' type='submit'>
              Log in
            </button>
          </form>
        </div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='row'>
          <div className='forgot-password'>
            <a href='/forgot_password'>Forgot your password?</a>
          </div>
        </div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='row'>
          <div>
            Don’t have an account? Sign up as{' '}
            <Link to='/register/fan'>a fan</Link> or{' '}
            <Link to='/register/artist'>an artist</Link>.
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
