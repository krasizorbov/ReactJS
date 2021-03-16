import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  let isArtist = '';
  if (user !== null) {
    if (user.bandName !== undefined && isAuthenticated) {
      isArtist = true;
    } else {
      isArtist = false;
    }
  }
  const artistLinks = (
    <ul>
      <li>
        {isArtist === true ? (
          <Link to={`/${user.bandName}/dashboard`}>Dashboard</Link>
        ) : null}
      </li>
      <li>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register/artist'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  const fanLinks = (
    <ul>
      <li>
        <Link to='/fan/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/' onClick={logout}>
          Logout
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-headphones' /> Racoon6
        </Link>
      </h1>
      <div>
        <h4>Discover amazing new music and support the artists who make it.</h4>
      </div>
      <Fragment>
        {isArtist === true
          ? artistLinks
          : isArtist === false
          ? fanLinks
          : guestLinks}
      </Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
