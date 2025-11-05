import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Michael Chen",
      role: "CTO",
      company: "StartupXYZ",
      content:
        "Incredible technical skills combined with excellent communication. The solutions provided were not only functional but also scalable and maintainable. I would definitely work with them again on future projects.",
      avatar:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 bg-black overflow-hidden text-gray-200"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.12)_0%,rgba(0,0,0,1)_70%)] animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-red-400 text-center mb-16 drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]"
        >
          Client Testimonials
        </h2>

        <div ref={carouselRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <div className="bg-black/60 border border-red-800 rounded-3xl p-8 md:p-12 shadow-[0_0_25px_rgba(255,0,0,0.3)] backdrop-blur-xl">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-red-400 fill-red-400 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                “{testimonials[currentIndex].content}”
              </blockquote>

              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-red-600 shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                />
                <div>
                  <div className="font-semibold text-red-400 text-lg drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentIndex].role} at{" "}
                    <span className="text-red-300">
                      {testimonials[currentIndex].company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 border border-red-800 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronLeft size={24} className="text-red-400" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 border border-red-800 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ChevronRight size={24} className="text-red-400" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-red-500 shadow-[0_0_10px_rgba(255,0,0,0.7)] scale-110"
                    : "bg-red-900"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
