const router = require("express").Router();

const Store = require("../models/Store");

router.get("/", async (_req, res) => {
    try {
        const result = await Store.find();
        res.json({
            status: "success",
            message: "successfully fetched all available stores",
            stores: result,
        });
    } catch (err) {
        console.log("/stores GET endpoint err:: ");
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error while fetching available stores",
            error: err.message,
        });
    }
});

module.exports = router;
