import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    artist: { _id },
    bandName,
    art,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={art} alt='' className='round-img' />
      <div>
        <h3>{bandName}</h3>
        <Link to={`/profiles/${_id}`} className='btn btn-primary'>
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
