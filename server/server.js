const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Router = require("./routes/routes");

app.use(express.json());
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

Router(app);

// assigning the PORT # to a variable

const PORT = 3000;

// connecting the server to the database

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
  console.log(`Server is running on port: ${PORT}`);
});
