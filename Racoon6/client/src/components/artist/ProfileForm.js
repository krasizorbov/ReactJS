import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  bandName: '',
  location: '',
  website: '',
  email: '',
  genre: '',
  genreTags: '',
  paypalEmail: '',
  art: null,
  artPublicId: null,
  youtube: '',
  facebook: '',
  instagram: '',
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const [disableImageUploadBtn, setDisableImageUploadBtn] = useState(true);
  const [disableImageFileBtn, setDisableImageFileBtn] = useState(false);

  const [imageUploadCheck, setImageCkeckUploadState] = useState({
    classImageCheckName: '',
    imageUploaded: '',
  });

  const { classImageCheckName, imageUploaded } = imageUploadCheck;

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.genreTags))
        profileData.genreTags = profileData.genreTags.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    bandName,
    location,
    website,
    email,
    genre,
    genreTags,
    paypalEmail,
    art,
    youtube,
    facebook,
    instagram,
  } = formData;

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
    createProfile(formData, history, profile ? true : false);
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
                  Upload Image
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
            <label>* Artist/Band name</label>
            <input
              type='text'
              name='bandName'
              value={bandName || ''}
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
            <label>* Email</label>
            <input
              type='email'
              name='email'
              value={email || ''}
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <label>* Genre</label>
            <select name='genre' value={genre || ''} onChange={onChange}>
              <option>Select Genre</option>
              <option value='Country'>Country</option>
              <option value='Electronic'>Electronic</option>
              <option value='Funk'>Funk</option>
              <option value='Pop'>Pop</option>
              <option value='Reggae'>Reggae</option>
              <option value='Rock'>Rock</option>
            </select>
          </div>

          <div className='form-group'>
            <label>Genre Tag(s)</label>
            <input
              type='text'
              placeholder='Dance, Rock, Pop'
              name='genreTags'
              value={genreTags || ''}
              onChange={onChange}
            />
            <small className='form-text'>
              Please use comma separated values (eg. Dance,Rock,Pop)
            </small>
          </div>

          <div className='form-group'>
            <label>* PayPal Email</label>
            <input
              type='email'
              name='paypalEmail'
              value={paypalEmail || ''}
              onChange={onChange}
            />
          </div>

          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-light'
            >
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className='form-group social-input'>
                <i className='fab fa-twitter fa-2x' />
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube || ''}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-facebook fa-2x' />
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook || ''}
                  onChange={onChange}
                />
              </div>

              <div className='form-group social-input'>
                <i className='fab fa-instagram fa-2x' />
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram || ''}
                  onChange={onChange}
                />
              </div>
            </Fragment>
          )}

          <input type='submit' className='btn btn-primary my-1' />
          <Link to='/artist/dashboard' className='btn btn-light my-1'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
