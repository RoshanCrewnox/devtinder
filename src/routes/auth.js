const express = require("express")
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user.js");
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {userAuth} = require("../middlewares/auth");

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    
    const user = await User.findOne({ emailId: emailId });
  
    if (!user) {
      throw new Error("invalid credentials");
    }
    const ispasswordValid = user.validatePassword(password)
    console.log(ispasswordValid)

    if (ispasswordValid) {

      const token  = await user.getJWT()
      res.cookie("token", token ,{
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
      });
      res.status(200).json({ data : {"token":token}, message: "login successfull" , success: true , error : null})
    } else {
      throw new Error("Invalid credentials" );
    } 
  } catch (err) {
    res.status(400).send("error :" + err.message);
  }
});


authRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    validateSignUpData(req);
    
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    console.error(err); // helpful for debugging
    res.status(400).send({ error: "Error saving user", message: err.message });
  }
});


authRouter.post("/logout" , async (req , res)=>{
    res.cookie("token", null , { 
        expires : new Date(Date.now())
    })
    res.send();
})


module.exports = authRouter;