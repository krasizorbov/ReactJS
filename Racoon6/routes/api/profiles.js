const express = require('express');
const router = express.Router();
const checkObjectId = require('../../middleware/checkObjectId');
const Profile = require('../../models/ArtistProfile');

// route    GET api/profile
// desc     Get all profiles
// access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('artist', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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
module.exports = router;
