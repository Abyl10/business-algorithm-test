import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { IBirthday } from "../types/types";
import { getBirthdays } from "../requests/birthday";
import { useQuery } from "@tanstack/react-query";

const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const CalendarWithBirthdays: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear] = useState<number>(new Date().getFullYear());

  const { data, isLoading } = useQuery<IBirthday[]>({
    queryKey: ["birthdays", currentMonth],
    queryFn: () => getBirthdays(currentMonth),
  });

  return (
    <div className="p-6">
      <FormControl fullWidth variant="outlined">
        <InputLabel>Month</InputLabel>
        <Select
          label="Month"
          value={currentMonth}
          onChange={(e) =>
            setCurrentMonth(parseInt(e.target.value as string, 10))
          }
        >
          {Array.from({ length: 12 }, (_, index) => (
            <MenuItem key={index} value={index}>
              {new Date(0, index).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <h2 className="my-4">
          Birthdays for{" "}
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-7 gap-4">
            {Array.from(
              { length: daysInMonth(currentMonth, currentYear) },
              (_, i) => {
                const day = i + 1;
                return (
                  <div
                    key={i}
                    className="border p-4 flex flex-col justify-between"
                    style={{ minHeight: "100px", minWidth: "100px" }}
                  >
                    <p>{day}</p>
                    {data &&
                      data
                        .filter(({ birthday }) => {
                          const date = new Date(birthday);
                          return (
                            date.getDate() === day &&
                            date.getMonth() === currentMonth
                          );
                        })
                        .map((birthday, index) => (
                          <div key={index} className="text-xs">
                            {birthday.fullName}
                          </div>
                        ))}
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWithBirthdays;
