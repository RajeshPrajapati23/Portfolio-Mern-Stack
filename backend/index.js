import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import project from "./routes/project-route.js";
import auth from "./routes/auth-route.js";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", auth);
app.use("/api/project", project);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// server/index.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// // const config = require("./config");
// // const authRoutes = require("./routes/auth");
// const User = require("./models/User");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/mernportfolio")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error(err));

// // app.use("/api/auth", authRoutes);

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/register", (req, res) => {
//   User.create({
//     username: req.body.username,
//     password: req.body.password,
//   })
//     .then((todo) => res.json(todo))
//     .catch((err) => res.json(err));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
