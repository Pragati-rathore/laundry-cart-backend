const router = require("express").Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
    try {
        const { id: userId, email } = req.tokenPayload;

        const { add, storeId, order, quantity, total } = req.body;

        const result = await Order.create({
            userId,
            add,
            storeId,
            order,
            quantity,
            total,
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

router.get("/", (req, res) => {
    try {
        const { id: userId, email } = req.tokenPayload;
        Order.find({ userId })
            .populate("storeId")
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

router.delete("/", async (req, res) => {
    try {
        const { id: userId, email } = req.tokenPayload;

        const { orderId } = req.body;

        const result = await Order.findByIdAndDelete(orderId);

        if (!result) {
            return res.status(400).json({
                status: "failed",
                message: "order cancellation failed",
                orderId,
            });
        }

        res.json({
            status: "success",
            message: "order succefully canceled",
            order: result,
        });
    } catch (err) {
        console.log("/orders endpoint POST err:: ");
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error during cancellation of the order",
            error: err.message,
        });
    }
});
module.exports = router;
