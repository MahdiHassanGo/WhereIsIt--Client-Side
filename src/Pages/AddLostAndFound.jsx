import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const AddLostAndFound = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateLost, setDateLost] = useState(new Date());
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Add Lost & Found Item | WhereIsIt";
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    const postType = e.target.postType.value;
    const thumbnail = e.target.thumbnail.value;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const location = e.target.location.value;

    const newItem = {
      postType, thumbnail, title, description, category, location, dateLost,
      username: user?.displayName || "Anonymous User",
      email: user?.email || "Anonymous",
    };

    fetch("https://whereisitserver.vercel.app/lost-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({ title: "Success!", text: "Item added successfully", icon: "success", confirmButtonText: "Ok",
            background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#8B5CF6' });
          e.target.reset();
        } else {
          Swal.fire({ title: "Error!", text: "Failed to add item.", icon: "error", confirmButtonText: "Try Again",
            background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#F43F5E' });
        }
      })
      .catch(() => {
        Swal.fire({ title: "Error!", text: "Something went wrong.", icon: "error", confirmButtonText: "Ok",
          background: '#1E293B', color: '#e2e8f0', confirmButtonColor: '#F43F5E' });
      });
  };

  if (isLoading) return <Loading />;

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
                Add <span className="text-gradient">Lost & Found</span> Item
              </h1>
              <p className="text-slate-400 text-lg">Help someone find their belongings or report a found item</p>
            </div>

            <div className="glass-panel p-8 md:p-10">
              <form onSubmit={handleAddItem} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Post Type</label>
                    <select name="postType" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required>
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                    <select name="category" className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required>
                      <option value="pets">Pets</option>
                      <option value="documents">Documents</option>
                      <option value="gadgets">Gadgets</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Thumbnail (Image URL)</label>
                    <input type="text" name="thumbnail" placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Title</label>
                    <input type="text" name="title" placeholder="Item title"
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                    <textarea name="description" placeholder="Describe the item in detail..."
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 min-h-[100px]" required />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
                    <input type="text" name="location" placeholder="Where was it lost?"
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">Date Lost</label>
                    <DatePicker selected={dateLost} onChange={(date) => setDateLost(date)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50" required />
                  </div>
                </div>
                <button type="submit" className="btn-primary-gradient w-full py-4 text-lg rounded-xl mt-4">
                  Submit Item
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

export default AddLostAndFound;
