const router = require("express").Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
    try {
        //TODO take userId from Auth middleware
        //const {_id: userId} = req.user;
        //const userId = "some id";

        const { userId, add, storeId, order } = req.body;

        const result = await Order.create({
            userId,
            add,
            storeId,
            order,
        });

        await result.populate("storeId");

        res.json({
            status: "success",
            message: "order succefully created",
            order: result,
        });
    } catch (err) {
        console.log("/orders endpoint POST err:: ");
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error during creating the order",
            error: err.message,
        });
    }
});

router.get("/", (_req, res) => {
    try {
        //search using UserId
        Order.find({})
            .then((data) => {
                res.status(200).json({
                    status: "success",
                    message: "successfully fetched all orders of user",
                    orders: data,
                });
            })
            .catch((err) => {
                console.log("Err while fetching the orders:: ");
                console.dir(err);
                res.status(400).json({
                    status: "failed",
                    message: "error while fetching orders",
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
