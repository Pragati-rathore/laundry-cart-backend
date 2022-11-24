const router = require("express").Router();
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "this is a secret";
const expiresIn = "12d";

const { body, validationResult } = require("express-validator");

const User = require("../models/User");

//login
router.post(
  "/",
  body("username").isString({ min: 3 }),
  body("password").isString({ min: 6 }),
  async (req, res) => {
    try {
      const inputErrors = validationResult(req);
      if (!inputErrors.isEmpty()) {
        return res.status(400).json({ errors: inputErrors.array() });
      }
      const { username, password } = req.body; //username is phone or email

      //check user exists?
      const user = isNaN(Number(username))
        ? await User.findOne({ email: username })
        : await User.findOne({ phone: username });

      if (!user) {
        res.status(400).json({
          status: "failed",
          message: "no such user exists give valid email/phone",
        });
      } else {
        //compare the password
        const result = await compare(password, user.password);
        if (!result) {
          res.status(400).json({
            status: "failed",
            message: "wrong credentials",
          });
        } else {
          //user exists and correct password
          //generate accessToken with id
          const accessToken = jwt.sign(
            { email: user.email, id: user.id },
            SECRET,
            { expiresIn: expiresIn }
          );

          res.json({
            status: "success",
            message: "succefully logged in",
            token: accessToken,
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        status: "failed",
        errors: err.message,
      });
    }
  }
);

module.exports = router;
