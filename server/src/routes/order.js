const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/isAuth");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put("/:id", verifyTokenAndAdmin, (req, res, next) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAdmin, (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER ORDERS

router.get("/find/:userId", verifyTokenAndAuthorization, (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$ammount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});
