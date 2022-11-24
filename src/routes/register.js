const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { hash } = require("bcrypt");
const User = require("../models/User");

const saltRounds = process.env.SALT_ROUNDS || 10;

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
            //check if already exists
            const user = await User.findOne({ $or: [{ email }, { phone }] });

            if (user) {
                res.status(400).json({
                    status: "failed",
                    message:
                        "user already exists give a unique email and phone number",
                });
            } else {
                const hashedPass = await hash(password, saltRounds);
                const user = await User.create({
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

                res.json({
                    status: "success",
                    message: "user successfully registered",
                    user,
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

module.exports = router;
