import { useEffect, useState } from "react";
import {
  Home,
  Users,
  BarChart,
  PlusCircle,
  Package,
  ClipboardCheck,
  Gift,
  UserCircle,
  Flag,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import { Toaster } from "react-hot-toast";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import useAuth from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const role = isAdmin ? "Admin" : isModerator ? "Moderator" : "User";

  const navLinkClasses = (isActive) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-blue-700 text-white shadow-lg"
        : "text-slate-600 hover:bg-blue-50"
    }`;

  const menuItems = {
    User: [
      {
        to: "/dashboard/userProfile",
        icon: <UserCircle size={20} />,
        label: "My Profile",
      },
      {
        to: "/dashboard/addProduct",
        icon: <PlusCircle size={20} />,
        label: "Add Product",
      },
      {
        to: "/dashboard/myProducts",
        icon: <Package size={20} />,
        label: "My Products",
      },
    ],
    Moderator: [
      {
        to: "/dashboard/productReviewQueue",
        icon: <ClipboardCheck size={20} />,
        label: "Review Queue",
      },
      {
        to: "/dashboard/reportedContents",
        icon: <Flag size={20} />,
        label: "Reported Contents",
      },
    ],
    Admin: [
      {
        to: "/dashboard/statistics",
        icon: <BarChart size={20} />,
        label: "Statistics",
      },
      {
        to: "/dashboard/manageUsers",
        icon: <Users size={20} />,
        label: "Manage Users",
      },
      {
        to: "/dashboard/manageCoupons",
        icon: <Gift size={20} />,
        label: "Manage Coupons",
      },
    ],
  };

  return (
    <div className="flex h-screen dark:bg-black">
      <Toaster />
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-100 shadow-lg transform transition-transform duration-300 z-30 lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Dashboard Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">Role: {role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {/* Role-specific menu items */}
              {menuItems[role]?.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => navLinkClasses(isActive)}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="ml-auto opacity-50" />
                </NavLink>
              ))}

              <div className="my-4 border-t border-slate-200" />

              {/* Home link */}
              <NavLink
                to="/"
                className={({ isActive }) => navLinkClasses(isActive)}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
                <ChevronRight size={16} className="ml-auto opacity-50" />
              </NavLink>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-slate-100 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
            >
              <Menu size={24} className="text-slate-600 dark:text-gray-300" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center max-w-md flex-1">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-2.5 text-slate-400 dark:text-gray-500" size={20} />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            {/* <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 relative">
              <Bell size={20} className="text-slate-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button> */}

            {/* Settings */}
            {/* <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700">
              <Settings size={20} className="text-slate-600 dark:text-gray-300" />
            </button> */}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
            >
              <img
                src={theme === "light" ? toggle_light : toggle_dark}
                alt="Theme toggle"
                className="w-5 h-5"
              />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-blue-500" />
                )}
                <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-gray-200">
                  {user.displayName || "User"}
                </span>
              </button>

              {/* User Dropdown Menu */}
              {/* {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-100 dark:border-gray-700 py-1">
                  <a href="/profile" className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-700">
                    Profile
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-700">
                    Settings
                  </a>
                  <div className="border-t border-slate-100 dark:border-gray-700 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-gray-700">
                    Sign out
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 dark:bg-black">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
