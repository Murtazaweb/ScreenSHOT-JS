const express = require('express'),
    { getAllUsers, deleteusers, register, authenticate, logout } = require('../controller/user.js'),
    { addUrl, showUrl } = require('../controller/directory.js'),
    { auth } = require('../helpers/auth.js'),
    userRouter = express.Router();

// get users route
userRouter.post('/addurl',auth, addUrl);
//userRouter.get('/dashboard',auth, dashboard);
userRouter.get('/showurl', auth, showUrl);

userRouter.get('/user/getall', auth, getAllUsers);



// adding new user route
userRouter.post('/user/register', register);

// signing in user route
userRouter.post('/user/authenticate', authenticate);

userRouter.post('/user/test', (req, res) => {
    res.status(201).json({
        msg: "Testing Route",
        auth: req.body
    })
})

// logout ROute
userRouter.get('/user/logout', logout)

// delete all users route
userRouter.delete('user/deleteusers', auth, deleteusers);


exports.userRouter = userRouter;
