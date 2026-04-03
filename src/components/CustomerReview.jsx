import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomerReview = () => {
  const testimonials = [
    {
      id: "george",
      name: "George Miller",
      role: "Verified User",
      image: "https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg",
      quote: "I lost my phone and thought it was gone forever. Thanks to WhereIsIt, I was reunited with it in less than two days. Incredible community!",
    },
    {
      id: "noor",
      name: "Noor Al-Farsi",
      role: "Verified User",
      image: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
      quote: "The interface is so clean and easy to use. I found my lost laptop within hours of posting. Highly recommend this to everyone!",
    },
    {
      id: "selina",
      name: "Selina Gomez",
      role: "Helpful Neighbor",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqbu3vikTenBD-KfH9gwGG7N_rtaCwa8rxLA&s",
      quote: "Found an iPhone on my way home, posted it here, and found the owner within an hour! It's such a rewarding platform to use.",
    },
  ];

  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4">
            Voices of <span className="text-gradient">Our Community</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Real stories from real users who found what they lost or helped others rediscover their belongings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              layoutId={testimonial.id}
              key={testimonial.id}
              onClick={() => setSelectedId(testimonial.id)}
              className="glass-card p-8 cursor-pointer group hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-300 italic line-clamp-3 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary tracking-tighter">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-xl" 
              />
              <motion.div
                layoutId={selectedId}
                className="glass-panel p-10 max-w-xl w-full relative z-10 border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.3)]"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all shadow-lg"
                >
                  ✕
                </button>
                {testimonials
                  .filter((t) => t.id === selectedId)
                  .map((t) => (
                    <div key={t.id} className="text-center">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-primary/30 shadow-glow"
                      />
                      <h3 className="text-3xl font-heading font-bold text-white mb-1">
                        {t.name}
                      </h3>
                      <p className="text-primary font-medium mb-6 uppercase tracking-widest text-xs">
                        {t.role}
                      </p>
                      <p className="text-slate-200 text-xl italic leading-relaxed">
                        "{t.quote}"
                      </p>
                    </div>
                  ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CustomerReview;
