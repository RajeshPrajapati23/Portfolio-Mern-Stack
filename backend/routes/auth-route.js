import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { Login } from "../controllers/Admin-controller.js";

const router = express.Router();

router.post("/admin/login", Login);
export default router;

// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }
//     user = new User({ name, email, password });
//     console.log("user", user);
//     // const salt = await bcrypt.genSalt(10);
//     // user.password = await bcrypt.hash(password, salt);

//     await user.save();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });
