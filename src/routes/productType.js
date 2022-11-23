const router = require("express").Router();

const ProductType = require("../models/ProductType");

router.get("/", async (_req, res) => {
    try {
        const result = await ProductType.find();
        res.json({
            status: "success",
            message: "successfully fetched product types and prices",
            products: result,
        });
    } catch (err) {
        console.log("/products GET endpoint err:: ");
        console.dir(err);
        res.status(500).json({
            status: "failed",
            message: "server error while fetching products details",
            error: err.message,
        });
    }
});

module.exports = router;
