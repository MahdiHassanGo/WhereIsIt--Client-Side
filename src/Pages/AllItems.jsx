import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios"; 
import { motion } from "framer-motion";
import Loading from './../components/Loading';
import Navbar from './../components/Navbar';
import Footer from "../components/Footer";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "All Items | WhereIsIt";
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://whereisitserver.vercel.app/lost-items", { withCredentials: true });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching lost & found items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "date") return new Date(b.dateLost) - new Date(a.dateLost);
    if (sortOption === "title") return a.title.localeCompare(b.title);
    if (sortOption === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
              All <span className="text-gradient">Lost & Found</span> Items
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Browse through all reported items. Use search and sort to find what you're looking for.
            </p>
          </motion.div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <input
              type="text"
              placeholder="🔍  Search by title or location..."
              className="w-full sm:w-96 px-6 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-6 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all cursor-pointer"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>

          {/* Items Grid */}
          {sortedItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">No items found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card group flex flex-col h-full overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={item.title || "Item"}
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#8B5CF6]/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.category || "General"}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#06B6D4] transition-colors" style={{fontFamily: 'Outfit, sans-serif'}}>
                      {item.title}
                    </h2>
                    <p className="text-slate-400 text-xs mb-3 line-clamp-2 flex-grow">{item.description}</p>
                    <div className="space-y-1 mb-4 text-xs text-slate-300">
                      <p>📍 {item.location || "Not specified"}</p>
                      <p>📅 {new Date(item.dateLost).toLocaleDateString()}</p>
                    </div>
                    <Link
                      to={`/items/${item._id}`}
                      className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center text-sm hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#06B6D4] hover:border-transparent transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllItems;
