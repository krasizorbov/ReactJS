import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/fan/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/fan/collections' className='btn btn-light'>
        <i className='fas fa-file-audio text-primary' /> Collections
      </Link>
    </div>
  );
};

export default DashboardActions;
