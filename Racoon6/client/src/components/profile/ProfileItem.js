import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, artist, bandName },
  },
}) => {
  return (
    <div className='profile bg-light'>
      <h2>{artist.name}</h2>
      <img src={avatar} alt='Missing Image' className='round-img' />
      <div>
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
