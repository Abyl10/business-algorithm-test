import { IUser } from "../types/types";
import api from "./api";

export const getMe = async (): Promise<IUser> => {
  return api.get("/me").then((res) => res.data);
};
