const express = require("express");
const {
  getAllUser,
  regUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();
// get all user || get
router.get("/all-users", getAllUser);
// reg user || Post
router.post("/register", regUser);
// login user || post
router.post("/login", loginUser);

module.exports = router;
