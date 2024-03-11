import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });
  if (user && (await user.comparePassword(password))) {
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "24h" }
    );
    res.json({ accessToken, message: "Login successful" });
  } else {
    res.status(400).json({
      accessToken: null,
      message: "Username or password is incorrect",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    const savedUser = await user.save();
    // message: "User created successfully"
    res.status(201).json(savedUser);
  } catch (e: any) {
    if (e.code === 11000) {
      res.status(409).json({ message: "Username already exists." });
    } else {
      res.status(400).json({ message: e.message });
    }
  }
});

export default router;
