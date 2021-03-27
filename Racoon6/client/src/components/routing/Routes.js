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
import AddTrack from '../track/AddTrack';
import EditTrack from '../track/EditTrack';
import AddAlbum from '../album/AddAlbum';
import EditAlbum from '../album/EditAlbum';
import ProfileForm from '../artist/ProfileForm';
import FanProfileForm from '../fan/ProfileForm';
import Releases from '../release/Releases';
import Payment from '../paypal/Payment';
// import Posts from '../posts/Posts';
// import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = ({ auth: { isAuthenticated, user } }) => {
  let isArtist = false;
  if (user !== null) {
    if (user.bandName !== undefined && isAuthenticated) {
      isArtist = true;
    }
  }
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register/artist' component={RegisterArtist} />
        <Route exact path='/register/fan' component={RegisterFan} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute
          exact
          path='/artist/dashboard'
          component={ArtistDashboard}
        />
        <PrivateRoute exact path='/fan/dashboard' component={FanDashboard} />
        {isArtist ? (
          <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        ) : (
          <PrivateRoute
            exact
            path='/create-fan-profile'
            component={FanProfileForm}
          />
        )}

        <PrivateRoute
          exact
          path='/artist/edit-profile'
          component={ProfileForm}
        />
        <PrivateRoute exact path='/artist/add-track' component={AddTrack} />
        <PrivateRoute
          exact
          path='/artist/edit-track/:id'
          component={EditTrack}
        />
        <PrivateRoute exact path='/artist/add-album' component={AddAlbum} />
        <PrivateRoute
          exact
          path='/artist/edit-album/:id'
          component={EditAlbum}
        />
        <PrivateRoute exact path='/buy-track/' component={Payment} />
        <Route exact path='/profiles/:id' component={Releases} />

        {/* 
        <Route exact path='/profiles/:id' component={Profile} />
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
