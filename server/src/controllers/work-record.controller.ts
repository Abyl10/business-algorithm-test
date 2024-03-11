import { Request, Response } from "express";
import { WorkRecord } from "../models/work-record.model";
import { UserRequest } from "../middleware/ensure-user";
import { Employee } from "../models/employee.model";

export const getWorkRecords = async (req: Request, res: Response) => {
  const { employeeId, startDate, endDate } = req.query;
  const query: any = {};
  if (employeeId) {
    query.employeeId = employeeId;
  }
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate as string),
      $lte: new Date(endDate as string),
    };
  }

  try {
    const workRecords = await WorkRecord.find(query).populate(
      "employeeId",
      "username"
    );
    res.send(workRecords);
  } catch (error: any) {
    res
      .status(500)
      .send({ message: "Error fetching work records", error: error.message });
  }
};

export const addWorkRecord = async (req: UserRequest, res: Response) => {
  const { employeeId, description } = req.body;

  const createdBy = req.user?.userId;
  try {
    const newWorkRecord = new WorkRecord({
      employeeId,
      description,
      createdBy,
    });

    await newWorkRecord.save();
    res.status(201).send(newWorkRecord);
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Error creating work record", error: error.message });
  }
};
