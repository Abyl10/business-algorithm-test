import React, { useState } from "react";
import { CustomModal, DataTable } from "../components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { filterEmployees, getEmployeeById } from "../requests/employee";
import { IEmployee } from "../types/types";
import { TextField } from "@mui/material";
import useDebounceSearch from "../hooks/useDebounceSearch";

const columns = [
  { id: "fullName", label: "ФИО" },
  { id: "personalId", label: "ИИН" },
  { id: "phoneNumber", label: "Телефон" },
];

const Employee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [nameQuery, setNameQuery] = useState<string>("");
  const debounceSearch = useDebounceSearch(nameQuery, 500);
  const { data: employees } = useQuery({
    queryKey: ["employees", debounceSearch],
    queryFn: () => filterEmployees({ fullName: nameQuery }),
  });
  const queryClient = useQueryClient();


  const tableRows = employees?.map((employee: IEmployee) => ({
    fullName: employee.fullName,
    personalId: employee.personalId,
    phoneNumber: employee.phoneNumber,
    id: employee._id,
  }));

  const handleRowClick = async (row: {
    [key: string]: string | number | boolean;
  }) => {
    const fetchedEmployee = await queryClient.fetchQuery({
      queryKey: ["employee", row.id],
      queryFn: () => getEmployeeById(row.id as string),
    });

    setSelectedEmployee(fetchedEmployee);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Страница сотрудников</h1>
      <TextField
        id="outlined-basic"
        label="ФИО сотрудника"
        variant="outlined"
        placeholder="Поиск сотрудника ФИО"
        fullWidth
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
      />
      <DataTable
        columns={columns}
        rows={tableRows || []}
        onRowClick={handleRowClick}
      />
      <CustomModal
        open={isModalOpen}
        onClose={handleModalClose}
        size={{
          width: "400px",
          height: "400px",
        }}
      >
        {selectedEmployee ? (
          <div className="flex flex-col gap-y-4">
            <p className="flex items-center justify-between">
              <strong>ФИО:</strong> <span>{selectedEmployee.fullName}</span>
            </p>
            <p className="flex items-center justify-between">
              <strong>ИИН:</strong> <span>{selectedEmployee.personalId}</span>
            </p>
            <p className="flex items-center justify-between">
              <strong>Телефон:</strong>{" "}
              <span>{selectedEmployee.phoneNumber}</span>
            </p>
            <p className="flex items-center justify-between">
              <strong>Email:</strong> <span>{selectedEmployee.email}</span>
            </p>
            <p className="flex items-center justify-between">
              <strong>Адрес:</strong> <span>{selectedEmployee.address}</span>
            </p>
            <p className="flex items-center justify-between">
              <strong>День рождения:</strong>{" "}
              <span>
                {new Date(selectedEmployee.birthday).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </CustomModal>
    </div>
  );
};

export default Employee;
