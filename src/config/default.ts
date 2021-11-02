import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import { find } from 'lodash';

import { User, UserDocument } from '../models/user';

import { Request, Response, NextFunction } from "express";
import { NativeError } from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: NativeError, user: UserDocument) => done(err, user));
});

/* 
    * Sign in using Email and password
*/
passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found` });
        }
        user.comparePassword(password, (err: NativeError, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password" });
        });
    });
}));

/* 
    * OAuth Strategy overview
    *
    * - User is already logged in.
    *   - Check if there is an existing account with a provider id.
    *       - If there is, return an error message. (Account merging not supported)
    *       - Else link new OAuth account with currently logged-in user.
    *  - User is not logged in.
    *   - Check if it's a returning user.
    *       - If returning user, sign in and we are done.
    *       - Else check if there is an existing account with user's email.
    *           - If there is, return an error message.
    *           - Else create a new account.
*/

/* 
    * Sign in with Facebook.
*/


/* 
    * Sign in with Google.
*/

/* 
    * Login required middleware.
*/
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(200).send({msg: "User is auth."});
};

/* 
    * Authorization required middleware.
*/
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split("/").slice(-1)[0];

    const user = req.user as UserDocument;
    if (find(user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};