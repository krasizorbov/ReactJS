import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import './Image.css';
import Track from './Track';
import Album from './Album';
import { getProfileById } from '../../actions/profile';

const Releases = ({ getProfileById, match, profile: { profile } }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='ui three column grid'>
            <div className='crop'>
              <img style={{ width: 400 }} src={profile.art} alt='' />
            </div>
          </div>
          <Album album={profile.albums} />
          <Track track={profile.tracks} />
        </Fragment>
      )}
      ;
    </Fragment>
  );
};

Releases.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Releases);
