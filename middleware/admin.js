const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../routes/config");

function adminMiddleware(){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if(decoded){
        res.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware:adminMiddleware
}