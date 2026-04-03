import { useEffect } from 'react';
import ItemSection from '../components/ItemSection';
import MainPage from '../components/MainPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomerReview from '../components/CustomerReview';
import MainSlider from '../components/MainSlider';

const MainLayout = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Home | WhereIsIt";
      }, []);
    return (
        <div className="min-h-screen">
          <Navbar />
          <main>
            <MainPage />
            <MainSlider />
            <ItemSection />
            <CustomerReview />
          </main>
          <Footer />
        </div>
    );
};

export default MainLayout;