const { User } = require("../models/usersModel.js"),
    config = require('dotenv'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');
config.config();

// get all users functionality
const getAllUsers = async (req, res, next) => {
    await User.find()
        .then(users => {
            // console.log(`This is the cookie from front ${req.cookies.jwtToken}`);
            res.status(200).json({ data: users })
        })
        .catch(err => next(err));
}

// register new user API fucntion
const register = async (req, res, next) => {
    await create(req.body)
        .then(async (resp) => {
            if (resp != 400) {
                await res.cookie('jwtToken', resp.token, {
                    expires: new Date(Date.now() + 1800000),
                    httpOnly: true,
                    // secure: true
                })
                res.json({
                    status: 201,
                    message: "User Registered Successfully",
                    data: resp,
                })
            }
            else {
                res.json({
                    status: 400,
                    message: "User Already Exists"
                })
            }
        })
        .catch(err => {
            res.json({
                status: 500,
                message: `Error while creating ${err}`
            })
        })
}

// get user trying to login API function
const authenticate = async (req, res, next) => {
    await login(req.body)
        .then(async resp => {
            if (resp) {
                await res.cookie('jwtToken', resp.token, {
                    expires: new Date(Date.now() + 7200000),
                    httpOnly: true,
                    // secure: true
                });
                await res.cookie('username', resp.username, {
                    expires: new Date(Date.now() + 7200000),
                    // httpOnly: true,
                    // secure: true
                })
                res.status(200).redirect('/dashboard');
                next();
                // , {
                //     title: 'Chatting Page',
                //     layout: layoutPath,
                //     data: resp
                // })
            } else {
                res.status(400).json({
                    message: 'Username or password is incorrect'
                })
            }
        }
        ).catch(err => next(err));
}

const logout = async (req, res, next) => {
    let cookies = await req.cookies;
    if (req.cookies.username) {
        for (var prop in cookies) {
            if (!cookies.hasOwnProperty(prop)) continue;
            await res.cookie(prop, '', { expires: new Date(0) });
        }
        res.redirect('/signin');
        next();
    }
    else if (!req.cookies.username) {
        res.status(400).json({ message: "User is not logged in!!!" })
    }

}
// delete all users functionality
const deleteusers = (req, res) => {
    try {
        User.deleteMany({}, (err) => {
            if (err)
                res.status(400).json({ message: "Enter Valid User" })
            else
                res.status(200).json({ message: "Deleted all users successfully" })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }

}

module.exports = { getAllUsers, register, authenticate, logout, deleteusers }

// function to create new user
const create = async (userParam) => {
    try {
        // validate
        if (await User.findOne({ username: userParam.username })) {
            return 400;
        }
        const user = new User(userParam);

        // hash password
        if (userParam.password) {
            user.password = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '30m' });
        return {
            ...user.toJSON(),
            token
        }

    } catch (error) {
        throw error.message;
    }
}

// function to get specific users
const login = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return {
                ...user.toJSON(),
                token
            }
        }

    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }

}