const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

//LOCAL IMPORTS
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const stripeRoutes = require('./routes/stripe');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ROUTES

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', stripeRoutes);

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB)
    .then((result) => {
      console.log("[SERVER]: DB CONNECTION STABLISHED.");
      console.log("[SERVER]: API RUNNING AT PORT: " + process.env.PORT);
    })
    .catch((err) => console.log(err));
});
