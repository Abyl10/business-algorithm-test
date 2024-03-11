import express from "express";
import {
  addEmployee,
  filterEmployees,
  getEmployee,
  getBirthday,
} from "../controllers/employee.controller";

const router = express.Router();

router.post("/", addEmployee);

router.get("/", filterEmployees);

router.get("/birthday", getBirthday);

router.get("/:id", getEmployee);

export default router;
