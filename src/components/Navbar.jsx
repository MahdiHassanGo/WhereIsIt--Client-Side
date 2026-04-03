import React, { useContext, useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="flex justify-center w-full relative z-50">
      <nav className="glass-panel w-11/12 md:w-10/12 rounded-full fixed top-6 px-8 py-3 transition-all duration-500 hover:border-white/20">
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-glow group-hover:rotate-12 transition-transform duration-300">
              W
            </div>
            <span className="text-2xl font-heading font-extrabold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
              WhereIsIt<span className="text-secondary">.</span>
            </span>
          </Link>

          {/* ... (rest of NavLinks and User actions) ... */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-200 hover:text-white focus:outline-none transition-colors"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "flex absolute top-16 left-0 right-0 glass-panel flex-col p-4" : "hidden"
            } md:flex md:static md:flex-row md:p-0 items-center gap-6 mt-4 md:mt-0 bg-transparent`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary font-semibold border-b-2 text-sm border-secondary pb-1 tracking-wide"
                  : "text-slate-300 text-sm hover:text-secondary transition-colors tracking-wide"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allitems"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary font-semibold border-b-2 text-sm border-secondary pb-1 tracking-wide"
                  : "text-slate-300 text-sm hover:text-secondary transition-colors tracking-wide"
              }
            >
              Lost & Found Items
            </NavLink>
          </div>

          {/* User Actions */}
          <div className={`relative ${isMenuOpen ? 'flex mt-4 justify-center' : 'hidden md:flex'} items-center gap-4`}>
            {user && user?.email ? (
              <>
                <img
                  className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-primary/50 hover:ring-secondary transition-all shadow-glow"
                  src={user?.photoURL}
                  alt="User Profile"
                  onClick={toggleUserMenu}
                />
                {isUserMenuOpen && (
                  <div className="absolute top-14 right-0 w-56 glass-panel overflow-hidden border border-white/10 flex flex-col p-2">
                    <div className="p-3 text-slate-100 font-semibold border-b border-white/10 text-sm">
                      {user?.displayName}
                    </div>
                    <NavLink
                      to="/additems"
                      className="px-4 py-2 mt-1 rounded-md text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      Add Lost & Found Item
                    </NavLink>
                    <NavLink
                      to="/recovereditem"
                      className="px-4 py-2 rounded-md text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      All Recovered Items
                    </NavLink>
                    <NavLink
                      to="/mangeitem"
                      className="px-4 py-2 rounded-md text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      Manage My Items
                    </NavLink>
                  </div>
                )}
              </>
            ) : (
              <div className="p-2 rounded-full bg-white/5 border border-white/10">
                <FaUser className="text-slate-300" />
              </div>
            )}

            {user ? (
              <button
                onClick={handleLogOut}
                className="bg-white/10 text-slate-200 border border-white/20 py-2 px-6 rounded-full hover:bg-white/20 hover:text-white transition-all text-sm font-medium"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-full shadow-glow hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all font-medium tracking-wide text-sm"
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
