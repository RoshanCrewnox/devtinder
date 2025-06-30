const validator = require("validator");

const validateSignUpData = (req)=>{
    const {firstName , lastName ,emailId , password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }else if (!validator.isEmail(emailId)){
        throw new Error("email is not valid!");
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong Password!");
    }
}

const validateEditFields = (req) => {
 const EditableFields = ["firstName", "lastName", "about", "skills", "age", "photoUrl"];
  

     const isValidFields = Object.keys(req.body).every((field) => EditableFields.includes(field));
return isValidFields;
}

module.exports = {validateSignUpData,validateEditFields}