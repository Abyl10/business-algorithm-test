import { Request, Response } from "express";
import { Employee } from "../models/employee.model";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const filterEmployees = async (req: Request, res: Response) => {
  const {
    personalId,
    fullName,
    phoneNumber,
    page = 1,
    limit = 100,
  } = req.query;
  let filter = {};
  if (personalId) {
    filter = { ...filter, personalId: personalId };
  }
  if (fullName) {
    filter = { ...filter, fullName: new RegExp(fullName as string, "i") };
  }
  if (phoneNumber) {
    filter = { ...filter, phoneNumber: phoneNumber };
  }
  try {
    const employees = await Employee.find(filter);
    res.json(employees);
  } catch (error) {
    res.status(500).send({ message: "Error fetching employees", error: error });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getBirthday = async (req: Request, res: Response) => {
  const month = parseInt(req.query.month as string);
  try {
    const employeesWithBirthdays = await Employee.aggregate([
      {
        $addFields: {
          month: { $month: "$birthday" },
        },
      },
      {
        $match: {
          month: month + 1, // Assuming month query is 0-indexed; adjust if it's already 1-indexed
        },
      },
      {
        $project: {
          fullName: 1,
          birthday: 1,
          month: 1, // Including this for debugging; consider removing it later
        },
      },
    ]);

    res.json(employeesWithBirthdays);
  } catch (error: any) {
    res.status(500).send({
      message: "Error fetching employees' birthdays",
      error: error.message,
    });
  }
};
