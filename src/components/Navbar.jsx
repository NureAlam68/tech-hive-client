import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiChip } from "react-icons/hi";
import { BiNetworkChart } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import "./NavBar.css";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full bg-[#e9e6e3] dark:bg-slate-900 shadow-sm z-50 dark:border-b dark:border-b-slate-600">
        <div className="navbar px-4 lg:gap-2 md:px-8 2xl:px-0 rounded-[16px] py-2 max-w-[1600px] mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/" className="text-base">
                    Home
                  </NavLink>
                </li>
                <li>
                  <Link to="/products" className="text-base">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost gap-2 normal-case">
              <div className="relative">
                {/* Main icon */}
                <HiChip className="text-3xl text-primary" />
                {/* Secondary icon for added depth */}
                <BiNetworkChart className="text-lg text-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-xl">
                  <span className="text-primary">Tech</span>
                  <span className="text-accent">Hive</span>
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Innovation Hub
                </span>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1 gap-6">
              <li>
                <NavLink
                  to="/"
                  className="text-base hover:text-primary hover:bg-base-200 font-medium"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="text-base hover:text-primary hover:bg-base-200 font-medium"
                >
                  Products
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <img
              onClick={() => {
                toggleTheme();
              }}
              src={theme == "light" ? toggle_light : toggle_dark}
              alt=""
              className="w-8 cursor-pointer mr-5"
            />
            {!user ? (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary hover:btn-primary hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  {user.photoURL ? (
                    <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                      <img src={user.photoURL} alt={user.displayName} />
                    </div>
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-primary" />
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
                >
                  <li className="menu-title px-4 py-2 text-primary font-semibold">
                    {user.displayName}
                  </li>
                  <div className="divider my-0"></div>
                  {user && !isAdmin && !isModerator && (
                    <li>
                      <Link to="/dashboard/userProfile" className="text-base">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {user && isAdmin && (
                    <li>
                      <Link to="/dashboard/statistics" className="text-base">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {user && isModerator && (
                    <li>
                      <Link
                        to="/dashboard/productReviewQueue"
                        className="text-base"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/">
                      <button onClick={logOut} className="text-base text-error">
                        Logout
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;
