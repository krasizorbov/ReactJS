import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';

const AddTrack = ({ addTrack, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    about: '',
    art: null,
    audio: null,
  });

  const { name, price, about, art, audio } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ art: e.target.files[0] });
  };

  const onChangeAudio = (e) => {
    setFormData({ audio: e.target.files[0] });
  };

  const onUploadImage = () => {
    const form = new FormData();
    form.append('file', art);
    form.append('upload_preset', 'racoon6_preset');
    const options = {
      method: 'POST',
      body: form,
    };

    return fetch('https://api.cloudinary.com/v1_1/racoon6/raw/upload', options)
      .then((res) => res.json())
      .then((res) => {
        setFormData({
          art: res.secure_url,
        });
      })
      .catch((err) => console.log(err));
  };

  const onUploadAudio = () => {
    const form = new FormData();
    form.append('file', audio);
    form.append('upload_preset', 'racoon6_preset');
    const options = {
      method: 'POST',
      body: form,
    };

    return fetch('https://api.cloudinary.com/v1_1/racoon6/raw/upload', options)
      .then((res) => res.json())
      .then((res) => {
        setFormData({
          audio: res.secure_url,
        });
      })
      .catch((err) => console.log(err));
  };
  console.log(formData);
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
            <small className='form-text'>* Track name</small>
            <input type='text' name='name' value={name} onChange={onChange} />
          </div>
          <div className='form-group'>
            <small className='form-text'>Price</small>
            <input type='text' name='price' value={price} onChange={onChange} />
            <small className='form-text'>
              Optional, default value is $0.99
            </small>
          </div>
          <div className='form-group'>
            <small className='form-text'>About this track</small>
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
            <small className='form-text'>* Art</small>
            <input type='file' name='file' onChange={onChangeImage} />
            <button
              type='button'
              className='btn btn-primary my-1'
              onClick={onUploadImage}
            >
              Upload Image
            </button>
          </div>
          <div className='form-group'>
            <small className='form-text'>* Audio</small>
            <input type='file' name='file' onChange={onChangeAudio} />
            <button
              type='button'
              className='btn btn-primary my-1'
              onClick={onUploadAudio}
            >
              Upload Audio
            </button>
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
