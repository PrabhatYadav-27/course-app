const {Router} = require("express");

const {adminModel} =  require("../db"); 
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD ="randomadmin@123"

const adminRouter = Router();

//Routes for admin

 
//signup endpoint for admin
adminRouter.post("/signup",  async function(req,res){
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message: "admin signup enpoint"
    })
});

//signin endpoint for admin

adminRouter.post("/signin", async function(req,res){

    const { email, password } = req.body;

    const admin =  await adminModel.findOne({
        email: email,
        password: password

    });
    if(admin){
        const token=jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);


        // do cookies logic or session based
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message: "Invalid credential"
        })

    }
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