const router = require("express").Router();
const express = require("express");
const { hash } = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
router.use(express.json());

router.post(
  "/",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isString({ min: 6 }),
  body("phone").isLength({ max: 10, min: 10 }),
  body("address").isLength({ min: 3 }),
  body("state").isLength({ min: 2 }),
  body("pincode").isLength({ min: 6, max: 6 }),
  body("district").isLength({ min: 3 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "failed",
          message: "invalid data for user registeration",
          errors: errors.array(),
        });
      }
      const {
        name,
        email,
        password,
        phone,
        address,
        state,
        district,
        pincode,
      } = req.body;

      const userExist = await User.findOne({ $or: [{ email }, { phone }] });
      if (userExist) {
        return res
          .status(422)
          .json({ error: "email or phone already present use different one" });
      }
      const hashedPass = await hash(password, saltRounds);
      const userdata = new User({
        name,
        email,
        phone,
        password: hashedPass,
        address: [
          {
            address,
            state,
            district,
            pincode,
          },
        ],
      });
      //bycript

      const userRegis = await userdata.save();
      if (userRegis) {
        res.json({
          status: "success",
          message: "user successfully registered",
          user: userRegis,
        });
      }
    } catch (err) {
      console.log("/register endpoint Err:: ");
      console.dir(err);
      res.status(500).json({
        status: "failed",
        message: "server error while registering user",
        error: err.message,
      });
    }
  }
);
//login

module.exports = router;
