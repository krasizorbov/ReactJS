import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import './Image.css';
import DashboardActions from './DashboardActions';
import { getCurrentFanProfile, deleteAccount } from '../../actions/fanProfile';

const FanDashboard = ({
  getCurrentFanProfile,
  deleteAccount,
  auth: { user },
  fanProfile: { fanProfile },
}) => {
  useEffect(() => {
    getCurrentFanProfile();
  }, [getCurrentFanProfile]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {fanProfile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className='ui three column grid'>
            <div className='crop'>
              <img style={{ width: 400 }} src={fanProfile.art} alt='' />
            </div>
          </div>
          {/* <Album album={profile.albums} />
          <Track track={profile.tracks} /> */}
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-fan-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

FanDashboard.propTypes = {
  getCurrentFanProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fanProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fanProfile: state.fanProfile,
});

export default connect(mapStateToProps, {
  getCurrentFanProfile,
  deleteAccount,
})(FanDashboard);
