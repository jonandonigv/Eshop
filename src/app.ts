import express, { Request, Response, NextFunction } from "express";
import compression from 'compression';
import session from 'express-session';
import lusca from 'lusca';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';
import path from "path";
import mongoose from 'mongoose';
import passport from 'passport';
import bluebird from 'bluebird';
import {MONGODB_URI, SESSION_SECRET} from './utils/secrets';
import logger from "./utils/logger";


// Controllers (route handlers)
/* import * as apiController from './controllers/api';
import * as cartController from './controllers/cart';
import * as productController from './controllers/product';
import * as userController from './controllers/user';
import * as contactController from './controllers/contact'; */

// API keys and Passport configuration
/* import * as passportConfig from './config/default'; */

// Create Express server
const app = express();

// Connect MongoDB
const mongoUrl = MONGODB_URI;

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
// app.use(compression());
/* app.use(session({
    resave: true,
    saveUninitialize: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        mongoUrl,
        mongoOptions: {
            autoReconnect: true
        }
    })
})); */
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));
/* app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
}); */
/* app.use((req: Request, res: Response, next: NextFunction) => {

}); */


/* 
    * Primary app routes.
*/
/* app.post("/login", userController.postLogin);
app.post("/contact", contactController.postContact);
app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
 */
/* 
    * API example routes.
*/
/* app.get("/api", apiController.getApi);
app.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook); */

/* 
    * OAuth authentication routes. (Sign in)
*/
/* app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req: Request, res: Response) => {
    res.redirect(req.session.returnTo || "/");
}); */

export default app;