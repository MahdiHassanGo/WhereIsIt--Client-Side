import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MainSlider = () => {
  const slides = [
    {
      id: 1,
      backgroundImage:
        "https://images.pexels.com/photos/5491324/pexels-photo-5491324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Reconnect with What’s Lost",
      description:
        "Our platform helps you recover lost belongings with the power of community and technology.",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.pexels.com/photos/1023828/pexels-photo-1023828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Empowering Kindness Through Connection",
      description:
        "Report lost items or browse found belongings to make a difference in someone’s day.",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Lost But Not Gone Forever",
      description:
        "We’re here to help you reconnect with your missing treasures—join the journey today.",
    },
    {
      id: 4,
      backgroundImage:
        "https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
    <div> 
      
      
      <h2 className="font-bold text-5xl text-center mt-10 mb-5">WhereIsIt - Always here for you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-11/12 mx-auto mt-8 mb-10">
 

    
 
     
    {slides.map((slide) => (
      <div
        key={slide.id}
        className="relative bg-cover bg-center h-[350px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${slide.backgroundImage})`,
        }}
      >

        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 z-10">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2" data-aos="fade-up">
            {slide.title}
          </h1>
          <p className="text-sm sm:text-base" data-aos="fade-up">
            {slide.description}
          </p>
        </div>
      </div>
    ))}
  </div></div>
 
  );
};

export default MainSlider;
