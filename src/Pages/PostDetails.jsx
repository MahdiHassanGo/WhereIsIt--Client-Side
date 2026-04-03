import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#1E293B",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
  p: 5,
};

const successModalStyle = {
  ...modalStyle,
  width: 380,
};

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const [recoveredLocation, setRecoveredLocation] = useState("");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://whereisitserver.vercel.app/lost-items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  const handleRecover = async () => {
    if (item.status === "recovered") {
      toast.error("This item has already been marked as recovered.");
      return;
    }
    const recoveryData = {
      recoveredLocation,
      recoveryDate,
      recoveredByEmail: user.email,
      recoveredByName: user.displayName,
      thumbnail: item.thumbnail,
    };
    try {
      const response = await fetch(`https://whereisitserver.vercel.app/recover-item/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recoveryData),
      });
      if (response.ok) {
        toast.success("Item successfully marked as recovered!");
        setItem({ ...item, status: "recovered" });
        setOpenModal(false);
        setOpenSuccessModal(true);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to recover the item.");
      }
    } catch (error) {
      console.error("Error recovering item:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isLoading || !item) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Image */}
              {item.thumbnail && (
                <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={item.thumbnail}
                    alt={item.title || "Item Thumbnail"}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{fontFamily: 'Outfit, sans-serif'}}>
                  {item.title}
                </h2>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>

                <div className="glass-panel p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      item.status === "recovered"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  {item.category && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Category</span>
                      <span className="text-slate-200 text-sm">{item.category}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Location</span>
                      <span className="text-slate-200 text-sm">{item.location}</span>
                    </div>
                  )}
                  {item.dateLost && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Date</span>
                      <span className="text-slate-200 text-sm">{new Date(item.dateLost).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {item.status !== "recovered" ? (
                    <button
                      className="btn-primary-gradient px-8 py-3 rounded-xl text-base"
                      onClick={() => setOpenModal(true)}
                    >
                      {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
                    </button>
                  ) : (
                    <button className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed" disabled>
                      Already Recovered
                    </button>
                  )}
                  <Link to="/allitems" className="btn-outline-glass px-8 py-3 rounded-xl">
                    ← Back to All Items
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Recovery Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h2 className="text-2xl font-bold text-white mb-6" style={{fontFamily: 'Outfit, sans-serif'}}>Recovery Details</h2>
          <p className="text-slate-300 mb-6 text-sm leading-relaxed">
            <strong className="text-slate-100">{item.postType === "Lost" ? "Found Description" : "Lost Description"}:</strong>{" "}
            {item.description}
          </p>
          <label className="block text-slate-300 text-sm font-medium mb-2">Recovery Location</label>
          <input
            type="text"
            value={recoveredLocation}
            onChange={(e) => setRecoveredLocation(e.target.value)}
            placeholder="Where was it recovered?"
            className="w-full px-4 py-3 rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
          />
          <label className="block text-slate-300 text-sm font-medium mb-2">Recovery Date</label>
          <DatePicker
            selected={recoveryDate}
            onChange={(date) => setRecoveryDate(date)}
            className="w-full px-4 py-3 rounded-xl text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50"
          />
          <p className="text-slate-400 text-xs mb-6">
            Recovered by: <span className="text-slate-200">{user.displayName} ({user.email})</span>
          </p>
          <button
            className="btn-primary-gradient w-full py-3 rounded-xl text-base"
            onClick={handleRecover}
            disabled={item.status === "recovered"}
          >
            Submit Recovery
          </button>
        </Box>
      </Modal>

      {/* Success Modal */}
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <Box sx={successModalStyle}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3" style={{fontFamily: 'Outfit, sans-serif'}}>Success!</h2>
            <p className="text-slate-300 mb-6">Item has been successfully marked as recovered.</p>
            <button
              className="btn-primary-gradient w-full py-3 rounded-xl"
              onClick={() => setOpenSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default PostDetails;
