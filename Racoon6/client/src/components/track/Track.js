import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteCloudinaryTrack,
  deleteTrack,
  paypal,
} from '../../actions/profile';

const Track = ({ track, deleteTrack }) => {
  const tracks = track.map((t) => (
    <ul key={t._id}>
      <div className='ui three column grid'>
        <div className='ui segment'>
          <li className='reframe'>
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
        </div>
      </div>
      <div
        className='dash-buttons'
        style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '30px' }}
      >
        <button
          onClick={() => {
            deleteTrack(t._id);
            deleteCloudinaryTrack(t.artPublicId, t.audioPublicId);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
        <Link to={`/artist/edit-track/${t._id}`} className='btn btn-light'>
          <i className='fas fa-file-audio text-primary' /> Edit
        </Link>
        <button
          onClick={() => {
            paypal();
          }}
          className='btn btn-light'
        >
          <i className='fas fa-file-audio text-primary' /> Buy
        </button>
      </div>
    </ul>
  ));

  return (
    <Fragment>
      <h3 className='my-2'>My Tracks</h3>
      <div>{tracks}</div>
    </Fragment>
  );
};

Track.propTypes = {
  track: PropTypes.array.isRequired,
  deleteTrack: PropTypes.func.isRequired,
  paypal: PropTypes.func.isRequired,
  deleteCloudinaryTrack: PropTypes.func.isRequired,
};

export default connect(null, { deleteTrack, paypal, deleteCloudinaryTrack })(
  Track
);
