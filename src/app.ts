import express, { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';
import {MONGODB_URI, SESSION_SECRET} from './utils/secrets';
import logger from "./utils/logger";
import session from "express-session";
import MongoStore from "connect-mongo";


// Controllers (route handlers)
import * as userController from './controllers/user';

// Create Express server
const app = express();

// Connect MongoDB
mongoose.connect('mongodb+srv://admin:aJcmP3DHuV97StHA@database.rx4es.mongodb.net/Eshop').then(
    () => {
        // ready to use. the `mongoose.connect()` promise resolves to undefined
        logger.debug("DataBase connection stablished successfuly");
    }).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'somethingsecret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        db: mongoose.connection.db
    })
}));

/* 
    * Primary app routes.
*/
app.post('/', (req, res, next) => {
    res.json({
        status: true,
        message: "API running"
    });
});
app.post("/signup", userController.postSignup);
app.post("/login", userController.postLogin);

export default app;