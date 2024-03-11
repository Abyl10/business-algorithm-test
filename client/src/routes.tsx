import React from "react";
import { Calendar, Home, WorkRecord, Employee } from "./pages";
import { ProtectedRoute } from "./components";

interface IRoute {
  name: string;
  path: string;
  component: React.ReactElement;
  isProtected?: boolean;
}

export const ROUTES: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: <ProtectedRoute component={<Home />} />,
    isProtected: true,
  },
  {
    name: "Calendar",
    path: "/calendar",
    component: <ProtectedRoute component={<Calendar />} />,
    isProtected: true,
  },
  {
    name: "Work Record",
    path: "/work-record",
    component: <ProtectedRoute component={<WorkRecord />} />,
    isProtected: true,
  },
  {
    name: "Employee",
    path: "/employee",
    component: <ProtectedRoute component={<Employee />} />,
    isProtected: true,
  },
];

export default ROUTES;
