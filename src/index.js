const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
app.use(express.json());
app.use(cookieParser());
const {userAuth} = require("./middlewares/auth");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
// const {requestRouter} = require("./routes/request.js");
 
app.use("/", authRouter);
app.use("/", profileRouter);
// app.use("/", requestRouter);

// app.get("/users", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.send("user not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("something went wrong..");
//   }
// });

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;

//   try {
//     const users = await User.findOne({ emailId: userEmail });
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("something went wrong..");
//   }
// });

// //update user
// app.patch("user", async (req, res) => {
//   const user = new User();
// });



connectDB()
  .then(() => {
    console.log("connection to cluster successfully established...");
    app.listen(7777, () => {
      console.log("server is running at port : 7777");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected!!", err);
  });
