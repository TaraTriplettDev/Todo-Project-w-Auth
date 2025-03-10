const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const Router = require("./routes/routes");

const app = express();

// CORS

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// setting up express to use json

app.use(express.json());

// accessing the routes

// Router(app);

// assigning the PORT # to a variable

const PORT = 3000;

// connecting the server to the database

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
  console.log(`Server is running on port: ${PORT}`);
});