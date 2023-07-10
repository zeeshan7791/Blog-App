const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv.config({path:"./path name" }); if dotenv is in anther folder
dotenv.config();

const userRoute = require("./routes/userRouter");
// DB connection

connectDB();
// rest object
const app = express();

// adding middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// creating routes
app.use("/api/v1/user", userRoute);
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "node server",
//   });
// });

// port
const PORT = process.env.PORT;
const DEV_MODE = process.env.DEV_MODE;
// listen server

app.listen(PORT, () => {
  console.log(
    `server is running on ${DEV_MODE} mode port no ${PORT}`.bgBlue.white
  );
});