// import { Logo } from "./logo";

import SidebarItem from "./sidebar-item";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";

const routes = [
  {
    name: "home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "employee",
    path: "/employee",
    icon: PeopleIcon,
  },
  {
    name: "work-record",
    path: "/work-record",
    icon: WorkIcon,
  },
  {
    name: "calendar",
    path: "/calendar",
    icon: CalendarMonthIcon,
  },
];

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        {/* <Logo /> */}
        logo
      </div>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.name}
            label={route.name}
            href={route.path}
            icon={route.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
