import React, { useContext, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  
    if (!isMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-Profile shadow-md w-11/12 rounded-full fixed top-0 z-50 mt-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-20"
              src="../../assets/WhereIsIt.png"
              alt="WhereIsIt"
            />
          </Link>

          {/* Hamburger Menu (Mobile View) */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>

          {/* Links */}
          <div
  className={`${
    isMenuOpen ? "block" : "hidden"
  } md:flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0`}
>
  {/* Home */}
  <NavLink
    to="/"
    className={({ isActive }) =>
      isActive
        ? "text-Buttons font-semibold border-b-2 text-xs md:text-sm border-Buttons pb-1"
        : "text-white text-xs md:text-sm hover:text-Buttons"
    }
  >
    Home
  </NavLink>

  {/* Lost & Found Items */}
  <NavLink
    to="/allitems"
    className={({ isActive }) =>
      isActive
        ? "text-Buttons font-semibold border-b-2 text-xs md:text-sm border-Buttons pb-1"
        : "text-white text-xs md:text-sm hover:text-Buttons"
    }
  >
    Lost & Found Items
  </NavLink>
            {/* User Menu */}
            {user && user?.email ? (
              <div className="relative user-menu mt-4 md:mt-0">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user?.photoURL}
                  alt="User Profile"
                  onClick={toggleUserMenu}
                />

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute -left-9 md:right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
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
                    <button
                      onClick={handleLogOut}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-black"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <FaUser className="text-white" />
            )}
          </div>

          {/* Login/Logout */}
          <div className="flex items-center gap-4">
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
