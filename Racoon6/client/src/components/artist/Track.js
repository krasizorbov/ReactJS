import React, { Fragment } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { deleteExperience } from '../../actions/profile';

const Track = ({ track }) => {
  const tracks = track.map((t) => (
    <ul>
      <li className='reframe' key={t._id}>
        <div>{t.name}</div>
        <div className='crop'>
          <img src={t.art} alt='Not Found' />
        </div>
      </li>
      <li>
        <div style={{ marginTop: '15px' }}>
          <ReactAudioPlayer src={t.audio} autoPlay={false} controls />
        </div>
      </li>
      <div style={{ marginTop: '15px', marginBottom: '20px' }}>
        <button
          //onClick={() => deleteExperience(t._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
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
  //deleteExperience: PropTypes.func.isRequired,
};

export default connect(null)(Track);
