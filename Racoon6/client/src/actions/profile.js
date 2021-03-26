import api from '../utils/api';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PAYPAL,
  //GET_REPOS,
  //NO_REPOS,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/artist');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profiles/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  //dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get('/profiles');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post('/profile/artist', formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/artist/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Track
export const addTrack = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/artist/track', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Track Added', 'success'));

    history.push('/artist/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update track
export const updateTrack = (formData, trackId, history) => async (dispatch) => {
  try {
    const res = await api.post(`/profile/artist/track/${trackId}`, formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push('/artist/dashboard');
    dispatch(setAlert('Track Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Album
export const addAlbum = (formData, history) => async (dispatch) => {
  try {
    const res = await api.put('/profile/artist/album', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Album Added', 'success'));

    history.push('/artist/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update album
export const updateAlbum = (formData, albumId, history) => async (dispatch) => {
  try {
    const res = await api.post(`/profile/artist/album/${albumId}`, formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push('/artist/dashboard');
    dispatch(setAlert('Album Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Track
export const deleteTrack = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`profile/artist/track/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Track Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Album
export const deleteAlbum = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`profile/artist/album/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Album Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Cloudinary Track Data
export const deleteCloudinaryTrack = async (artPublicId, audioPublicId) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    const data = [{ public_id: artPublicId }, { public_id: audioPublicId }];
    try {
      await api
        .post('/cloudinary', data)
        .then((res) => console.log('Data send'))
        .catch((err) => console.log(err.data));
    } catch (err) {
      console.log(err);
    }
  }
};

// Delete Cloudinary Album Data
export const deleteCloudinaryAlbum = async (artPublicId, tracks) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    const data = tracks.map((t) => ({ public_id: t.audioPublicId }));
    data.push({ public_id: artPublicId });
    try {
      await api
        .post('/cloudinary', data)
        .then((res) => console.log('Data send'))
        .catch((err) => console.log(err.data));
    } catch (err) {
      console.log(err);
    }
  }
};

// PayPal Payment
export const paypal = async () => {
  try {
    // const formData = {
    //   intent: 'sale',
    //   payer: {
    //     payment_method: 'paypal',
    //   },
    //   redirect_urls: {
    //     return_url: 'http://localhost:3000/success',
    //     cancel_url: 'http://localhost:3000/cancel',
    //   },
    //   transactions: [
    //     {
    //       item_list: {
    //         items: [
    //           {
    //             name: 'Into the void',
    //             sku: '001',
    //             price: 25.0,
    //             currency: 'USD',
    //             quantity: 1,
    //           },
    //         ],
    //       },
    //       amount: {
    //         currency: 'USD',
    //         total: 25.0,
    //       },
    //       description: 'Great Song',
    //     },
    //   ],
    // };
    // const res = await api.post('/pay', formData);
    // window.location = res.data.forwardLink;
    // res.redirect('/success');
    //console.log(result);
    //history.push(res.data);
    //dispatch(setAlert('Album Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile/artist');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
