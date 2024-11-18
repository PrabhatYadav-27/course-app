const {Router}  = require("express");
const courseRouter =Router();



//endpoint for purchasing the course
courseRouter.post("/purchase", function(req,res){

    res.json({
        message: "purchase endpoint"
    })
});

//endpoint for all the courses on the app
courseRouter.get("/preview", function(req,res){
    res.json({
        message: "preview endpoint"
    })
});

module.exports = {
    courseRouter: courseRouter
}