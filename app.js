const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cleanerRoutes = require("./routes/cleaner");
const emailRoutes = require("./routes/email");
const userRoutes = require("./routes/user");
const errorHandler = require("./middleWare/error-middleware");
const dotenv = require("dotenv").config();

const app = express();

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use("/images", express.static(path.join(__dirname, "./images")));
// app.use(express.static(path.join(__dirname, "../dist/cleanshop")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes
app.use("/api/cleaner", cleanerRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/user", userRoutes);
app.use("/", (req, res) => {
  // res.sendFile(__dirname + "/dist/cleanshop/index.html");
  res.send("Home Page");
});

// Error Middleware
// app.use(errorHandler);

module.exports = app;
