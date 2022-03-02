const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/isAuth");

const router = require("express").Router();

// CREATE

router.post('/', verifyToken, (req, res, next) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});