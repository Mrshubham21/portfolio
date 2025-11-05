import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Code size={32} />,
      title: 'Clean Code',
      description:
        'Writing maintainable, scalable, and high-performing code with precision and passion.',
    },
    {
      icon: <Palette size={32} />,
      title: 'Design Focus',
      description:
        'Blending aesthetics and usability to create sleek, interactive user experiences.',
    },
    {
      icon: <Zap size={32} />,
      title: 'Performance',
      description:
        'Optimizing every interaction for blazing speed and seamless motion.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-black text-gray-200 py-24 relative overflow-hidden"
    >
      {/* Subtle moving red glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black opacity-80 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-red-500 mb-8 drop-shadow-[0_0_25px_rgba(255,0,0,0.6)]"
          >
            About Me
          </h2>

          <div ref={contentRef} className="space-y-6">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Hi, I’m{' '}
              <span className="text-red-500 font-semibold">Shubham Singh</span>, a passionate
              developer focused on building <span className="text-red-400">modern</span> and{' '}
              <span className="text-red-400">interactive</span> web experiences. I love working
              with technologies like <span className="text-red-500">React</span>,{' '}
              <span className="text-red-500">Firebase</span>, and{' '}
              <span className="text-red-500">Flutter</span> to turn ideas into real products.
              My goal: clean code, creative design, and flawless performance.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-black border border-red-800 hover:border-red-500 
                         hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300 transform hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-700 to-red-950 rounded-full mb-6 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
                <div className="text-red-300">{feature.icon}</div>
              </div>

              <h3 className="text-xl font-semibold text-red-400 mb-4 drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                {feature.title}
              </h3>

              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
