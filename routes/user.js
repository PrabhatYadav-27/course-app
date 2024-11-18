const {Router}  = require("express");

const userRouter = Router();


// creating the endpoint or routes 

//endpoint for signup
userRouter.post("/signup", function(req,res){
    res.json({
        message: "signup endpoint"
    })

});

//endpoint for signin
userRouter.post("/signin", function(req,res){
    res.json({
        message: "signin endpoint"
    })
})


//endpoint for list of  all purchases
userRouter.get("/purchases", function(req,res){
    res.json({
        message: "purchases endpoint"
    })

});

//export from this file

module.exports = {
    userRouter: userRouter
}
