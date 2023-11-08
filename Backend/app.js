const express =require('express')
const cors = require("cors");
require("express-async-errors");
const app = express();
require("dotenv").config();

//connect database
const dbconnect = require("./connect/db");
//middleware
const errorHandleMiddleware = require("./middleware/errorhandler");
const notFoundErrorMiddleware = require("./middleware/notFound");
//router
const userRoute = require("./routes/user");

const carRoute = require("./routes/car");
const driverRoute = require("./routes/driver");
const TMresponseRoute=require("./routes/TransManagerResponse")
const requestRouter=require("./routes/request")
const forgotPassword=require("./routes/sendMail")
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/request",requestRouter)
app.use("/api/car", carRoute);
app.use("/api/driver", driverRoute);
app.use("/api/TMresponse",TMresponseRoute)
app.use("/api/forgot",forgotPassword)
// error handler
app.use(errorHandleMiddleware);
app.use(notFoundErrorMiddleware);

app.listen(process.env.PORT || 5000 ,async()=>{
    await dbconnect(process.env.MONGO_URL)
    console.log('Server is listening')
})
