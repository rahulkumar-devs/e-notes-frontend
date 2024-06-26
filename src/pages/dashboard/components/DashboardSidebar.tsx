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
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/authReducer";
import { useLogOutUserMutation } from "@/features/api/globalsApi";


export default function DashboardSidebar() {
  const [open, setOpen] = React.useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser, { isLoading, isError }] = useLogOutUserMutation();
 

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

  const handleLogOut = async () => {
    try {
      const response = await logOutUser().unwrap();
      dispatch(logOut());
      console.log( isLoading, isError)
      console.log("Logout successful:", response);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row sticky top-0 right-0 overflow-y-scroll no-scrollbar ">
      <div
        className={`${
          open ? "w-full md:w-40" : "w-full md:w-60"
        } flex flex-col md:h-screen p-3 dark:bg-gray-950 bg-slate-200 text-black dark:text-white shadow duration-300 md:flex-col`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-bold text-white ">Dashboard</h2>
            <button onClick={handleToggleSidebar} className="block">
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
                          isActive ? "dark:bg-gray-800 bg-slate-500" : ""
                        }`
                      }
                    >
                      <item.icon className="w-6 h-6  text-orange-300 dark:text-white " />
                      <span className="text-black dark:text-white ">{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
              <li className="rounded-sm">
                <Button
                  onClick={handleLogOut}
                  className={`flex items-center p-2 space-x-3 rounded-md dark:text-black bg-red-500 `}
                >
                  <FaSignOutAlt className="w-6 h-6 text-orange-300 dark:text-black " />
                  <span className=" dark:text-black">Logout</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
