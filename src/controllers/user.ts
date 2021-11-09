import async from 'async';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import passport from 'passport';
import {User, UserDocument, AuthToken} from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import { WriteError } from 'mongodb';
import { CallbackError, NativeError } from 'mongoose';

/* 
    * Sign in using email and password.
    * @route POST /login
*/
export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Logs in the user into the app and returns a 200 status code.
};

/* 
    * Create a new local account.
    * @route POST /signup
*/
export const postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Create a new user. Can't exist two user with the same email or username.
    const body = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const profile = req.body.profile
    console.log({
        main: {
            name,
            email,
            password
        },
        profile: profile
    });
};

/* 
    * Get Profile
    * @route GET /account
*/
export const getAccount = (req: Request, res: Response, next: NextFunction) => {
    // TODO: Get's the user account data.
    if (req.isAuthenticated()){
        User.findOne({_id: req.user}).then((user) => {
            res.status(200).send(user);    
        }).catch(err => {
            console.log(err);
            res.status(404).send({msg: "User not found"});
        });
    }
};

/* 
    * Update profile information
    * @route POST /account/profile
*/
export const postUpdateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Updates the user profile
};

/* 
    * Update current password
    * @route POST /account/password
*/
export const postUpdatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Update the User password and and the user password token.
};

/* 
    * Delete user account
    *@route POST /account/delete
*/
export const postDeleteAccount = (req: Request, res: Response, next: NextFunction): void => {
    // TODO: Deletes the user account. User must be authenticated to be able to delete the account.
};

/* 
    * Unlink OAuth provider
    * @route GET /account/unlink/:provider
*/
export const getOauthUnlink = (req: Request, res: Response, next: NextFunction): void => {

};

/* 
    * Reset Password
    * @route POST /reset/:token
*/
export const postReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Reset Password.
};

/* 
    * Create a randon token, then the send user an email with a reset link
    * @route POST /forgot
*/
export const postForgot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO: Send an email with a reset token to change the password.
};