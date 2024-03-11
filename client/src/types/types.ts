export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm {
  username: string;
  password: string;
  email: string;
}

export interface IEmployee {
  _id: string;
  personalId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  birthday: Date;
}

export interface IBirthday {
  fullName: string;
  birthday: Date;
  month: number;
  _id: string;
}

export interface IWorkRecord {
  employeeId: { username: string; _id: string };  // created by this employee;
  description: string;
  date: Date;
  _id: string;
}

export interface IUser {
  username: string; 
  email: string;
  _id: string;
}