import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/default.json';
import { updateAlbum, getCurrentProfile } from '../../actions/profile';

const initialState = {
  name: '',
  price: '',
  about: '',
  art: null,
  artPublicId: null,
  tracks: [],
};

const EditAlbum = ({
  updateAlbum,
  getCurrentProfile,
  match,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  const [inputList, setInputList] = useState([
    {
      name: '',
      audio: null,
      audioPublicId: null,
      disableAudioFileBtn: false,
      disableAudioUploadBtn: true,
      checkMark: '',
      done: '',
    },
  ]);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      let albumToUpdate = profile.albums.find(
        (a) => a._id.toString() === match.params.id.toString()
      );
      if (albumToUpdate) {
        const albumData = { ...initialState };
        for (const key in albumToUpdate) {
          if (key in albumData) {
            if (key === 'tracks') {
              setInputList(albumToUpdate[key]);
            }
            albumData[key] = albumToUpdate[key];
          }
        }
        setFormData(albumData);
      } else {
        //ToDo: display error message
      }
    }
  }, [getCurrentProfile, loading, profile, match.params.id]);

  const [disableImageUploadBtn, setDisableImageUploadBtn] = useState(true);
  const [disableImageFileBtn, setDisableImageFileBtn] = useState(false);

  const [imageUploadCheck, setImageCkeckUploadState] = useState({
    classImageCheckName: '',
    imageUploaded: '',
  });

  const { classImageCheckName, imageUploaded } = imageUploadCheck;

  const { name, price, about, art } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    setFormData({ ...formData, art: e.target.files[0] });
    setDisableImageUploadBtn((prevState) => !prevState);
  };

  const onChangeTrackName = (e, index) => {
    const list = [...inputList];
    list[index]['name'] = e.target.value;
    setInputList(list);
  };

  const onChangeAudio = (e, index) => {
    const list = [...inputList];
    list[index]['audio'] = e.target.files[0];
    list[index]['audioPublicId'] = null;
    list[index]['disableAudioUploadBtn'] = false;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setFormData({ ...formData, tracks: list });
  };

  // handle click event of the Add track button
  const handleAddClick = () => {
    setInputList([...inputList, { audio: null, audioPublicId: null }]);
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

  const onUploadAudio = (e, index) => {
    const form = new FormData();
    const list = [...inputList];
    list[index]['disableAudioUploadBtn'] = true;
    list[index]['disableAudioFileBtn'] = true;
    form.append('file', list[index]['audio']);
    form.append('upload_preset', config.upload_preset);
    setInputList(list);
    const options = {
      method: 'POST',
      body: form,
    };

    return fetch(config.cloudinaryURL, options)
      .then((res) => res.json())
      .then((res) => {
        list[index]['audio'] = res.secure_url;
        list[index]['audioPublicId'] = res.public_id;
        list[index]['checkMark'] = 'fas fa-check';
        list[index]['done'] = 'Done!';
        setInputList(list);
        setFormData({
          ...formData,
          tracks: inputList,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <div className='ui center aligned three column grid'>
        <div>
          <p className='lead'>
            <i style={{ marginTop: '25px' }} className='fas fa-user' /> Edit
            album
          </p>
        </div>
      </div>
      <div className='ui center aligned three column grid'>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            updateAlbum(formData, match.params.id, history);
          }}
        >
          <div className='form-group'>
            <label>* Album name</label>
            <input
              type='text'
              name='name'
              value={name || ''}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>* Price</label>
            <input
              type='text'
              name='price'
              value={price || ''}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label>About this album</label>
            <textarea
              type='text'
              rows='4'
              cols='50'
              name='about'
              value={about || ''}
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
          {inputList.map((x, i) => {
            return (
              <div key={i} className='form-group'>
                <div className='ui segment'>
                  <label>* Track name</label>
                  <input
                    type='text'
                    name='name'
                    value={x.name || ''}
                    placeholder='track name'
                    onChange={(e) => onChangeTrackName(e, i)}
                  />
                  <small className='form-text'>Audio - mp3 only</small>
                  <div>
                    <input
                      type='file'
                      name='file'
                      accept='.mp3'
                      disabled={x.disableAudioFileBtn}
                      onChange={(e) => onChangeAudio(e, i)}
                    />
                    <button
                      type='button'
                      className='btn btn-primary my-1'
                      disabled={x.disableAudioUploadBtn}
                      onClick={(e) => onUploadAudio(e, i)}
                    >
                      Replace
                    </button>
                    <i className={x.checkMark}> {x.done}</i>
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
          <Link to='/artist/dashboard' className='btn btn-light my-1'>
            Go Back
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

EditAlbum.propTypes = {
  updateAlbum: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { updateAlbum, getCurrentProfile })(
  EditAlbum
);
