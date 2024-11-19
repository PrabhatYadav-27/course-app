const {Router} = require("express");

const {adminModel} =  require("../db"); 

const adminRouter = Router();

//Routes for admin

 
//signup endpoint for admin
adminRouter.post("/signup", function(req,res){
    res.json({
        message: "admin signup enpoint"
    })
});

//signin endpoint for admin

adminRouter.post("/signin", function(req,res){
    res.json({
        message: "admin signin endpoint"
    })
});

//course endpoint for admin

adminRouter.post("/course", function(req,res){
    res.json({
        message: "admin course endpoint"
    })
});

//change course endpoint for admin

adminRouter.put("/course", function(req,res){
    res.json({
        message: "admin put  course endpoint"
    })
});

//view all course endpoint for admin


adminRouter.get("/course/all-course", function(req,res){
    res.json({
        message: "admin all course endpoint"
    })
});

//

module.exports = {
    adminRouter: adminRouter
}