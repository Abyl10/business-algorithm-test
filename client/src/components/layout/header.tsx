import React from "react";
import { useUserContext } from "../../context/user-context";
import { Button } from "@mui/material";
import { removeToken } from "../../lib/token";

const Header: React.FC = () => {
  const { user } = useUserContext();

  const handleLogOutClick = () => {
    removeToken();
    window.location.href = "/login";
  };

  return (
    <header className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex justify-end w-full md:mr-56">
        <div className="flex items-center gap-x-5">
          <div>Welcome, {user?.username}!</div>
          <Button
            variant="contained"
            color="warning"
            onClick={handleLogOutClick}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
