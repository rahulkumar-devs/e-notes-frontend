import React from "react";
import { NavLink } from "react-router-dom";
import { navbarData } from "./static-data";
import { FaBars, FaTimes } from "react-icons/fa";
import { ModeToggle } from "../Mode-togler";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
const allowedRoles =["admin","member"];
  const { roles } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" dark:bg-gray-800 text-black bg-slate-200  dark:text-white transition-colors duration-300">
      <div className="flex items-center justify-between p-4">
        <h2 className="font-bold text-xl">e-notes</h2>
        <div className="md:hidden">
          <div className=" flex items-center gap-2 md:hidden ">
            <ModeToggle />

            <button onClick={toggleMenu} className="text-xl focus:outline-none">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <div>
            <ModeToggle />
          </div>
          {navbarData &&
            navbarData.map((item) => {
              const isAdmin = roles.find((role) => allowedRoles.includes(role));

              if (item.name === "Dashboard" && !isAdmin) {
                return null;
              }

              return (
                <NavLink
                  to={item.path}
                  key={item.name}
                  className="hover:text-blue-500"
                  // activeClassName="text-blue-500"
                >
                  {item.name}
                </NavLink>
              );
            })}
        </div>
      </div>

      {/* mobile navbar */}

      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 md:hidden absolute bg-slate-200 right-0 w-full flex flex-col dark:bg-gray-900 dark:text-white`}
      >
        {navbarData &&
          navbarData.map((item) => {
            const isAdmin = roles.find((role) =>allowedRoles.includes(role));

            if (item.name === "Dashboard" && !isAdmin) {
              return null;
            }

            return (
              <NavLink
                to={item.path}
                key={item.name}
                className="hover:text-blue-500 py-2 px-4"
                onClick={toggleMenu}
              >
                {item.name}
              </NavLink>
            );
          })}
      </div>
    </nav>
  );
};

export default Navbar;
