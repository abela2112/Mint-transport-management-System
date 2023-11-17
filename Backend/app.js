const express =require('express')
const cors = require("cors");
require("express-async-errors");
const app = express();
require("dotenv").config();
//socket io
const httpServer = require("http").createServer(app);
//connect database
const dbconnect = require("./connect/db");
dbconnect(process.env.MONGO_URL)

//models
const User=require('./models/user')
//middleware
const errorHandleMiddleware = require("./middleware/errorhandler");
const notFoundErrorMiddleware = require("./middleware/notFound");
//router
const userRoute = require("./routes/user");
//creating socket server


const options =  {
  pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      //methods: ["GET", "POST"]
    }}
const io = require("socket.io")(httpServer, options);
const carRoute = require("./routes/car");
const driverRoute = require("./routes/driver");
const TMresponseRoute=require("./routes/TransManagerResponse")
const requestRouter=require("./routes/request")
const forgotPassword=require("./routes/sendMail")
const deptRoute=require("./routes/department")

io.on('connection',(socket)=>{
    console.log('connection created')
    
    socket.on("setup", (userData) => {
        console.log('user',userData?._id)
         socket.join(userData?._id);
         //console.log('socket data',socket)
         io.emit('notification',{text:' user created'});
        
        
      })
    socket.on('sendNotificationToStaffmanager',async (data)=>{
        console.log('notification received to staff manager',data)
        const senderId=data?.from;
        const user=await User.findById(senderId);
        const staffManagers=await User.find({department:user?.department,role:"staff-manager"})
        console.log('staffManagers',staffManagers)
        if(!staffManagers) return;
        for (const staffManager of staffManagers) {
         
          try {
            const user = await User.findById(staffManager._id);
            if (user) {
              user.notifications.push(data);
              await user.save();
              socket.in(staffManager._id.toString()).emit("messagerecieved", { data:user?.notifications });
               }
            } catch (error) {
            console.error(`Error processing transport manager user with ID ${staffManager._id}:`, error);
          }
        }    
    })

    socket.on('sendNotificationToStaff',async (data)=>{
      console.log('staff notification',data)

      let receiver=data?.to
     try {
      const user=await User.findById(receiver)
      if(user)  {
        console.log('user notification',user)
         user.notifications?.push(data)
         await user.save()
         socket.in(receiver).emit("messagerecieved", { data:user.notifications });
       }
     } catch (error) {
      console.log(error)
     }
    });
    socket.on('sendNotificationToTransportManager',async (data) =>{
      console.log('message received',data)
      try {
        // Find admin users in the database 
        const TransportManagers = await User.find({ role: "transport-manager" });
        // Send notifications to admin users
        for (const TransportManager of TransportManagers) {
          try {
            const user = await User.findById(TransportManager._id);
            if (user) {
              user.notifications.push(data);
              await user.save();
              console.log(user.notifications);
              socket.in(TransportManager._id.toString()).emit("messagerecieved", {data:user?.notifications });
          
               }
            } catch (error) {
            console.error(`Error processing transport manager user with ID ${TransportManager._id}:`, error);
          }
        }

      } catch (error) {
        console.error("Error finding transport managers:", error);
      }
    });
    
    socket.on("sendNotificationToAdmin", async ({data}) => {
        console.log('message received',{data})
        try {
          // Find admin users in the database
          const adminUsers = await User.find({ role: "admin" });
          // Send notifications to admin users
          for (const adminUser of adminUsers) {

            console.log(adminUser._id)
            try {
              const user = await User.findById(adminUser._id);
              if (user) {
                user.notifications.push(data);
                await user.save();
                socket.in(adminUser._id.toString()).emit("messagerecieved", { data:user?.notifications} );
                 }
            } catch (error) {
              console.error(`Error processing admin user with ID ${adminUser._id}:`, error);
            }
          }
        }
          catch (error) {
           console.log(error)
          }
          
      });

    socket.on('disconnect',()=>console.log('disconnected'))
})

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/request",requestRouter)
app.use("/api/car", carRoute);
app.use("/api/driver", driverRoute);
app.use("/api/department",deptRoute)
app.use("/api/TMresponse",TMresponseRoute)
app.use("/api/forgot",forgotPassword)

// error handler
app.use(errorHandleMiddleware);
app.use(notFoundErrorMiddleware);





httpServer.listen(process.env.PORT || 5000 ,async()=>{
   
    console.log('httpServer is listening')});
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server


