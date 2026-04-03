import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";  
import { motion } from "framer-motion";
import Loading from "./Loading";

const ItemSection = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("https://whereisitserver.vercel.app/public-lost-items");
        const sortedItems = response.data.slice(0, 6); 
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching lost & found items:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchItems();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-4">
              Latest <span className="text-gradient">Find & Lost</span> Items
            </h2>
            <p className="text-slate-400 text-lg">
              Explore the most recent reports from our community. Every item found is a step closer to a happy reunion.
            </p>
          </div>
          <Link 
            to="/allitems" 
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white transition-all whitespace-nowrap"
          >
            Browse All Items
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card flex flex-col group h-full"
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={item.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={item.title || "Item"}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {item.category || "General"}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-secondary transition-colors line-clamp-1">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                  {item.description || "No description provided."}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">📍</span>
                    {item.location || "Not specified"}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">📅</span>
                    {item.dateLost ? new Date(item.dateLost).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "Unknown date"}
                  </div>
                </div>

                <Link 
                  to={`/items/${item._id}`}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-center hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:border-transparent transition-all duration-300 shadow-lg"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 

export default ItemSection;