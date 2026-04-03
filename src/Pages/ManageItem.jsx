import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../components/useAxiosSecure";

const ManageItem = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Manage Items | WhereIsIt?";
  }, []);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`lost-items?email=${user.email}`, { withCredentials: true })
        .then((res) => setItems(res.data))
        .catch((error) => console.error("Error fetching items:", error))
        .finally(() => setIsLoading(false));
    }
  }, [user?.email]);

  const handleItemDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8B5CF6",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes, delete it!",
      background: '#1E293B',
      color: '#e2e8f0',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://whereisitserver.vercel.app/lost-items/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((response) => {
            if (response.acknowledged) {
              Swal.fire({ title: "Deleted!", text: "Your item has been deleted.", icon: "success",
                background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#8B5CF6' });
              setItems((prev) => prev.filter((item) => item._id !== id));
            }
          })
          .catch(() => Swal.fire({ title: "Error!", text: "Failed to delete.", icon: "error",
            background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#F43F5E' }));
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{fontFamily: 'Outfit, sans-serif'}}>
              Manage <span className="text-gradient">My Items</span>
            </h1>
            <div className="flex justify-center gap-6 mt-4">
              <span className="glass-panel px-4 py-2 text-sm text-slate-300">📧 {user?.email || "Not logged in"}</span>
              <span className="glass-panel px-4 py-2 text-sm text-slate-300">👤 {user?.displayName || "Anonymous"}</span>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="glass-panel p-16 text-center">
              <p className="text-slate-400 text-xl mb-4">No items found</p>
              <p className="text-slate-500">You haven't added any items yet. Try adding some!</p>
            </div>
          ) : (
            <div className="glass-panel overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Item</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Title</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Category</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Status</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Location</th>
                      <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-slate-400 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item) => (
                      <tr key={item._id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <img className="w-10 h-10 rounded-lg object-cover border border-white/10"
                            src={item.thumbnail || "/default-thumbnail.jpg"} alt={item.title} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-200 font-medium">{item.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status === 'recovered'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>{item.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{item.location}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/updateitem/${item._id}`}
                              className="w-9 h-9 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all">
                              <FaEdit size={14} />
                            </Link>
                            <button onClick={() => handleItemDelete(item._id)}
                              className="w-9 h-9 rounded-lg bg-[#F43F5E]/20 border border-[#F43F5E]/30 flex items-center justify-center text-[#F43F5E] hover:bg-[#F43F5E] hover:text-white transition-all">
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageItem;