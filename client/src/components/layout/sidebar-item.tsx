import React from "react";
import { cn } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface ISidebarItemProps {
  label: string;
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === href;

  const onClick = () => {
    navigate(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 ",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          fontSize="medium"
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
