import React, { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
const MainPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);
    return (
        <div className="hero bg-gradient-to-r from-bgMain1 to-bgMain2 min-h-screen " data-aos="fade-up">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="./assets/LostFound.png"
            className="w-40 md:w-full rounded-lg " />
          <div>
            <h1 className="text-5xl font-bold text-white">WhereIsIt - Find What’s Missing</h1>
            <p className="py-6 text-white">
            Reconnect with your lost belongings through WhereIsIt, the ultimate lost and found platform. Report missing items, browse found listings, and interact with others to recover what’s yours. Where technology meets empathy, WhereIsIt is designed to bridge the gap between lost and found.
            </p>
            <Link to='/allitems' className="btn bg-gradient-to-r from-bgButton1 to-bgButton2 text-black border-black">Get Started</Link>
          </div>
        </div>
      </div>
    );
};

export default MainPage;