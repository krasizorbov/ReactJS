import { useState, useEffect, Fragment } from 'react';
import Player from '../multiplayer/Player';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Album = ({ album }) => {
  const songs = []; //To Do useState()

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  const albums = album.map((a) => (
    <ul key={a._id}>
      <div className='ui three column grid'>
        <div className='ui segment'>
          <div style={{ marginBottom: '15px' }}>{a.name}</div>
          <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            songs={a.tracks.map((t) => ({
              img_src: a.art,
              songName: t.name,
              audio: t.audio,
              albumName: a.name,
            }))}
          />

          <div className='crop' style={{ marginTop: '15px' }}>
            <img src={a.art} alt='' />
          </div>
        </div>
      </div>
      <div
        className='dash-buttons'
        style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '30px' }}
      >
        <Link to='/buy-track' className='btn btn-light btn-sm'>
          <i className='fas fa-file-audio text-primary' /> Buy
        </Link>
      </div>
    </ul>
  ));

  return (
    <Fragment>
      <div>{albums}</div>
    </Fragment>
  );
};

Album.propTypes = {
  album: PropTypes.array.isRequired,
};
export default connect(null)(Album);
