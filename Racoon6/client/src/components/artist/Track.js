import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCloudinary, deleteTrack } from '../../actions/profile';

const Track = ({ track, deleteTrack }) => {
  const tracks = track.map((t) => (
    <ul>
      <li className='reframe' key={t._id}>
        <div>{t.name}</div>
        <div className='crop' style={{ marginTop: '15px' }}>
          <img src={t.art} alt='Not Found' />
        </div>
      </li>
      <li>
        <div style={{ marginTop: '15px' }}>
          <ReactAudioPlayer src={t.audio} autoPlay={false} controls />
        </div>
      </li>
      <div
        className='dash-buttons'
        style={{ marginLeft: '50px', marginTop: '15px', marginBottom: '20px' }}
      >
        <button
          onClick={() => {
            deleteTrack(t._id);
            deleteCloudinary(t.artPublicId, t.audioPublicId);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
        <Link to='/edit-track' className='btn btn-light'>
          <i className='fas fa-file-audio text-primary' /> Edit Track
        </Link>
      </div>
    </ul>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>My Tracks</h2>
      <div>{tracks}</div>
    </Fragment>
  );
};

Track.propTypes = {
  track: PropTypes.array.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  deleteCloudinary: PropTypes.func.isRequired,
};

export default connect(null, { deleteTrack, deleteCloudinary })(Track);
