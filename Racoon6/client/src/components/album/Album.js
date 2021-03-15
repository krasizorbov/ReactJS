import { useState, useEffect, Fragment } from 'react';
import Player from '../multiplayer/Player';
//import './index.css';
import { Link } from 'react-router-dom';
//import ReactAudioPlayer from 'react-audio-player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCloudinary, deleteAlbum } from '../../actions/profile';

const Album = ({ album, deleteAlbum }) => {
  const songs = [];

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
      <div className='Album'>
        <div className='ui segment'>
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
        </div>
        <div className='details-img'>
          <img src={a.art} alt='' />
        </div>
      </div>
      <div
        className='dash-buttons'
        style={{ marginTop: '15px', marginBottom: '20px' }}
      >
        <button
          onClick={() => {
            //deleteAlbum(a._id);
            //deleteCloudinary(a.artPublicId, t.audioPublicId);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
        <Link to='/edit-track' className='btn btn-light'>
          <i className='fas fa-file-audio text-primary' /> Edit Album
        </Link>
        <Link to='/buy-track' className='btn btn-light'>
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
  deleteAlbum: PropTypes.func.isRequired,
  deleteCloudinary: PropTypes.func.isRequired,
};
export default connect(null, { deleteAlbum, deleteCloudinary })(Album);
