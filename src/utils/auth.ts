import {User} from '../models/user';
import express, { NextFunction } from 'express';

module.exports.isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    
    User.findById(req.session.userId).exec((error, user) => {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized!');
                err.status = 401;
            } else {
                return next();
            }
        }
    });

}