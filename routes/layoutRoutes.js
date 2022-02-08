const express = require('express'),
    { auth } = require('../helpers/auth.js'),
    layoutRouter = express.Router();

// main routes
let layoutPath = './layouts/layout';

layoutRouter.get("/", (req, res) => {
    res.render('index', { title: 'Homepage', layout: layoutPath })
});

layoutRouter.get('/dashboard', auth, (req, res) => {
    res.render('addurl', { title: 'Dashboard', layout: layoutPath})
});


// page for chatting
layoutRouter.get('/chats', auth, (req, res) => {
    res.render('chats', { title: 'Chatting Page', layout: layoutPath })
});

// register page
layoutRouter.get('/signup', (req, res) => {
    res.render('signup', { title: 'Register', layout: layoutPath })
});

// signip page
layoutRouter.get('/signin', (req, res) => {
    res.render('signin', { title: 'Login', layout: layoutPath })
});


exports.layoutRouter = layoutRouter;