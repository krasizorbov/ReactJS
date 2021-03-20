import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Image.css';
import Track from './Track';
import Album from './Album';
import { getCurrentProfile } from '../../actions/profile';

const Releases = ({ getCurrentProfile, profile: { profile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <div className='ui three column grid'>
        <div className='crop'>
          <img style={{ width: 400 }} src={profile.art} alt='' />
        </div>
      </div>
      <Album album={profile.albums} />
      <Track track={profile.tracks} />
    </Fragment>
  );
};

Releases.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Releases);
