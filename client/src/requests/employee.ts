import { IEmployee } from "../types/types";
import api from "./api";

export const filterEmployees = async (params: {
  personalId?: string;
  fullName?: string;
  phoneNumber?: string;
}): Promise<IEmployee[]> => {
  const response = await api.get("/employee", { params });
  return response.data;
};

export const getEmployeeById = async (id: string): Promise<IEmployee> => {
  return await api.get(`/employee/${id}`).then((res) => res.data);
};
