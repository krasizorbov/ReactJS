const express = require('express');
const router = express.Router();
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
module.exports = router;
