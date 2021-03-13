import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAlbum } from '../../actions/profile';

const AddAlbum = ({ addAlbum, history }) => {
  const [inputList, setInputList] = useState([
    { name: '', audio: null, audioPublicId: null },
  ]);

  //const { audio, audioPublicId } = inputList;
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    about: '',
    art: null,
    artPublicId: null,
    tracks: [],
  });

  const [disableImageUploadBtn, setDisableImageBtn] = useState(false);
  const [disableAudioUploadBtn, setDisableAudioBtn] = useState(false);

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

  const { name, price, about, art, tracks } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ ...formData, art: e.target.files[0] });
  };

  const onChangeAudio = (e, index) => {
    const list = [...inputList];
    list[index]['name'] = e.target.value;
    list[index]['audio'] = e.target.files[0];
    list[index]['audioPublicId'] = null;
    setInputList(list);
    //setFormData({ ...formData, tracks: inputList });
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { audio: null, audioPublicId: null }]);
  };

  const onUploadImage = () => {
    setDisableImageBtn({ disableImageUploadBtn: true });
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

  const onUploadAudio = (e, index) => {
    const form = new FormData();
    const list = [...inputList];
    form.append('file', list[index]['audio']);
    form.append('upload_preset', 'racoon6_preset');
    const options = {
      method: 'POST',
      body: form,
    };

    return fetch('https://api.cloudinary.com/v1_1/racoon6/raw/upload', options)
      .then((res) => res.json())
      .then((res) => {
        list[index]['audio'] = res.secure_url;
        list[index]['audioPublicId'] = res.public_id;
        setInputList(list);
        setFormData({
          ...formData,
          tracks: inputList,
        });
        setAudioCkeckUploadState({
          ...audioUploadCheck,
          classAudioCheckName: 'fas fa-check',
          audioUploaded: 'Done!',
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
            <i style={{ marginTop: '25px' }} className='fas fa-user' /> Add an
            album
          </p>
        </div>
      </div>
      <div className='ui center aligned three column grid'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addAlbum(formData, history);
          }}
        >
          <div className='form-group'>
            <label>* Album name</label>
            <input type='text' name='name' value={name} onChange={onChange} />
          </div>
          <div className='form-group'>
            <label>* Price</label>
            <input type='text' name='price' value={price} onChange={onChange} />
          </div>
          <div className='form-group'>
            <label>About this album</label>
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
          {inputList.map((x, i) => {
            return (
              <div key={i} className='form-group'>
                <div className='ui segment'>
                  <label>* Track name</label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    placeholder='track name'
                    onChange={onChange}
                  />
                  <small className='form-text'>Audio - mp3 only</small>
                  <div>
                    <input
                      type='file'
                      name='file'
                      accept='.mp3'
                      onChange={(e) => onChangeAudio(e, i)}
                    />
                    <button
                      type='button'
                      className='btn btn-primary my-1'
                      disabled={disableAudioUploadBtn}
                      onClick={(e) => onUploadAudio(e, i)}
                    >
                      Upload Audio
                    </button>
                    <i className={classAudioCheckName}> {audioUploaded}</i>
                    <div>
                      {inputList.length !== 1 && (
                        <button
                          type='button'
                          className='ui button'
                          onClick={() => handleRemoveClick(i)}
                        >
                          Remove
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button
                          type='button'
                          className='ui button'
                          onClick={handleAddClick}
                        >
                          Add track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/artist/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

AddAlbum.propTypes = {
  addAlbum: PropTypes.func.isRequired,
};

export default connect(null, { addAlbum })(AddAlbum);
