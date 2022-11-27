const router = require("express").Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  try {
    const { id: userId, email } = req.tokenPayload;
    User.findById(userId, { password: 0 })
      .then((data) => {
        res.status(200).json({
          status: "success",
          message: "successfully fetched user",
          user: data,
        });
      })
      .catch((err) => {
        console.log("Err while fetching the user:: ");
        console.dir(err);
        res.status(400).json({
          status: "failed",
          message: "error while fetching user",
          error: err.message,
        });
      });
  } catch (err) {
    //TODO change after implementing middleware for the auth
    //console.log(err)
    res.status(400).send("Unauthorize user");
  }
});

module.exports = router;
