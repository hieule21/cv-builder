require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

//Plugins
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("assets"));
app.use(express.urlencoded());

//Routes
app.use("/auth", authRouter);

//Connect database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (res) => {
  console.log("Server is running...");
});
