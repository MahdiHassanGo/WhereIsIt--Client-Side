import React from 'react';
import Error from "../../Error.json"
import Lottie from "lottie-react"
import Navbar from './../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center pt-20">
                <div className="text-center max-w-lg mx-auto px-6">
                    <div className="w-64 mx-auto mb-8">
                        <Lottie animationData={Error} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-4" style={{fontFamily: 'Outfit, sans-serif'}}>
                        Page <span className="text-gradient">Not Found</span>
                    </h1>
                    <p className="text-slate-400 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Link to="/" className="btn-primary-gradient px-8 py-3 rounded-xl inline-block">
                        ← Back to Home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ErrorPage;