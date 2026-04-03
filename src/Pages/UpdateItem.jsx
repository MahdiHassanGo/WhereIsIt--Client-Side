import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const UpdateItem = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemData, setItemData] = useState(null);
  const [dateLost, setDateLost] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    document.title = "Update Item | WhereIsIt";
    fetch(`https://whereisitserver.vercel.app/lost-items/${id}`)
      .then(res => res.json())
      .then(data => {
        setItemData(data);
        setDateLost(new Date(data.dateLost));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItem = {
      postType: e.target.postType.value,
      thumbnail: e.target.thumbnail.value,
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      location: e.target.location.value,
      dateLost,
      contactInfo: {
        name: user?.displayName || "Anonymous User",
        email: user?.email || "Anonymous",
      },
    };

    fetch(`https://whereisitserver.vercel.app/lost-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({ title: "Success!", text: "Item updated successfully", icon: "success", confirmButtonText: "Ok",
            background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#8B5CF6' });
          navigate('/mangeitem');
        } else {
          Swal.fire({ title: "Error!", text: "Failed to update.", icon: "error", confirmButtonText: "Try Again",
            background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#F43F5E' });
        }
      })
      .catch(() => {
        Swal.fire({ title: "Error!", text: "Something went wrong.", icon: "error", confirmButtonText: "Ok",
          background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#F43F5E' });
      });
  };

  if (isLoading || !itemData) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{fontFamily: 'Outfit, sans-serif'}}>
                Update <span className="text-gradient">Item</span>
              </h1>
              <p className="text-slate-400 text-lg">Edit the details of your reported item</p>
            </div>

            <div className="glass-panel p-8 md:p-10">
              <form onSubmit={handleUpdateItem} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Post Type</label>
                    <select name="postType" defaultValue={itemData.postType}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required>
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                    <select name="category" defaultValue={itemData.category}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required>
                      <option value="pets">Pets</option>
                      <option value="documents">Documents</option>
                      <option value="gadgets">Gadgets</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Thumbnail URL</label>
                    <input type="text" name="thumbnail" defaultValue={itemData.thumbnail}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                    <input type="text" name="title" defaultValue={itemData.title}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                    <textarea name="description" defaultValue={itemData.description}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 min-h-[100px]" required />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
                    <input type="text" name="location" defaultValue={itemData.location}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Date Lost</label>
                    <DatePicker selected={dateLost} onChange={(date) => setDateLost(date)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                </div>

                {/* Contact Info (read-only) */}
                <div className="glass-panel p-4 mt-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Contact Information</p>
                  <p className="text-slate-300 text-sm">👤 {user?.displayName || "Anonymous"}</p>
                  <p className="text-slate-400 text-sm">📧 {user?.email || "Anonymous"}</p>
                </div>

                <button type="submit" className="btn-primary-gradient w-full py-4 text-lg rounded-xl mt-4">
                  Update Item
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateItem;
