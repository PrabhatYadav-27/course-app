const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());


app.use("/user", userRouter);

//for future api and versioning above codes acts like below one
// app.use("/api/v1/user", userRouter)
app.use("/admin", adminRouter);

app.use("/course", courseRouter);





//this will ensure the connection should establish to your databse otherwise it wont start
async function main() {
    await  mongoose.connect(process.env.MONGODB_URI);

    

    app.listen(3000); //listennig on port 3000
    console.log("listening on port 3000");
}

// CALLING THE MAIN FUNCTION

 main();
 