import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';

const AddTrack = ({ addTrack, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    about: '',
  });

  const [art, setFileImage] = useState(null);
  const [audio, setFileAudio] = useState(null);
  formData['art'] = art;
  formData['audio'] = audio;

  const { name, price, about } = formData;
  console.log(formData);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => setFileImage({ art: e.target.files[0] });

  const onChangeAudio = (e) => setFileAudio({ audio: e.target.files[0] });

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
            <small className='form-text'>* Upload art</small>
            <input type='file' name='file' onChange={onChangeImage} />
          </div>
          <div className='form-group'>
            <small className='form-text'>* Upload audio</small>
            <input type='file' name='file' onChange={onChangeAudio} />
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
