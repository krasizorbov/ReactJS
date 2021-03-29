import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Track = ({ track }) => {
  const tracks = track.map((t) => (
    <ul key={t._id}>
      <div className='ui three column grid'>
        <div className='ui segment'>
          <li className='reframe'>
            <div>Track - {t.name}</div>
            <div className='crop' style={{ marginTop: -40, marginBottom: -20 }}>
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
        style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '-15px' }}
      >
        <Link to='/buy-track' className='btn btn-light'>
          <i className='fas fa-file-audio text-primary' /> Buy
        </Link>
      </div>
    </ul>
  ));

  return (
    <Fragment>
      <div>{tracks}</div>
    </Fragment>
  );
};

Track.propTypes = {
  track: PropTypes.array.isRequired,
};

export default connect(null)(Track);
