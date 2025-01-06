import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
