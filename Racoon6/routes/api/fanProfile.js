const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
//const { check, validationResult } = require('express-validator');
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
module.exports = router;
