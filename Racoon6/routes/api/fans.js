const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Fan = require('../../models/Fan');
const User = require('../../models/User');

// route  POST api/fans
// desc   Register a fan
// access Public
router.post(
    '/',
    [
      check('name', 'Username is required.').not().isEmpty(),
      check('email', 'Please include a valid email.').isEmail(),
      check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        const {name, email, password } = req.body;
  
        try {
            let fan = await User.findOne({ name });
            
            if (fan) {
              return res.status(400).json({ errors: [{ msg: 'Username already exists.' }] });
            }
        
            fan = new Fan({
              name,
              email,
              password
            });
            
            const role = "fan";
			let user = new User({
			      name,
			      password,
			      role
			});
            const salt = await bcrypt.genSalt(config.get('saltRounds'));
        
            user.password = await bcrypt.hash(password, salt);
            fan.password = await bcrypt.hash(password, salt);
        
            await user.save();
            await fan.save();
        
            const payload = {user: {id: fan.id, role: "fan"}};
        
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