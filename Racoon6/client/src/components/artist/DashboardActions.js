import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardActions = ({ auth: { isAuthenticated, user } }) => {
  if (user !== null) {
    if (user.bandName !== undefined && isAuthenticated) {
      return (
        <div className='dash-buttons'>
          <Link to={`/${user.bandName}/edit-profile`} className='btn btn-light'>
            <i className='fas fa-user-circle text-primary' /> Edit Profile
          </Link>
          <Link to={`/${user.bandName}/add-track`} className='btn btn-light'>
            <i className='fas fa-file-audio text-primary' /> Add Track
          </Link>
          <Link to={`/${user.bandName}/add-album`} className='btn btn-light'>
            <i className='fas fa-compact-disc text-primary' /> Add Album
          </Link>
        </div>
      );
    } else {
      //isArtist = false;
    }
  }
};

DashboardActions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(DashboardActions);
