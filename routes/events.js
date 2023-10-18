var express = require('express');
var router = express.Router();

const Event = require('../models/Event')

const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/create/:petId', isAuthenticated, (req, res, next) => {

    Event.create({
        ...req.body,
        pet: req.params.petId,
        owner: req.user._id
    })
    .then((newEvent) => {
        res.json(newEvent)
    })
    .catch((err) => {
        console.log(err)
        res.json(err)
        next(err)
    })
    
})

module.exports = router;