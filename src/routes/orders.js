const express = require("express");
const Orders = require("../models/Order");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/orders", (req, res)=> {

    try {

        Orders.find({}).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err);
        })

    } catch(err) {
        // console.log(err)
        res.status(400).send("Unauthorize user")
    }    
   
});

module.exports = router