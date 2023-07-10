const userModel = require("../Models/userModel");

// get all user

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await userModel.find();
    return res.status(200).json({
      sucess: true,
      allUser,
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
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
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }
    // saving user
    // const user= new userModel({username,email,password}).save
    const user = new userModel({ username, email, password });
    await user.save();
    return res.status(200).json({
      sucess: true,
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
exports.loginUser = async (req, res) => {};
