const express = require('express');
// const axios = require('axios');
// const request = require('request');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/ArtistProfile');
const Artist = require('../../models/Artist');
const User = require('../../models/User');

// route  GET api/profile/artist/
// des    GET current artist profile
// access Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      artist: req.user.id,
    }).populate('artist', ['bandName']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// route    POST api/profile/artist
// des      Create or update artist profile
// access   Private
router.post(
  '/',
  auth,
  check('bandName', 'Band name is required').not().isEmpty(),
  check('genre', 'Genre is required').not().isEmpty(),
  check('paypalEmail', 'Please include a valid email.').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      location,
      website,
      email,
      genreTags,
      youtube,
      facebook,
      instagram,

      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // check for genre tags if any
    if (genreTags !== undefined) {
      Array.isArray(genreTags)
        ? genreTags
        : genreTags.split(',').map((tag) => ' ' + tag.trim());
    }

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : null,
      genreTags,
      location,
      email,
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, facebook, instagram };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { artist: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// route    GET api/profile/artist/:artist_id
// des      Get profile by artist ID
// access   Public
router.get(
  '/:artist_id',
  checkObjectId('artist_id'),
  async ({ params: { artist_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        artist: artist_id,
      }).populate('artist', ['bandName']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// route    DELETE api/profile/artist
// des      Delete profile and artist
// access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    //await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ artist: req.user.id });
    // Remove user
    await User.findOneAndRemove({ name: req.user.username });
    // Remove artist
    await Artist.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// route    PUT api/profile/artist/track
// des      Add profile track
// access   Private
router.put(
  '/track',
  auth,
  check('name', 'Track name is required').not().isEmpty(),
  check('price', 'Price is required')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Number is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      price,
      about,
      art,
      artPublicId,
      audio,
      audioPublicId,
    } = req.body;

    const track = {
      name,
      price,
      about,
      art,
      artPublicId,
      audio,
      audioPublicId,
    };

    try {
      const profile = await Profile.findOne({ artist: req.user.id });

      profile.tracks.unshift(track);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// route    PUT api/profile/artist/albums
// des      Add profile album
// access   Private
router.put(
  '/album',
  auth,
  check('name', 'Album name is required').not().isEmpty(),
  check('price', 'Price is required')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Number is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, about, art, artPublicId, ...tracks } = req.body;

    const album = {
      name,
      price,
      about,
      art,
      artPublicId,
      ...tracks,
    };

    try {
      const profile = await Profile.findOne({ artist: req.user.id });

      profile.albums.unshift(album);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// route    DELETE api/profile/track/:track_id
// des      Delete track from profile
// access   Private

router.delete('/track/:track_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ artist: req.user.id });

    foundProfile.tracks = foundProfile.tracks.filter(
      (t) => t._id.toString() !== req.params.track_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// route    DELETE api/profile/album/:album_id
// des      Delete album from profile
// access   Private

router.delete('/album/:album_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ artist: req.user.id });

    foundProfile.albums = foundProfile.albums.filter(
      (a) => a._id.toString() !== req.params.album_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;
