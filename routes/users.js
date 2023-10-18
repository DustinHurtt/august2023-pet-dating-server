var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const isAuthenticated = require("../middleware/isAuthenticated");

/* GET users listing. */
router.get("/details/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .populate('pets')
    .then((foundUser) => {
      const { _id, email, name, pets, location, image } = foundUser;

      // Create an object that will be set as the token payload
      const userInfo = { _id, email, name, pets, location, image };
      res.json(userInfo);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.post("/update", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id, 
    req.body, 
    { new: true }
    )
    .then((updatedUser) => {
      return updatedUser.populate('pets')
    })
    .then((populatedUser) => {
      const { _id, email, name, pets, location, image } = populatedUser
      const user = { _id, email, name, pets, location, image };
      const authToken = jwt.sign(user, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      })
      
      res.json(user, authToken);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

module.exports = router;
