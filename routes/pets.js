var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");

const Pet = require('../models/Pet')
const User = require('../models/User')

const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/create', isAuthenticated, (req, res, next) => {

    Pet.create(req.body)
    .then((createdPet) => {
        return User.findByIdAndUpdate(
            req.user._id,
            { $push: {pets: createdPet._id}},
            {new: true}
        )
    })
    .then((toPopulate) => {
        return toPopulate.populate('pets')
    })
    .then((userNewPet) => {
        const { _id, email, name, pets, location, image } = userNewPet
        const user = { _id, email, name, pets, location, image };
        const authToken = jwt.sign(user, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        })
        
        res.json({user, authToken});
    })
    .catch((err) => {
        console.log(err)
        res.json(err)
        next(err)
    })

})

module.exports = router;