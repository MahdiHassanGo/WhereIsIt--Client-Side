import { useEffect, useContext, useState } from "react";
import { AuthContext } from './../provider/AuthProvider';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  useEffect(() => {
    document.title = "Login | WhereIsIt?";
    window.scrollTo(0, 0);
  }, []);

  const { userLogin, setUser, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 2000);
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error("Login failed: " + err.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Sign-In successful!");
        setTimeout(() => {
          navigate(location?.state || "/");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Google Sign-In failed: " + err.message);
      });
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
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="text-3xl font-extrabold text-gradient" style={{fontFamily: 'Outfit, sans-serif'}}>
            WhereIsIt.
          </Link>
          <h1 className="text-4xl font-bold text-white mt-6 mb-2" style={{fontFamily: 'Outfit, sans-serif'}}>Welcome back</h1>
          <p className="text-slate-400">Sign in to your account to continue</p>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 transition-all"
                required
              />
            </div>

            <button type="submit" className="btn-primary-gradient w-full py-3 text-lg rounded-xl">
              Sign In
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-white/10 flex-grow"></div>
              <span className="mx-4 text-slate-500 text-xs uppercase tracking-widest">or</span>
              <div className="border-t border-white/10 flex-grow"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn-outline-glass w-full py-3 rounded-xl flex items-center justify-center gap-3 text-sm"
            >
              <FaGoogle className="text-[#8B5CF6]" /> Continue with Google
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-[#06B6D4] hover:text-white transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;