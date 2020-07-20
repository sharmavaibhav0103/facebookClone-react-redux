const { check,validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = require('express').Router();

router.post('/auth', 
    [
        check('email','Email is required!').not().isEmpty(),
        check('password','Password is required').not().isEmpty()
    ], 
    async (req, res) => {
        //validation
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email});
            if(!user)
                return res.status(404).json({error: 'User not found'});

            const passres = await bcrypt.compare(password, user.password);
            if(!passres)
                return res.status(400).json({ error: 'Password is incorrect'});
             
             const payload = {
                    user: {
                        id:user.id,
                    }
                }
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    (err, token) => {
                        return res.status(200).json({ token: token });
                    }
                );
    
        } catch (error) {
            res.status(500).json({ errors: error.message});
        }
    })
module.exports = router;