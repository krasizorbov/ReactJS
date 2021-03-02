const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Artist = require('../../models/Artist');
const Fan = require('../../models/Fan');

// route  GET api/auth
// des    Get user by token
// access Private
router.get('/', auth, async (req, res) => {
    let user = null;
    try {
        if (req.user.role === "artist") {
            user = await Artist.findById(req.user.id).select('-password');
        } else {
            user = await Fan.findById(req.user.id).select('-password');
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;