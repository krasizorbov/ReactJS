import React from 'react';

function Details(props) {
  return (
    <div className='c-player--details'>
      {/* <div className='details-img'>
        <img src={props.song.img_src} alt='' />
      </div> */}
      <h3 className='details-title'>{props.song.songName}</h3>
      <h4 className='details-artist'>{props.song.albumName}</h4>
    </div>
  );
}

export default Details;
