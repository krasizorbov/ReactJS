import { React, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profile/ProfileItem';
import { getProfiles } from '../../actions/profile';

const Landing = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className='landing'>
            <div className='dark-overlay'>
              <div className='landing-inner'>
                <div className='profiles'>
                  {profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  ) : (
                    <h4>No profiles found...</h4>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Landing);
