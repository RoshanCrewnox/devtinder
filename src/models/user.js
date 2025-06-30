const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  photoUrl :{
   type : String
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender not valid");
      }
    },
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address : " + value);
      }
    },
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  about:{
    type : String,
    maxlength : 30,
  },
  skills :{
    type :Array ,
  }
});



userSchema.methods.validatePassword = async function (userInputPassword){

const password = userInputPassword;
const userPassword = this.password;
const ispasswordValid = await bcrypt.compare(password, userPassword);
return ispasswordValid

}

userSchema.methods.getJWT = async function (){
const user = this;
  const token =await jwt.sign({_id : user._id}, "secretkey" , { expiresIn: "7d"})
 return token 
 
}
module.exports = mongoose.model("User", userSchema);
