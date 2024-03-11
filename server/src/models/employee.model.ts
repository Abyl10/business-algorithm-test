import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  personalId: String,
  fullName: String,
  phoneNumber: String,
  email: String,
  address: String,
  birthday: Date,
});

export const Employee = mongoose.model("Employee", employeeSchema);
