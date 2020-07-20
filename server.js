const express = require('express');
const db = require('./config/db');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

const app = express();
const PORT =  process.env.PORT || 5000;

app.use(express.json({ extended: true }));

//Database connection
db();
app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
//Routers
app.use('/', userRouter);
app.use('/', authRouter);

app.listen(PORT, () => console.log(`Server is up and running on PORT ${PORT}`));