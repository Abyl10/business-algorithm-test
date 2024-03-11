import express from "express";
import { authenticateToken } from "../middleware/auth";
import { ensureUser } from "../middleware/ensure-user";
import { getMe } from "../controllers/user.controller";

const router = express.Router();

router.get("/", authenticateToken, ensureUser, getMe);

export default router;
