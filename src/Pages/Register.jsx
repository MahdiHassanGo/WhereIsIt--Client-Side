import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthProvider";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const Register = () => {
  useEffect(() => {
    document.title = "Register | WhereIsIt?";
    window.scrollTo(0, 0);
  }, []);

  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const passwordError = {};
    if (!/[A-Z]/.test(value)) passwordError.uppercase = "Must include at least one uppercase letter";
    if (!/[a-z]/.test(value)) passwordError.lowercase = "Must include at least one lowercase letter";
    if (value.length < 6) passwordError.length = "Must be at least 6 characters long";
    setError((prev) => ({ ...prev, password: Object.keys(passwordError).length ? passwordError : null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");

    if (name.length < 4) {
      setError({ ...error, name: "Must be more than 4 characters long" });
      toast.error("Name must be more than 4 characters!");
      return;
    }
    if (error.password) {
      toast.error("Please fix the password errors before submitting.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            toast.success("Registration successful!", { autoClose: 3000 });
            setTimeout(() => navigate("/"), 2000);
          })
          .catch((err) => toast.error("Error updating profile: " + err.message));
      })
      .catch((err) => toast.error("Registration failed: " + err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <ToastContainer position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-extrabold text-gradient" style={{fontFamily: 'Outfit, sans-serif'}}>
            WhereIsIt.
          </Link>
          <h1 className="text-4xl font-bold text-white mt-6 mb-2" style={{fontFamily: 'Outfit, sans-serif'}}>Create account</h1>
          <p className="text-slate-400">Join our community and start recovering items</p>
        </div>

        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input name="email" type="email" placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all" required />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Full Name</label>
              <input name="name" type="text" placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all" required />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Photo URL</label>
              <input name="photo" type="url" placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all" required />
            </div>
            <div className="relative">
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <IoEyeSharp size={18} /> : <IoEyeOffSharp size={18} />}
              </button>
              {error.password && (
                <ul className="mt-2 space-y-1">
                  {Object.values(error.password).map((errMsg, index) => (
                    <li key={index} className="text-[#F43F5E] text-xs flex items-center gap-1">
                      <span>•</span> {errMsg}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button disabled={!!error.password} type="submit"
              className="btn-primary-gradient w-full py-3 text-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed">
              Create Account
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-[#06B6D4] hover:text-white transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
