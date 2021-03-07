import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterArtist from '../auth/RegisterArtist';
import RegisterFan from '../auth/RegisterFan';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../artist/Dashboard';
// import ProfileForm from '../profile-forms/ProfileForm';
// import AddExperience from '../profile-forms/AddExperience';
// import AddEducation from '../profile-forms/AddEducation';
// import Profiles from '../profiles/Profiles';
import ProfileForm from '../artist/ProfileForm';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = ({ auth: { isAuthenticated, user } }) => {
  console.log(user);
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register/artist' component={RegisterArtist} />
        <Route exact path='/register/fan' component={RegisterFan} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute
          exact
          path={user ? `/${user.bandName}/dashboard` : '/dashboard'}
          component={Dashboard}
        />

        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        {/* <Route exact path='/profiles' component={Profiles} />
        
        <Route exact path='/profile/:id' component={Profile} />
        
        
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Routes);
