import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import useAxiosSecure from "../components/useAxiosSecure";
import { motion } from "framer-motion";

const RecoveredItem = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(true);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Recovered Items | WhereIsIt?";
    if (user?.email) {
      axiosSecure
        .get(`/recovered-items?email=${user.email}`, { withCredentials: true })
        .then((res) => setItems(res.data))
        .catch((error) => console.error("Error fetching recovered items:", error))
        .finally(() => setIsLoading(false));
    }
  }, [user?.email]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{fontFamily: 'Outfit, sans-serif'}}>
              My <span className="text-gradient">Recovered</span> Items
            </h1>
            <div className="flex justify-center gap-6 mt-4 mb-8">
              <span className="glass-panel px-4 py-2 text-sm text-slate-300">📧 {user?.email}</span>
              <span className="glass-panel px-4 py-2 text-sm text-slate-300">👤 {user?.displayName}</span>
            </div>

            {/* View Toggle */}
            <div className="inline-flex items-center gap-3 glass-panel px-4 py-2">
              <span className={`text-sm ${isCardView ? 'text-white' : 'text-slate-500'}`}>Cards</span>
              <button
                onClick={() => setIsCardView(!isCardView)}
                className={`relative w-12 h-6 rounded-full transition-colors ${isCardView ? 'bg-[#8B5CF6]/50' : 'bg-[#06B6D4]/50'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isCardView ? 'left-1' : 'left-7'}`}></span>
              </button>
              <span className={`text-sm ${!isCardView ? 'text-white' : 'text-slate-500'}`}>Table</span>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="glass-panel p-16 text-center">
              <p className="text-slate-400 text-xl mb-4">No recovered items yet</p>
              <p className="text-slate-500">Items you help recover will appear here.</p>
            </div>
          ) : isCardView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt="Recovered Item"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      Recovered
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white" style={{fontFamily: 'Outfit, sans-serif'}}>
                      {item.recoveredLocation || "Unknown Location"}
                    </h3>
                    <p className="text-slate-400 text-sm">Recovered by: {item.recoveredByName}</p>
                    <p className="text-slate-400 text-sm">📅 {new Date(item.recoveredAt).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-panel overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Location</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Recovered By</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Date</th>
                      <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item) => (
                      <tr key={item._id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-200">{item.recoveredLocation}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{item.recoveredByName}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{new Date(item.recoveredAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                            {item.status}
                          </span>
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

export default RecoveredItem;