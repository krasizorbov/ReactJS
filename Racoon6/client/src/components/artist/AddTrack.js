import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import { addTrack } from '../../actions/profile';

const AddTrack = ({ addTrack, history }) => {
  let dashboardHistory = useHistory();
  const goToPreviousPath = () => {
    dashboardHistory.goBack();
  };

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    about: '',
    art: null,
    artPublicId: null,
    audio: null,
    audioPublicId: null,
  });

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
        <div>
          <p className='lead'>
            <i style={{ marginTop: '25px' }} className='fas fa-user' /> Add a
            single track
          </p>
        </div>
      </div>
      <div className='ui center aligned three column grid'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addTrack(formData, history);
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
                  Upload Audio
                </button>
                <i className={classAudioCheckName}> {audioUploaded}</i>
              </div>
            </div>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' onClick={goToPreviousPath}>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddTrack.propTypes = {
  addTrack: PropTypes.func.isRequired,
};

export default connect(null, { addTrack })(AddTrack);
