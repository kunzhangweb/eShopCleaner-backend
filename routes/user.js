const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  console.log(req.body.email);
  User.find({ email: req.body.email })
    .exec()

    .then(user => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "Email already exist"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              user_type: "user"
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User Created Succesfully"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "Failure to create user",
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/admin-signup", (req, res, next) => {
  console.log(req.body.email);
  User.find({ email: req.body.email })
    .exec()

    .then(user => {
      if (user.length >= 1) {
        return res.status(400).json({
          message: "Email already exist"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              user_type: "admin"
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "Admin Created Succesfully"
                });
              })
              .catch(err => {
                res.status(500).json({
                  message: "Failure to create Admin",
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);

  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failure, User Not exists"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return es.status(401).json({
              message: " Auth Failed"
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "secret",
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              message: "Auth Successful",
              user_type: user[0].user_type,
              token: token
            });
          }

          return res.status(401).json({
            message: " Auth Failed"
          });
        });
      }
    })

    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
