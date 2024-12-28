import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0); 
  const slides = [
    {
      id: 1,
      backgroundImage: "/assets/Slider1.png",
      title: "Reconnect with What’s Lost",
      description:
        "Our platform helps you recover lost belongings with the power of community and technology.",
    },
    {
      id: 2,
      backgroundImage: "/assets/Slider2.png",
      title: "Empowering Kindness Through Connection",
      description:
        "Report lost items or browse found belongings to make a difference in someone’s day.",
    },
    {
      id: 3,
      backgroundImage: "/assets/Slider3.png",
      title: "Lost But Not Gone Forever",
      description:
        "We’re here to help you reconnect with your missing treasures—join the journey today.",
    },
    {
      id: 4,
      backgroundImage: "/assets/Slider4.png",
      title: "A Community Built on Trust",
      description:
        "Together, we can ensure every lost item finds its way home.",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
    document.title = "Home | CrowdCube";
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="carousel w-full mb-10 mt-10">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-item relative w-full ${
            index === currentSlide ? "block" : "hidden"
          }`}
        >
          <div
            className="hero sm:min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            data-aos="fade-up"
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
            }}
          >
            <div className="hero-overlay  "></div>
            <div className="hero-content text-neutral-content text-center px-4">
              <div className="max-w-xs sm:max-w-sm">
                <h1 className="mb-3 text-2xl sm:text-3xl font-bold text-white">
                  {slide.title}
                </h1>
                <p className="mb-3 text-sm sm:text-base text-white">{slide.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainSlider;