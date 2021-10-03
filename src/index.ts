import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world!</h1>')
});

app.listen(port, () => {
    console.log('The server is running in port 3000');
});