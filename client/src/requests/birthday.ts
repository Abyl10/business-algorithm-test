import api from "./api";
import { IBirthday } from "../types/types";

export const getBirthdays = async (month: number): Promise<IBirthday[]> => {
  return await api
    .get(`/employee/birthday?month=${month}`)
    .then((res) => res.data);
};
