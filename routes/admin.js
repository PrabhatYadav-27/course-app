const {Router} = require("express");

const {adminModel, courseModel} =  require("../db"); 
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("./config");
const { adminMiddleware } = require("../middleware/admin");


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

adminRouter.post("/course",adminMiddleware , async function(req,res){
    const adminId = req.userId;
    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })
    res.json({
        message: "Course created",
        courseId : course._id 
    })
});

//change course endpoint for adminCourse

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