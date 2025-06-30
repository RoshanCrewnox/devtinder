const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://roshansingh:Sgpv5QtktFXeXIAu@namaste.putwvgi.mongodb.net/devTinder"
  );
};

module.exports =connectDB;

