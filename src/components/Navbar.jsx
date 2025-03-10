import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Sun, 
  Moon, 
  ChevronDown, 
  Home,
  Package,
  // CircuitBoard,
  // Network,
  UserCircle,
  LogOut,
  LayoutDashboard,
  Mail,
  User
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import useModerator from '../hooks/useModerator';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown')) {
        setIsProfileOpen(false);
      }
      if (!e.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/about', label: 'About Us', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and primary navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  {/* <div className="relative">
                    <CircuitBoard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <Network className="h-4 w-4 text-gray-600 dark:text-gray-300 absolute -bottom-1 -right-1" />
                  </div> */}
                  <div className="flex flex-col">
                    <span className="text-xl font-bold">
                      <span className="text-indigo-600 dark:text-indigo-400">Tech</span>
                      <span className="text-gray-600 dark:text-gray-300">Hive</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                      Innovation Hub
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex'>
              {/* Desktop Navigation */}
              <div className="hidden lg:ml-8 lg:flex sm:space-x-4">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isActivePath(path)
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </NavLink>
                ))}
              </div>
            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {!user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors duration-200 hidden xl:flex"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative dropdown">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="h-8 w-8 rounded-full ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900">
                        <UserCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    )}
                    <span className="hidden md:flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.displayName}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        {user.displayName}
                      </div>
                      
                      {/* Dashboard links based on role */}
                      {user && (isAdmin || isModerator || true) && (
                        <Link
                          to={
                            isAdmin
                              ? '/dashboard/statistics'
                              : isModerator
                              ? '/dashboard/productReviewQueue'
                              : '/dashboard/userProfile'
                          }
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <LayoutDashboard className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      )}

                      {/* <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link> */}

                      <button
                        onClick={logOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden mobile-menu">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-150 ${
                      isActivePath(path)
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
};

export default Navbar;