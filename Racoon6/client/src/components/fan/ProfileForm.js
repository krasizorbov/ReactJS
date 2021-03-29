import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import {
  createFanProfile,
  getCurrentFanProfile,
} from '../../actions/fanProfile';

const initialState = {
  name: '',
  location: '',
  website: '',
  art: null,
  artPublicId: null,
  about: '',
};

const ProfileForm = ({
  fanProfile: { fanProfile, loading },
  createFanProfile,
  getCurrentFanProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [disableImageUploadBtn, setDisableImageUploadBtn] = useState(true);
  const [disableImageFileBtn, setDisableImageFileBtn] = useState(false);

  const [imageUploadCheck, setImageCkeckUploadState] = useState({
    classImageCheckName: '',
    imageUploaded: '',
  });

  const { classImageCheckName, imageUploaded } = imageUploadCheck;

  useEffect(() => {
    if (!fanProfile) getCurrentFanProfile();
    if (!loading && fanProfile) {
      const profileData = { ...initialState };
      for (const key in fanProfile) {
        if (key in profileData) profileData[key] = fanProfile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentFanProfile, fanProfile]);

  const { name, location, website, art, about } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ ...formData, art: e.target.files[0] });
    setDisableImageUploadBtn((prevState) => !prevState);
  };

  const onUploadImage = () => {
    setDisableImageUploadBtn({ disableImageUploadBtn: true });
    setDisableImageFileBtn({ disableImageFileBtn: true });
    const form = new FormData();
    form.append('file', art);
    form.append('upload_preset', config.upload_preset);
    const options = {
      method: 'POST',
      body: form,
    };

    return fetch(config.cloudinaryURL, options)
      .then((res) => res.json())
      .then((res) => {
        setFormData({
          ...formData,
          art: res.secure_url,
          artPublicId: res.public_id,
        });
        setImageCkeckUploadState({
          ...imageUploadCheck,
          classImageCheckName: 'fas fa-check',
          imageUploaded: 'Done!',
        });
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createFanProfile(formData, history, fanProfile ? true : false);
  };

  return (
    <Fragment>
      <div className='ui center aligned three column grid'>
        <div>
          <p className='lead'>
            <i style={{ marginTop: '25px' }} className='fas fa-user' /> Add some
            changes to your profile
          </p>
        </div>
      </div>
      <div className='ui center aligned three column grid'>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <div className='ui segment'>
              <label>* Art - 1400 x 1400 pixels minimum</label>
              <div>
                <input
                  type='file'
                  name='file'
                  disabled={disableImageFileBtn}
                  onChange={onChangeImage}
                />
                <button
                  type='button'
                  className='btn btn-primary my-1'
                  disabled={disableImageUploadBtn}
                  onClick={onUploadImage}
                >
                  Update Image
                </button>
                <i className={classImageCheckName}> {imageUploaded}</i>
              </div>
              <div>
                {imageUploaded && (
                  <img
                    src={art}
                    style={{
                      marginLeft: '-175px',
                      marginTop: '50px',
                      width: '100px',
                      height: '100px',
                    }}
                    alt='art'
                  />
                )}
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label>* Name</label>
            <input
              type='text'
              name='name'
              value={name || ''}
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <label>Location</label>
            <input
              type='text'
              name='location'
              value={location || ''}
              onChange={onChange}
            />

            <div className='form-group'>
              <label>Website</label>
              <input
                type='text'
                name='website'
                value={website || ''}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>About</label>
            <textarea
              type='text'
              rows='4'
              cols='50'
              name='about'
              value={about}
              onChange={onChange}
            />
          </div>

          <input type='submit' className='btn btn-primary my-1' />
          <Link to='/fan/dashboard' className='btn btn-light my-1'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createFanProfile: PropTypes.func.isRequired,
  getCurrentFanProfile: PropTypes.func.isRequired,
  fanProfile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fanProfile: state.fanProfile,
});

export default connect(mapStateToProps, {
  createFanProfile,
  getCurrentFanProfile,
})(ProfileForm);
