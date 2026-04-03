import React, { useEffect } from "react";
import { motion } from "framer-motion";

const MainSlider = () => {
  const slides = [
    {
      id: 1,
      backgroundImage:
        "https://images.pexels.com/photos/5491324/pexels-photo-5491324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Reconnect with What’S Lost",
      description:
        "Our platform helps you recover lost belongings with the power of community and technology.",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.pexels.com/photos/1023828/pexels-photo-1023828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Empowering Kindness",
      description:
        "Report lost items or browse found belongings to make a difference in someone’s day.",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.pexels.com/photos/262488/pexels-photo-262488.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Lost But Not Gone",
      description:
        "We’re here to help you reconnect with your missing treasures—join the journey today.",
    },
    {
      id: 4,
      backgroundImage:
        "https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "A Built on Trust",
      description:
        "Together, we can ensure every lost item finds its way home.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
            Always <span className="text-gradient">Here for You</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover how WhereIsIt bridges the gap between lost and found through our dedicated community and innovative tracking system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-3xl overflow-hidden glass-card"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-heading font-bold text-white mb-3 leading-tight">
                  {slide.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {slide.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainSlider;
