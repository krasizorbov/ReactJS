import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import { updateTrack, getCurrentProfile } from '../../actions/profile';

const initialState = {
  name: '',
  price: '',
  about: '',
  art: null,
  artPublicId: null,
  audio: null,
  audioPublicId: null,
};

const EditTrack = ({
  getCurrentProfile,
  match,
  profile: { profile, loading },
  updateTrack,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      let trackToUpdate = profile.tracks.find(
        (t) => t._id.toString() === match.params.id.toString()
      );
      if (trackToUpdate) {
        const trackData = { ...initialState };
        for (const key in trackToUpdate) {
          if (key in trackData) trackData[key] = trackToUpdate[key];
        }
        setFormData(trackData);
      } else {
        //ToDo: display error message
      }
    }
  }, [getCurrentProfile, loading, profile, match.params.id]);

  const [disableImageUploadBtn, setDisableImageUploadBtn] = useState(true);
  const [disableImageFileBtn, setDisableImageFileBtn] = useState(false);
  const [disableAudioUploadBtn, setDisableAudioUploadBtn] = useState(true);
  const [disableAudioFileBtn, setDisableAudioFileBtn] = useState(false);

  const [imageUploadCheck, setImageCkeckUploadState] = useState({
    classImageCheckName: '',
    imageUploaded: '',
  });

  const [audioUploadCheck, setAudioCkeckUploadState] = useState({
    classAudioCheckName: '',
    audioUploaded: '',
  });

  const { classImageCheckName, imageUploaded } = imageUploadCheck;

  const { classAudioCheckName, audioUploaded } = audioUploadCheck;

  const { name, price, about, art, audio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ ...formData, art: e.target.files[0] });
    setDisableImageUploadBtn((prevState) => !prevState);
  };

  const onChangeAudio = (e) => {
    setFormData({ ...formData, audio: e.target.files[0] });
    setDisableAudioUploadBtn((prevState) => !prevState);
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

  const onUploadAudio = () => {
    setDisableAudioFileBtn({ disableAudioFileBtn: true });
    setDisableAudioUploadBtn({ disableAudioUploadBtn: true });
    const form = new FormData();
    form.append('file', audio);
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
          audio: res.secure_url,
          audioPublicId: res.public_id,
        });
        setAudioCkeckUploadState({
          ...audioUploadCheck,
          classAudioCheckName: 'fas fa-check',
          audioUploaded: 'Done!',
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className='ui center aligned three column grid'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            updateTrack(formData, match.params.id, history);
          }}
        >
          <div className='form-group'>
            <label>* Track name</label>
            <input type='text' name='name' value={name} onChange={onChange} />
          </div>
          <div className='form-group'>
            <label>* Price</label>
            <input type='text' name='price' value={price} onChange={onChange} />
          </div>
          <div className='form-group'>
            <label>About this track</label>
            <textarea
              type='text'
              rows='4'
              cols='50'
              name='about'
              value={about}
              onChange={onChange}
            />
          </div>
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
                  Replace
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
            <div className='ui segment'>
              <label>* Audio - MP3 files only</label>
              <div>
                <input
                  type='file'
                  name='file'
                  accept='.mp3'
                  disabled={disableAudioFileBtn}
                  onChange={onChangeAudio}
                />
                <button
                  type='button'
                  className='btn btn-primary my-1'
                  disabled={disableAudioUploadBtn}
                  onClick={onUploadAudio}
                >
                  Replace
                </button>
                <i className={classAudioCheckName}> {audioUploaded}</i>
              </div>
            </div>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link to='/artist/dashboard' className='btn btn-light my-1'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditTrack.propTypes = {
  updateTrack: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { updateTrack, getCurrentProfile })(
  EditTrack
);
