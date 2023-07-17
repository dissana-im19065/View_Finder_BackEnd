require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');


app.use(express.json()); // use express.json() to parse incoming requests with JSON payloads

app.use("/api/users", userRouter);      // use the router for CREATE USERS


app.listen(process.env.APP_PORT, () => {          // call back function
    console.log("Server up and running on PORT", process.env.APP_PORT);
});