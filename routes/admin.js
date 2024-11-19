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

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    // Find admin user
    const admin = await adminModel.findOne({
        email,
        password,
    });

    if (admin) {
        // Ensure JWT_ADMIN_PASSWORD is defined
        if (!JWT_ADMIN_PASSWORD) {
            return res.status(500).json({ message: "JWT secret is not defined" });
        }

        // Sign token with JWT_ADMIN_PASSWORD
        const token = jwt.sign(
            {
                id: admin._id,
            },
            JWT_ADMIN_PASSWORD, // Secret key from .env
            { expiresIn: '1h' } // Optional: set token expiration
        );

        res.json({
            token,
        });
    } else {
        res.status(403).json({
            message: "Invalid credentials",
        });
    }
});


//course endpoint for admin

adminRouter.post("/course",adminMiddleware , async function(req,res){
    const adminId = req.userId;

    const {title, description, imageUrl, price, } = req.body;

    const course = await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId: adminId
    })
    res.json({
        message: "Course created",
        courseId : course._id 
    })
});

//change course endpoint for adminCourse

adminRouter.put("/course", adminMiddleware,async function(req,res){
    const adminId = req.userId;
    const {title, description, imageUrl, price,courseId} = req.body;

    const course = await courseModel.updateOne(
        {
            _id:courseId,
            creatorId: adminId
        },{
        title,
        description,
        imageUrl,
        price
    })
    res.json({
        message: "Course updated",
        courseId : course._id 
    })
});

//view all course endpoint for admin


adminRouter.get("/course/all-course",adminMiddleware , async function(req,res){
    const adminId = req.userId;
    const courses = await courseModel.find(
        {
        
            creatorId: adminId
        });

    res.json({
        message: "Course created",
        courses 
    })
});

//

module.exports = {
    adminRouter: adminRouter
}