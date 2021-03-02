const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Artist = require('../../models/Artist');
const User = require('../../models/User');

// route  POST api/artists
// desc   Register an artist
// access Public
router.post(
    '/',
    [
      	check('bandName', 'Band name is required.').not().isEmpty(),
      	check('name', 'Name is required.').not().isEmpty(),
      	check('email', 'Please include a valid email.').isEmail(),
      	check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
    ],
    async (req, res) => {
      	const errors = validationResult(req);
      	if (!errors.isEmpty()) {
        	return res.status(400).json({ errors: errors.array() });
      	}
  
      	const {bandName, name, email, password } = req.body;
  
      	try {
        	let artist = await User.findOne({ email });
			
        	if (artist) {
        	  return res.status(400).json({ errors: [{ msg: 'User already exists.' }] });
        	}
		
        	artist = new Artist({
        	  bandName,
        	  name,
        	  email,
        	  password
        	});

			const role = "artist";
			let user = new User({
				email,
				password,
				role
			})
		
        	const salt = await bcrypt.genSalt(config.get('saltRounds'));

			artist.password = await bcrypt.hash(password, salt);
        	user.password = await bcrypt.hash(password, salt);
		
        	await user.save();
			await artist.save();
		
        	const payload = {user: {id: artist.id, role: "artist"}};
		
        	jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '5 days' }, (err, token) => {
        	    if (err) throw err;
        	    res.json({ token });
        	});
      	} catch (err) {
        	console.error(err.message);
        	res.status(500).send('Server error');
      	}
    }
);

module.exports = router;