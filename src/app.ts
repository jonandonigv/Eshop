import { error } from 'console';
import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { copyFileSync } from 'fs';
import { Sequelize } from 'sequelize';

// My imports
import {router as authRoutes} from './routes/auth';
import { User } from './models/user';
// import {} from './models/cart';
// import {} from './models/product';

const app = express();
const port = 3000;

// parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control_Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control_Allow-Headers', 'Content-Type: application/json, Authorization');
    next();
});

app.use((error: Error, req:Request, res:Response, next:NextFunction) => {
    console.log(error);
    /* const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data:data}) */
})

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log('The server is running in port 3000');
});

// db connection
const sequelize = new Sequelize('postgres://root:78948394C@localhost:5432/eshop');
// db connection testing
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

// db associations which actually populates out pre-declared `association` static and other methods.
/* User.hasMany(Cart, {
    sourceKey: "id",
    foreignKey: "ownerId",
    as: "cart", // this determines the name in `associations`!
}); 

Cart.belongsTo(User, { targetKey: "id" });
User.hasMany(Cart, { sourceKey: "id" });
*/

/* TODO: Continue adding configuration and initialize all the models and the routes */