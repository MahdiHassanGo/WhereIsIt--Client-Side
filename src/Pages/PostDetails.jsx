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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#ffffff",
  borderRadius: 10,
  boxShadow: 24,
  p: 5,
};

const successModalStyle = {
  ...modalStyle,
  width: 350,
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
        const response = await fetch(
          `https://whereisitserver.vercel.app/lost-items/${id}`
        );
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
      const response = await fetch(
        `https://whereisitserver.vercel.app/recover-item/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recoveryData),
        }
      );

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
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen py-10">
      <div className="ml-12">
      <Navbar />
      </div>
  
      <div className="w-full lg:w-10/12 mx-auto py-16 px-6 bg-white shadow-2xl rounded-lg mt-40 mb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Item Image */}
          <div className="flex-shrink-0">
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.title || "Item Thumbnail"}
                className="rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
              />
            )}
          </div>

          {/* Item Details */}
          <div className="flex flex-col justify-start items-start w-full lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{item.title}</h2>
            <p className="text-lg text-gray-600 mb-6">{item.description}</p>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              Status:{" "}
              <span
                className={`${
                  item.status === "recovered" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </p>

            {/* Recovery Button */}
            {item.status !== "recovered" && (
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-gradient-to-l transition duration-300"
                onClick={() => setOpenModal(true)}
              >
                {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
              </button>
            )}
            {item.status === "recovered" && (
              <button
                className="bg-gray-400 text-white py-3 px-6 rounded-full shadow-lg cursor-not-allowed"
                disabled
              >
                Already Recovered
              </button>
            )}

            <Link
              to="/allitems"
              className="bg-gray-300 text-gray-800 py-3 px-6 rounded-full mt-4 shadow-lg hover:bg-gray-400 transition duration-300"
            >
              Back to All Items
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for Recovery Details */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={modalStyle}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recovery Details</h2>
          <p className="text-lg text-gray-700 mb-4">
            <strong>
              {item.postType === "Lost" ? "Found Description" : "Lost Description"}
            </strong>
            : {item.description}
          </p>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={recoveredLocation}
            onChange={(e) => setRecoveredLocation(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
          />
          <label className="block text-gray-700 mb-2">Date</label>
          <DatePicker
            selected={recoveryDate}
            onChange={(date) => setRecoveryDate(date)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
          />
          <p className="text-sm text-gray-600 mb-4">
            <strong>Recovered By:</strong> {user.displayName} ({user.email})
          </p>
          <button
            className="bg-green-600 text-white py-3 px-6 rounded-full w-full hover:bg-green-700 transition duration-300"
            onClick={handleRecover}
            disabled={item.status === "recovered"}
          >
            Submit
          </button>
        </Box>
      </Modal>

      {/* Success Modal */}
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <Box sx={successModalStyle}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-lg text-gray-700 mb-4">
            Your item has been successfully marked as recovered!
          </p>
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-gradient-to-l transition duration-300"
            onClick={() => setOpenSuccessModal(false)}
          >
            Close
          </button>
        </Box>
      </Modal>

      <Footer />
    </div>
  );
};

export default PostDetails;
