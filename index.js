const express = require("express");

const app = express();



// creating the endpoint or routes 

//endpoint for signup
app.post("/user/signup", function(req,res){


});

//endpoint for signin
app.post("/user/signin", function(req,res){


})


//endpoint for list of  all purchases
app.get("user/purchses", function(req,res){


});

//endpoint for purchasing the course
app.post("/course/purchase", function(req,res){


});

//endpoint for all the courses on the app
app.get("/course/preview", function(req,res){


});





app.listen(3000); //listennig on port 3000