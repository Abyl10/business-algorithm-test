import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";

interface IOption {
  value: string | number;
  label: string;
}

interface ICustomSelectProps {
  options: IOption[];
  multiple?: boolean;
  label?: string; // Optional label for the select
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  multiple = false,
  label,
}) => {
  const [selectedValue, setSelectedValue] = useState<string[] | string>(
    multiple ? [] : ""
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const value = event.target.value;
    setSelectedValue(
      multiple ? (value as string[]).map((item) => item) : value
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FormControl fullWidth>
      {label && <InputLabel id="demo-multiple-name-label">{label}</InputLabel>}
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        multiple={multiple}
        value={selectedValue}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
