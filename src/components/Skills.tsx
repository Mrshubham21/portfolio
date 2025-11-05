import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade-in
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

      // Skill bar animation
      const skillBars = skillsRef.current?.querySelectorAll(".skill-bar");
      skillBars?.forEach((bar, index) => {
        const progressBar = bar.querySelector(".progress-fill") as HTMLElement;
        const percentage = progressBar?.dataset.percentage || "0";

        gsap.fromTo(
          progressBar,
          { width: "0%" },
          {
            width: `${percentage}%`,
            duration: 1.5,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
            },
          }
        );
      });

      // Category fade-in
      gsap.fromTo(
        skillsRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React / Next.js", level: 70 },
        { name: "HTML, CSS / Tailwind", level: 85 },
        { name: "JavaScript", level: 75 },
      ],
    },
    {
      title: "Coding",
      skills: [
        { name: "Python", level: 80 },
        { name: "SQL", level: 75 },
        { name: "C/C++", level: 60 },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git / GitHub", level: 80 },
        { name: "VS Code", level: 80 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-black via-red-950 to-black text-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
        >
          Skills & Expertise
        </h2>

        {/* Skills Grid */}
        <div ref={skillsRef} className="grid md:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-6 rounded-2xl bg-black/40 border border-red-900/40 hover:border-red-500/60 shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,0,0,0.4)] transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-red-400 text-center mb-6">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-200 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-red-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="skill-bar h-2 bg-red-900/30 rounded-full overflow-hidden">
                      <div
                        className="progress-fill h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.5)]"
                        data-percentage={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
