import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { addWorkRecord, getWorkRecords } from "../requests/work-record";
import { IEmployee, IWorkRecord } from "../types/types";
import { CustomModal, DataTable } from "../components";
import { Button, TextField } from "@mui/material";
import { useUserContext } from "../context/user-context";
import toast from "react-hot-toast";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRange } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const columns = [
  { id: "employeeId", label: "Сотрудник" },
  { id: "date", label: "Дата" },
  { id: "description", label: "Описание" },
];

const WorkRecord: React.FC = () => {
  const queryClient = new QueryClient();

  const { user } = useUserContext();
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs("2024-03-01"),
    dayjs("2024-03-22"),
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const { data: records, isLoading } = useQuery({
    queryKey: [
      "work-records",
      selectedEmployee?._id,
      value[0]?.toISOString(),
      value[1]?.toISOString(),
    ],
    queryFn: () =>
      getWorkRecords(
        selectedEmployee?._id,
        value[0]?.toISOString(),
        value[1]?.toISOString()
      ),
  });

  const { mutate } = useMutation({
    mutationFn: () => addWorkRecord(user!._id, description),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Запись добавлена");
      handleModalClose();
    },
  });


  const recordsRows =
    records &&
    records.map((record: IWorkRecord) => ({
      employeeId: record.employeeId.username,
      date: new Date(record.date).toLocaleDateString(),
      description: record.description,
      id: record._id,
    }));

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDescription("");
  };

  const handleAddWorkRecord = () => {
    if (!user?._id) {
      toast.error("Ошибка при добавлении записи");
      return;
    }
    if (!description) {
      toast.error("Введите описание");
      return;
    }
    mutate();
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="mb-4 flex justify-end">
            <Button variant="contained" onClick={handleModalOpen}>
              Add employee
            </Button>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
              <DemoItem label="Controlled picker" component="DateRangePicker">
                <DateRangePicker
                  value={value}
                  onChange={(newValue: DateRange<Dayjs>) => setValue(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <div className="mt-6">
            <DataTable columns={columns} rows={recordsRows || []} />
          </div>

          {isModalOpen && (
            <CustomModal
              onClose={handleModalClose}
              open={isModalOpen}
              size={{ width: "500px", height: "380px" }}
            >
              <div className="flex flex-col justify-between ">
                <div className="mb-20">
                  <h1 className="text-2xl font-bold mb-4">Добавить запись</h1>
                  <TextField
                    id="description"
                    label="Описание"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={5}
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleAddWorkRecord}
                >
                  Добавить
                </Button>
              </div>
            </CustomModal>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkRecord;
