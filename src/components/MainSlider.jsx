import React, { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

const MainSlider = () => {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 1000, // Slide transition duration
    slides: {
      perView: 1, // Show one slide at a time
    },
    created: (sliderInstance) => {
      setInterval(() => {
        sliderInstance.next(); // Automatically advance slides every 2 seconds
      }, 2000);
    },
  });

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
  }, []);

  return (
    <div
      className="keen-slider w-11/12 mx-auto mt-10 bg-no-repeat bg-center"
      ref={sliderRef}
    >
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="keen-slider__slide bg-no-repeat bg-cover  bg-center"
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
          }}
        >
          <div className="relative sm:min-h-[50vh] md:min-h-[80vh] h-[40vh] flex flex-col justify-center items-center text-center text-white px-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base mb-4">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainSlider;
