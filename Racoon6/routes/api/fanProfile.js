const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
//bring in normalize to give us a proper url, regardless of what user entered
//const normalize = require('normalize-url');
//const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/FanProfile');
const Fan = require('../../models/Fan');
//const User = require('../../models/User');

// route  GET api/profile/fan/
// des    GET current fan profile
// access Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      fan: req.user.id,
    });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// route    POST api/profile/fan
// des      Create or update fan profile
// access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const { name, art, artPublicId, location, website, about } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      name,
      website:
        website && website !== ''
          ? normalize(website, { forceHttps: true })
          : null,
      location,
      art,
      artPublicId,
      about,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { fan: req.user.id },
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

module.exports = router;
