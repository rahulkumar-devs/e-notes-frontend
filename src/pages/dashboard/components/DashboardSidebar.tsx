import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  // FaHome,
  // FaEnvelope,
  // FaBox,
  // FaCog,
  FaSignOutAlt,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import dashboardSidebar from "./static-data";

export default function DashboardSidebar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col md:flex-row sticky top-0 right-0">
      <div
        className={`${
          open ? "w-full md:w-40" : "w-full md:w-60"
        } flex flex-col md:h-screen p-3 bg-black shadow duration-300 md:flex-col`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-bold text-white ">Dashboard</h2>
            <button onClick={handleToggleSidebar} className="block md:hidden">
              <FaBars className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className={` ${!open ? "hidden md:block" : "block"} relative `}>
            <span className="absolute inset-y-0 left-0 flex items-center py-4">
              <button
                type="submit"
                className="p-2 focus:outline-none focus:ring"
              >
                <FaSearch className="w-6 h-6" />
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
            />
          </div>
          <div
            className={`${
              !open ? "hidden md:block" : "block"
            } flex-1 flex md:flex-col overflow-x-auto md:overflow-visible`}
          >
            <ul className="flex flex-col space-x-1 gap-2 flex-initial md:space-y-1 md:space-x-0 text-sm">
              {dashboardSidebar.map((item) => {
                return (
                  <li className="rounded-sm" key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center p-2 space-x-3 rounded-md ${
                          isActive ? "bg-gray-800" : ""
                        }`
                      }
                    >
                      <item.icon className="w-6 h-6 text-gray-100" />
                      <span className="text-gray-100">{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
              <li className="rounded-sm">
                <NavLink
                  to="/dashboard/logout"
                  className={({ isActive }) =>
                    `flex items-center p-2 space-x-3 rounded-md ${
                      isActive ? "bg-gray-800" : ""
                    }`
                  }
                >
                  <FaSignOutAlt className="w-6 h-6 text-gray-100" />
                  <span className="text-gray-100">Logout</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
