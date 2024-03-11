import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import employeeRouter from "./routes/employee.route";
import workRecordRouter from "./routes/work-record.route";
import userRouter from "./routes/user";
import "dotenv/config";
import { authenticateToken } from "./middleware/auth";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employee", authenticateToken, employeeRouter);
app.use("/api/work-record", authenticateToken, workRecordRouter);
app.use("/api/me", authenticateToken, userRouter);

app.get("/api", authenticateToken, (req, res) => {
  res.send("protected route");
});

mongoose
  .connect(process.env.MONGODB_DATABASE!)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
