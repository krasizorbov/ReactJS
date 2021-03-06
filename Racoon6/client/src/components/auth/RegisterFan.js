import React, { Fragment, useState } from 'react';
import { Checkbox } from 'reakit/Checkbox';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registerfan } from '../../actions/auth';
import PropTypes from 'prop-types';

const RegisterFan = ({ setAlert, registerfan, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [checked, setChecked] = useState(false);
  const toggle = () => setChecked(!checked);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email && !password) {
      return;
    }
    if (checked === false && name !== '' && email !== '' && password !== '') {
      setAlert('Please accept the terms of use', 'danger');
    } else {
      registerfan({ name, email, password });
    }
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
          <h2 className='heading'>Sign up for a Racoon6 fan account</h2>
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
        <div className='ui section divider'></div>
        <div className='ui section divider'></div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='row'>
          <form className='ui form' onSubmit={onSubmit}>
            <div className='field'>
              <label>Email</label>
              <input
                style={{ width: '300px', height: '30px' }}
                type='email'
                name='email'
                value={email}
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
              <div className='ui checkbox'>
                <Checkbox
                  checked={checked}
                  onChange={toggle}
                  type='checkbox'
                  tabIndex='0'
                />
                <label>
                  <span>
                    I have read and agree to the{' '}
                    <a href='/terms_of_use'>Terms of Use</a>.
                  </span>
                </label>
              </div>
            </div>
            <button className='fluid ui button' type='submit'>
              Sign up
            </button>
          </form>
        </div>
      </div>

      <div className='ui center aligned three column grid'>
        <div className='row'>
          <p>
            Already have an account? <Link to='/login'>Log in</Link>.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

RegisterFan.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerfan: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerfan })(RegisterFan);
