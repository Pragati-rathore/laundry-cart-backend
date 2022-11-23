const router = require("express").Router();

const Order = require("../models/Order");

router.post("/", async (req, res) => {
    try {
        //TODO take userId from Auth middleware
        //const {_id: userId} = req.user;
        //const userId = "some id";

        const {userId, add, storeId, order} = req.body;

        const result = await Order.create({
            userId, add, storeId, order
        });
        
        await result.populate('storeId');
        

        res.json({
            status: "success",
            message: "order succefully created",
            order: result
        });
    } catch (err) {
        console.log("/orders endpoint POST err:: ");
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error during creating the order",
            error: err.message
        });
    }
});

module.exports = router;
