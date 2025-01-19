import  { useState } from 'react';
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
  Menu
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = 'User'; 

  const navLinkClasses = (isActive) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? 'bg-blue-700 text-white shadow-lg'
        : 'text-slate-600 hover:bg-blue-50'
    }`;

  const menuItems = {
    User: [
      { to: '/dashboard/userProfile', icon: <UserCircle size={20} />, label: 'My Profile' },
      { to: '/dashboard/addProduct', icon: <PlusCircle size={20} />, label: 'Add Product' },
      { to: '/dashboard/myProducts', icon: <Package size={20} />, label: 'My Products' },
    ],
    Moderator: [
      { to: '/dashboard/productReviewQueue', icon: <ClipboardCheck size={20} />, label: 'Review Queue' },
      { to: '/dashboard/reportedContents', icon: <Flag size={20} />, label: 'Reported Contents' },
    ],
    Admin: [
      { to: '/dashboard/statistics', icon: <BarChart size={20} />, label: 'Statistics' },
      { to: '/dashboard/manageUsers', icon: <Users size={20} />, label: 'Manage Users' },
      { to: '/dashboard/manageCoupons', icon: <Gift size={20} />, label: 'Manage Coupons' },
    ],
  };

  return (
    <div className="flex h-screen bg-blue-950">
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
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
        <header className="h-16 border-b border-slate-100 bg-white flex items-center px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={24} className="text-slate-600" />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
