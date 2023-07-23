const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
// get all user

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json({
      userCount: allUser.length,
      success: true,
      allUser,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "req failed",
    });
  }
};
// create user / reg user
exports.regUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please enter credentials",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // saving user
    // const user= new userModel({username,email,password}).save
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in registeration",
      error,
    });
  }
};
// login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "email is not registered",
      });
    }
    // password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }
    return res.status(200).json({
      success: true,
      message: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error in call back",
      error,
    });
  }
};
