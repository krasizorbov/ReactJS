import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/artist/add-track' className='btn btn-light'>
        <i className='fas fa-file-audio text-primary' /> Add Track
      </Link>
      <Link to='/artist/add-album' className='btn btn-light'>
        <i className='fas fa-compact-disc text-primary' /> Add Album
      </Link>
    </div>
  );
};

export default DashboardActions;
