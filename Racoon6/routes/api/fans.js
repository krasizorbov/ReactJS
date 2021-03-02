const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Fan = require('../../models/Fan');

// route  POST api/fans
// des    Register a fan
// access Public
router.post(
    '/',
    [
      check('name', 'Name is required!').not().isEmpty(),
      check('email', 'Please include a valid email!').isEmail(),
      check('password', 'Please enter a password with 6 or more characters!').isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
  
        const {name, email, password } = req.body;
  
        try {
            let user = await Fan.findOne({ email });
            
            if (user) {
              return res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
            }
        
            user = new Fan({
              name,
              email,
              password
            });
        
            const salt = await bcrypt.genSalt(config.get('saltRounds'));
        
            user.password = await bcrypt.hash(password, salt);
        
            await user.save();
        
            const payload = {user: {id: user.id, role: "fan"}};
        
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