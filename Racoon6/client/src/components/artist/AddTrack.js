import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import { addTrack } from '../../actions/profile';

const AddTrack = ({ addTrack, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    about: '',
    art: null,
    artPublicId: null,
    audio: null,
    audioPublicId: null,
  });

  const [disableImageUploadBtn, setDisableImageBtn] = useState(true);
  const [disableAudioUploadBtn, setDisableAudioBtn] = useState(true);

  const [imageUploadCheck, setImageCkeckUploadState] = useState({
    classImageCheckName: '',
    imageUploaded: '',
  });

  const { classImageCheckName, imageUploaded } = imageUploadCheck;

  const [audioUploadCheck, setAudioCkeckUploadState] = useState({
    classAudioCheckName: '',
    audioUploaded: '',
  });

  const { classAudioCheckName, audioUploaded } = audioUploadCheck;

  const { name, price, about, art, audio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ ...formData, art: e.target.files[0] });
    setDisableImageBtn((prevState) => !prevState);
  };

  const onChangeAudio = (e) => {
    setFormData({ ...formData, audio: e.target.files[0] });
    setDisableAudioBtn((prevState) => !prevState);
  };

  const onUploadImage = () => {
    setDisableImageBtn({ disableImageUploadBtn: true });
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
    setDisableAudioBtn({ disableAudioUploadBtn: true });
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
                <input type='file' name='file' onChange={onChangeImage} />
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
          <Link className='btn btn-light my-1' to='/artist/dashboard'>
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
