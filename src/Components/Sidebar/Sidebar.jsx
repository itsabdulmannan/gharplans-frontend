import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../Utils/routes";
import sideBarImage from "../../assets/sidebar-3.482940f2.jpg";
import { MdMenuOpen } from "react-icons/md";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <nav
      className={`relative shadow-md h-screen p-2 flex flex-col duration-500 text-white ${
        open ? "w-70" : "w-16"
      }`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${sideBarImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-10 bg-black bg-opacity-75"></div>
      </div>

      <div className="relative z-20">
        <div className="px-3 py-2 h-20 flex items-center relative">
        <Link to="/dashboard" className="flex items-center gap-2">
          <span
            className={`transition-all duration-500 ease-in-out transform ${
              open
                ? "opacity-100 scale-100 translate-x-0 text-2xl"
                : "opacity-0 scale-90 -translate-x-10"
            }`}
          >
            GharPlans
          </span>
        </Link>
          <MdMenuOpen
            size={34}
            className={`absolute right-3 duration-500 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <hr className="" />
        <ul className="flex-1">
          {routes.map((item, index) => (
            <li
              key={index}
              className={`px-3 py-2 my-2 hover:bg-primary rounded-md duration-300 cursor-pointer flex gap-2 items-center ${
                location.pathname === item.path ? "bg-primary" : ""
              }`}
            >
              <Link to={item.path} className="flex items-center gap-2">
                <div>{item.icon}</div>
                <span
                  className={`${
                    !open && "hidden"
                  } duration-500 overflow-hidden whitespace-nowrap`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
