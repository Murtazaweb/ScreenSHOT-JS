const jwt = require("jsonwebtoken");
     require("dotenv").config();

const auth = async (req, res, next) => {
    const token = await req.cookies.jwtToken;
    // req.header("authorization").split(" ")[1];
    // console.log(token)
    // check if token is available or not
    if (!token) {
        return res.status(401).redirect('/signin');
        // json({ message: "No token, Authorization Denied!!!" })
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).redirect('/signin');
        next();
        //  { message: "Token is not valid" })
    }

}

module.exports = { auth }