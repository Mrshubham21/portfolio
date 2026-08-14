import React, { useEffect, useRef } from "react";
import pdfImage from "../assests/pdf.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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
        },
      );

      gsap.fromTo(
        projectsRef.current?.children || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Anime Merchandise Site",
      description:
        "A modern and responsive e-commerce site built with HTML, CSS, and JavaScript, featuring Firebase integration for real-time data storage and smooth dynamic interactions.",
      image:
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80", // Anime-like dark theme image
      tags: ["HTML", "CSS", "JavaScript", "Firebase"],
      featured: true,
      live: "https://beamish-zabaione-0ce8a2.netlify.app/", // ✅ your Netlify link
      github: "https://github.com/Mrshubham21/Animesite", // optional
    },
    {
      title: "Rag Based Pdf Generator",
      description:
        "A full-stack PDF RAG chatbot that lets users upload PDFs, process their content, and ask AI-powered questions using semantic search and Gemini.",
      image: pdfImage,
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "Python",
        "FastAPI",
        "MongoDB Atlas",
        "Redis",
        "ChromaDB",
        "LangChain",
        "Sentence Transformers",
        "Gemini API",
        "RAG",
        "REST API",
      ],
      featured: true,
      live: "https://ragpdf-three.vercel.app/",
      github: "https://github.com/Mrshubham21/ragpdf.git",
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-black via-red-950 to-black text-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent"
        >
          Featured Work
        </h2>

        <div ref={projectsRef} className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image Section */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="relative group overflow-hidden rounded-2xl shadow-[0_0_25px_rgba(255,0,0,0.3)] hover:shadow-[0_0_40px_rgba(255,0,0,0.6)] transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-colors shadow-[0_0_10px_rgba(255,0,0,0.4)]"
                        >
                          <ExternalLink size={16} />
                          <span>View Live</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 px-4 py-2 bg-black/70 hover:bg-black text-red-400 rounded-full text-sm font-medium transition-colors border border-red-500/50"
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div className="space-y-6">
                  {project.featured && (
                    <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-full shadow-[0_0_10px_rgba(255,0,0,0.4)]">
                      Featured Project
                    </span>
                  )}

                  <h3 className="text-3xl md:text-4xl font-bold text-red-400">
                    {project.title}
                  </h3>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 bg-red-950/50 text-red-300 border border-red-800 rounded-full text-sm font-medium shadow-sm hover:bg-red-900/60 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
