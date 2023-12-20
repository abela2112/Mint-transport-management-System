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
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/request", requestRouter);
app.use("/api/car", carRoute);
app.use("/api/driver", driverRoute);
app.use("/api/department", deptRoute);
app.use("/api/TMresponse", TMresponseRoute);
app.use("/api/forgot", forgotPassword);

// error handler
app.use(errorHandleMiddleware);
app.use(notFoundErrorMiddleware);

io.on("connection", (socket) => {
  console.log("connection created");

  socket.on("setup", (userData) => {
    console.log("user", userData?._id);
    socket.join(userData?._id);
    io.emit("notification", { text: "user created" });
  });

  socket.on("sendNotificationToStaffmanager", async (data) => {
    console.log("notification received to staff manager", data);
    const senderId = data?.from;
    const user = await User.findById(senderId);

    if (!user) return;

    const staffManagers = await User.find({
      department: user.department,
      role: "staff-manager",
    });

    console.log("staffManagers", staffManagers);

    if (!staffManagers || staffManagers.length === 0) return;

    const notifications = staffManagers.map(async (staffManager) => {
      try {
        const managerUser = await User.findById(staffManager._id);

        if (managerUser) {
          managerUser.notifications.push(data);
          await managerUser.save();
          return {
            userId: managerUser._id.toString(),
            notifications: managerUser.notifications,
          };
        }
      } catch (error) {
        console.error(`Error processing staff manager user:`, error);
      }
    });

    Promise.all(notifications).then((results) => {
      results.forEach((result) => {
        if (result) {
          socket
            .in(result.userId)
            .emit("messagerecieved", { data: result.notifications });
        }
      });
    });
  });

  // ... Repeat similar changes for other notification events ...
  socket.on("sendNotificationToStaff", async (data) => {
    console.log("staff notification", data);

    let receiver = data?.to;
    try {
      const user = await User.findById(receiver);
      if (user) {
        console.log("user notification", user);
        user.notifications?.push(data);
        await user.save();
        socket
          .in(receiver)
          .emit("messagerecieved", { data: user.notifications });
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("sendNotificationToTransportManager", async (data) => {
    console.log("message received", data);
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
            socket
              .in(TransportManager._id.toString())
              .emit("messagerecieved", { data: user?.notifications });
          }
        } catch (error) {
          console.error(
            `Error processing transport manager user with ID ${TransportManager._id}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error finding transport managers:", error);
    }
  });

  socket.on("sendNotificationToAdmin", async (data) => {
    console.log("message received", { data });

    // Find admin users in the database
    const adminUsers = await User.find({ role: "admin" });
    //check for admin users
    if (!adminUsers || adminUsers.length === 0) return;
    // Send notifications to admin users
    const notifications = adminUsers.map(async (adminUser) => {
      try {
        const admin = await User.findById(adminUser._id);

        if (admin) {
          admin.notifications.push(data);
          await admin.save();
          return {
            userId: admin._id.toString(),
            notifications: admin.notifications,
          };
        }
      } catch (error) {
        console.error(`Error processing Admin:`, error);
      }
    });

    Promise.all(notifications).then((results) => {
      results.forEach((result) => {
        if (result) {
          socket
            .in(result.userId)
            .emit("messagerecieved", { data: result.notifications });
        }
      });
    });
    // for (const adminUser of adminUsers) {
    //   console.log(adminUser._id);
    //   try {
    //     const user = await User.findById(adminUser._id);
    //     console.log(user)
    //     if (user) {
    //       user.notifications.push(data);
    //       await user.save();
    //       socket
    //         .in(adminUser._id.toString())
    //         .emit("messagerecieved", { data: user?.notifications });
    //     }
    //   } catch (error) {
    //     console.error(
    //       `Error processing admin user with ID ${adminUser._id}:`,
    //       error
    //     );
    //   }
    // }
  });

  socket.on("disconnect", () => console.log("disconnected"));
});

// socket.on("sendNotificationToStaffmanager", async (data) => {
//   console.log("notification received to staff manager", data);
//   const senderId = data?.from;
//   const user = await User.findById(senderId);
//   const staffManagers = await User.find({
//     department: user?.department,
//     role: "staff-manager",
//   });
//   console.log("staffManagers", staffManagers);
//   if (!staffManagers) return;
//   for (const staffManager of staffManagers) {
//     try {
//       const user = await User.findById(staffManager._id);
//       if (user) {
//         user.notifications.push(data);
//         await user.save();
//         socket
//           .in(staffManager._id.toString())
//           .emit("messagerecieved", { data: user?.notifications });
//       }
//     } catch (error) {
//       console.error(
//         `Error processing transport manager user with ID ${staffManager._id}:`,
//         error
//       );
//     }
//   }
// });

httpServer.listen(process.env.PORT || 5000, async () => {
  console.log("Server is listening");
});
