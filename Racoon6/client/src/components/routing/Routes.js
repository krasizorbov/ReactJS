import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import RegisterArtist from '../auth/RegisterArtist';
import RegisterFan from '../auth/RegisterFan';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import ArtistDashboard from '../artist/ArtistDashboard';
import FanDashboard from '../fan/FanDashboard';
import AddTrack from '../artist/AddTrack';
import AddAlbum from '../artist/AddAlbum';
import ProfileForm from '../artist/ProfileForm';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = ({ auth: { isAuthenticated, user } }) => {
  let isArtist = '';
  if (user !== null) {
    if (user.bandName !== undefined && isAuthenticated) {
      isArtist = true;
    } else {
      isArtist = false;
    }
  }
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register/artist' component={RegisterArtist} />
        <Route exact path='/register/fan' component={RegisterFan} />
        <Route exact path='/login' component={Login} />
        {isArtist === true ? (
          <PrivateRoute
            exact
            path={`/${user.bandName}/dashboard`}
            component={ArtistDashboard}
          />
        ) : null}
        <PrivateRoute exact path='/fan/dashboard' component={FanDashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        {isArtist === true ? (
          <PrivateRoute
            exact
            path={`/${user.bandName}/edit-profile`}
            component={ProfileForm}
          />
        ) : null}
        {isArtist === true ? (
          <PrivateRoute
            exact
            path={`/${user.bandName}/add-track`}
            component={AddTrack}
          />
        ) : null}
        {isArtist === true ? (
          <PrivateRoute
            exact
            path={`/${user.bandName}/add-album`}
            component={AddAlbum}
          />
        ) : null}
        {/* <Route exact path='/profiles' component={Profiles} />
        
        <Route exact path='/profile/:id' component={Profile} />
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
