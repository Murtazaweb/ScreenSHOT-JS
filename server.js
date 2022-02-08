require('dotenv').config();
const express = require("express"),
    mongoose = require("mongoose"),
    expressLayouts = require("express-ejs-layouts"),
    //{ chatRouter } = require("./routes/chatRoutes.js"),
    { userRouter } = require("./routes/userRoutes.js"),
    { layoutRouter } = require("./routes/layoutRoutes.js"),
    // { jwt } = require('./helpers/jwt.js'),
    { errorHandler } = require('./helpers/errorhandler.js'),
    // { auth } = require('./helpers/auth.js'),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    app = express(),
    dbUrl = process.env.MONGODB_URI,
    connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    port = process.env.PORT || 3000; // defining port


// ------------------------- Database Connection ------------------------- //
//Set up default mongoose connection
mongoose.connect(dbUrl, connectionOptions);

//Get the default connection
const dbCon = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
dbCon.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ------------------------- Database connection ends here ------------------------- //
// ------------------------- app configuration ------------------------- //
app.set("view engine", "ejs",
    "views", __dirname + "/views",
    "layout", __dirname + "/views/layouts/layout.ejs",
    dbCon);

app.use(bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressLayouts,
    express.static('public'),
    // cookies parser
    cookieParser(),
    // enable headers required for POST request
    function (request, result, next) {
        result.setHeader("Access-Control-Allow-Origin", "*");
        next();
    },
    // use JWT auth to secure the api
    // jwt(),
    // global error handler
    errorHandler,
    // --------- app routes --------------- //
    // layout Routes
    layoutRouter,
    // Chat routes
    //chatRouter,
    // User routes
    userRouter);
// ------------------------- app configuration ends here ------------------------- //

// listen the server
app.listen(port, () => {
    console.log(`Server is listening at port ${port} with ${process.env.NODE_ENV} Node Environment`);
})
