import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MainPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  
  return (
      <div className="relative min-h-screen flex items-center justify-center pt-20">
        
        {/* Subtle glowing orbs in the background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="relative container mx-auto px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 text-center lg:text-left z-10">
          
          <motion.div 
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              <span className="block text-gradient">WhereIsIt</span>
              Find What’s Missing
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl font-light mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Reconnect with your lost belongings through WhereIsIt. We blend powerful technology with community empathy. Report missing items, browse found listings, and effortlessly recover what’s yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                to='/allitems' 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300 group"
              >
                Get Started
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                to='/auth/register'
                className="px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Join Now
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative rings behind image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl -z-10"></div>
              <img
                src="./assets/LostFound.png"
                className="w-full h-auto object-cover rounded-3xl border border-white/10 shadow-2xl"
                alt="Lost and Found Illustration"
                onError={(e) => {
                  // Fallback if image doesn't exist to prevent ugly broken image icon
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default MainPage;