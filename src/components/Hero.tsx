import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: parallax,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-gray-200">
      {/* Moving gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,rgba(0,0,0,1)_70%)] animate-pulse-slow" />

      <div ref={heroRef} className="text-center px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-red-500 mb-6 leading-tight drop-shadow-[0_0_30px_rgba(255,0,0,0.5)]"
        >
          Creative
          <br />
          <span className="text-red-300">Developer</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Turning imagination into immersive digital realities — where innovation meets perfection.
        </p>

        <div ref={ctaRef} className="space-y-8">
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-red-800 to-black text-white rounded-full 
                      hover:from-red-600 hover:to-red-900 transition-all duration-300 transform hover:scale-105 
                      text-lg font-medium shadow-[0_0_20px_rgba(255,0,0,0.5)]"
          >
            Explore My Work
          </button>

          <div className="animate-bounce">
            <ChevronDown
              size={36}
              className="mx-auto text-red-400 cursor-pointer hover:text-red-500 transition-colors"
              onClick={scrollToAbout}
            />
          </div>
        </div>
      </div>

      {/* Soft red-to-black gradient bottom overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />
    </section>
  );
};

export default Hero;
