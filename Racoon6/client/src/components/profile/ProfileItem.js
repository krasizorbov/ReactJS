import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    artist: { _id, name },
    bandName,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img
        src='https://image.shutterstock.com/image-photo/music-band-group-silhouette-perform-260nw-1505018000.jpg'
        alt=''
        className='round-img'
      />
      <div>
        {/* <h2>{name}</h2> */}
        <h3>{bandName}</h3>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
