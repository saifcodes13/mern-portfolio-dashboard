import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Admin Header */}
      <div className="border-b border-purple-500/20 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-400">Admin Panel</h1>
      </div>

      {/* Admin Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
