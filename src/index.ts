import express from 'express';
import {Request, Response, NextFunction} from 'express';
import { Sequelize } from 'sequelize';

// My imports
import {router as authRoutes} from './routes/auth';

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

// db conection
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

try {
    sequelize.authenticate();
    console.log('Connection has been established succesfully!');
    app.listen(port, () => {
        console.log('The server is running in port 3000');
    });
} catch (error) {
    console.log('Unable to connect to databas: ', error);
};

app.listen(port, () => {
    console.log('The server is running in port 3000');
});