import api from "./api";

export const addWorkRecord = async (
  employeeId: string,
  description: string
) => {
  return api
    .post("/work-record", { employeeId, description })
    .then((res) => res.data);
};

export const getWorkRecords = async (
  employeeId?: string,
  startDate?: string,
  endDate?: string
) => {
  return api
    .get("/work-record", { params: { employeeId, startDate, endDate } })
    .then((res) => res.data);
};
