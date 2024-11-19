const {Router}  = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("./config");
const { userMiddleware } = require("../middleware/user");


const userRouter = Router();


// creating the endpoint or routes 

//endpoint for signup
userRouter.post("/signup",  async function(req,res){
    const {email,password,firstName,lastName} = req.body;

     await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName

    });

    res.json({
        message: "signup endpoint"
    })

});

//endpoint for signin
userRouter.post("/signin",  async function(req,res){

    const { email, password } = req.body;

    const user =  await userModel.findOne({
        email: email,
        password: password

    });
    if(user){
        const token=jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);


        // do cookies logic or session based
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message: "Invalid credential"
        })

    }
    
})


//endpoint for list of  all purchases
userRouter.get("/purchases",userMiddleware ,async function(req,res){

    const userId = req.userId;
    const purchases =await purchaseModel.find({
        userId
    });
//to get the details of course like its image adn title price etc
    const courseData = await  courseModel.find({
        _id: {$in: purchases.map(x =>x.courseId)}
    });

    res.json({
        purchases,
        courseData
    })

});

//export from this file

module.exports = {
    userRouter: userRouter
}
