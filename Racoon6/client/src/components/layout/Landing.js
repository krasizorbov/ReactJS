import { React, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';

const Landing = ({ getProfiles }) => {
  useEffect(() => {
    getProfiles();
  });
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'></div>
      </div>
    </section>
  );
};

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(null, { getProfiles })(Landing);
