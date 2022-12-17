const router = require('express').Router();
const db = require('../models');

router.get('/', (req, res) => {
    db.User.find()
        .then((users) => {
            res.render('users/index', { users })
        })
        .catch((err) => {
            console.log('err', err);
            res.render('error')
        })
})