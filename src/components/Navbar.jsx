import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("Logged out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

 
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (e) => {
    if (!e.target.closest(".user-menu")) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return (
    <div>
      <nav className="bg-Profile shadow-md w-full rounded-full mb-5 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
          
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-20"
              src="../../assets/WhereIsIt.png"
              alt="WhereIsIt"
            />
          </Link>

       
          <div className="nav flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4 md:mt-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-Buttons font-semibold border-b-2 border-Buttons pb-1"
                  : "text-white hover:text-Buttons"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allitems"
              className={({ isActive }) =>
                isActive
                  ? "text-Buttons font-semibold border-b-2 border-Buttons pb-1"
                  : "text-white hover:text-Buttons"
              }
            >
              Lost & Found Items
            </NavLink>

           
            {user && user?.email ? (
              <div className="relative user-menu">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user?.photoURL}
                  alt="User Profile"
                  onClick={toggleMenu}
                />
              
                {isMenuOpen && (
                  <div className="absolute right--1 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4 text-black border-b">
                      {user?.displayName}
                    </div>
                    <NavLink
                      to="/additems"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      Add Lost & Found Item
                    </NavLink>
                    <NavLink
                      to="/recovereditem"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      All Recovered Items
                    </NavLink>
                    <NavLink
                      to="/mangeitem"
                      className="block px-4 py-2 hover:bg-gray-100 text-black"
                    >
                      Manage My Items
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <FaUser className="text-white" />
            )}
          </div>

        
          <div className="login flex items-center gap-4 mt-4 md:mt-0">
            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
