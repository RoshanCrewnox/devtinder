const express = require("express");
const User = require("../models/user.js");
const profileRouter = express.Router();
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {userAuth} = require("../middlewares/auth");
const {validateEditFields} = require("../utils/validation")

profileRouter.get("/profile" , userAuth , async ( req , res)=>{
   try{
   const cookies = req.cookies
   console.log(cookies)
   const {token} = cookies

      const decodedData = await jwt.verify(token ,"secretkey" );
      const _id= decodedData._id;
      console.log("user id : ",_id)
      const user = await User.findOne({_id})  

     res.send(user)
   }catch(err){
    res.status(400).send("error agya re bawa :" , err?.message)
   }
})

profileRouter.patch("/profile/edit" , userAuth , async(req , res)=>{
    try{
       
      
        if(!validateEditFields(req)){
             throw new Error("These fields are not allowed");
        }
      const loggedInUser =  await req.user ;
     
      Object.keys(req.body).forEach((key) => {
  loggedInUser[key] = req.body[key];
});

    await loggedInUser.save()
      res.json({"data": loggedInUser})
    }catch(err){
       res.status(400).send("error agya :" + err.message);
    }
})



module.exports = profileRouter;