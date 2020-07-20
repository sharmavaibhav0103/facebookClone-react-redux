const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
//saving a user 
router.post('/user', 
    [
        check('firstname', 'Name is required!').not().isEmpty(),
        check('surname', 'surname is required!').not().isEmpty(),
        check('password', 'Password is required!').not().isEmpty(),
        check('email', 'Email is required!').not().isEmpty(),
        check('dob', 'Dob is required!').not().isEmpty(),
        check('gender', 'Gender is required!').not().isEmpty()
    ], 
    async (req, res) => {
        console.log(req.body);
        //Validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            firstname,
            surname, 
            dob, 
            mobile,
            email, 
            gender,
            password } = req.body;

        try {
            let user = await User.findOne({ email});
            if(user)
                return res.status(400).json({ error: 'User already exists'});

            user = new User({
                firstname,
                surname, 
                dob, 
                mobile,
                email, 
                gender,
                password });
            
            user.password = await bcrypt.hash(password, 10);
            user.save();

            const payload = {
                user: {
                    id:user.id,
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err, token) => {
                    console.log(token);
                    return res.status(200).json({ token: token });
                }
            );

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error});
        }

})

module.exports = router;