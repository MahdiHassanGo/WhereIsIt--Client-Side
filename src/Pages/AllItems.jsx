import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import Aos from "aos";
import axios from "axios"; 
import "aos/dist/aos.css";

import Loading from './../components/Loading';
import Navbar from './../components/Navbar';
import Footer from "../components/Footer";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date"); // Default to sorting by date

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "All Items| WhereIsIt";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
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

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.dateLost) - new Date(a.dateLost);
    }
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-40 w-11/12 mx-auto ">
        <Navbar />
        <div className="hero bg-white px-4 md:px-8 min-h-screen flex flex-col mb-10 mt-10" data-aos="fade-up">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold text-black mt-10">All Find & Lost Items</h1>
            </div>
          </div>

          <div className="search-container text-center mt-6">
            <input
              type="text"
              placeholder="Search by title or location"
              className="input input-bordered md:w-150 text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="text-center mt-6">
            <select
              className="select select-bordered"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>

          {/* Grid Display for Items */}
          <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
            {sortedItems.map((item) => (
              <div
                key={item._id}
                className="card card-compact bg-Card w-full sm:w-80 md:w-96 shadow-xl rounded-lg transition-all transform duration-300 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
              >
                <figure>
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={item.thumbnail || "https://via.placeholder.com/150"}
                    alt={item.title || "Item"}
                  />
                </figure>
                <div className="card-body p-6">
                  <h2 className="card-title text-center text-lg font-bold text-white">{item.title}</h2>
                  <p className="text-sm text-white">{item.description}</p>
                  <p className="text-sm text-white">
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p className="text-sm text-white">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="text-sm text-white">
                    <strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}
                  </p>
                  <Link to={`/items/${item._id}`} className="btn text-white bg-Profile mt-4 w-full">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllItems;
