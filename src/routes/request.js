const express = require("express");
const User = require("../models/user.js");
var jwt = require('jsonwebtoken');
const {userAuth} = require("../middlewares/auth");
const requestRouter = express.Router();

const cookieParser = require('cookie-parser');