const express =require('express')
const cors = require("cors");
const app = express();
require("dotenv").config();

//connect database
const dbconnect = require("./connect/db");

//router
const userRoute = require("./routes/user");
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.listen(process.env.PORT || 5000 ,async()=>{
    await dbconnect(process.env.MONGO_URL)
    console.log('Server is listening')
})