const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    const decodedObj = await jwt.verify(token, "secretkey");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("error"+ err.message);
  }
};

module.exports = {
  userAuth,
};
