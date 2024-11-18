const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();


app.use("/user", userRouter);

//for future api and versioning above codes acts like below one
// app.use("/api/v1/user", userRouter)
app.use("/admin", adminRouter);

app.use("/course", courseRouter);









app.listen(3000); //listennig on port 3000