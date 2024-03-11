import express from "express";
import {
  getWorkRecords,
  addWorkRecord,
} from "../controllers/work-record.controller";
import { ensureUser, UserRequest } from "../middleware/ensure-user";

const router = express.Router();

router.get("/", getWorkRecords);

router.post("/", ensureUser, (req: UserRequest, res) =>
  addWorkRecord(req, res)
);

export default router;
