import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "emailjs-com";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Used for GSAP animation
  const formRef = useRef(null);

  // Used specifically for EmailJS
  const formElementRef = useRef(null);

  const contactInfoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // =========================
  // GSAP ANIMATION
  // =========================
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
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
        [formRef.current, contactInfoRef.current],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure actual form exists
    if (!formElementRef.current) {
      console.error("Form element not found.");
      return;
    }

    emailjs
      .sendForm(
        "service_5apj39ba",
        "template_i15qy49",
        formElementRef.current,
        "ccwObpDC5_oDv3vp0"
      )
      .then(
        (result) => {
          console.log("✅ Email sent successfully:", result.text);

          alert("Message sent successfully!");

          // Reset React state
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });

          // Reset actual HTML form
          formElementRef.current.reset();
        },
        (error) => {
          console.error("❌ Email failed:", error);

          alert(
            "Failed to send message. Please try again."
          );
        }
      );
  };

  // =========================
  // CONTACT INFORMATION
  // =========================
  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "st689801@gmail.com",
      link: "mailto:st689801@gmail.com",
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+91 8923206787",
      link: "tel:+918923206787",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "India",
      link: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 section-dark glow-red"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* =========================
            TITLE
        ========================= */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-red-400 text-center mb-16 drop-shadow-[0_0_15px_rgba(255,0,0,0.4)]"
        >
          Let's Work Together
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

          {/* =========================
              LEFT SIDE - CONTACT FORM
          ========================= */}
          <div
            ref={formRef}
            className="bg-black/50 border border-red-800 rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(255,0,0,0.2)] backdrop-blur-lg"
          >
            <h3 className="text-2xl font-semibold text-red-400 mb-8">
              Send me a message
            </h3>

            {/* IMPORTANT:
                formElementRef is attached to the actual form
                because EmailJS sendForm() requires the form element.
            */}
            <form
              ref={formElementRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/70 text-white border border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/70 text-white border border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>

              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/70 text-white border border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-400"
                  placeholder="Project inquiry"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/70 text-white border border-red-700 rounded-xl focus:ring-2 focus:ring-red-500 transition-all resize-none placeholder-gray-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* SEND BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-800 to-black text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-900 transition-all flex items-center justify-center space-x-2 font-medium shadow-[0_0_20px_rgba(255,0,0,0.4)] animate-pulse hover:animate-none"
              >
                <Send size={20} />

                <span>Send Message</span>
              </button>

            </form>
          </div>

          {/* =========================
              RIGHT SIDE - CONTACT INFO
          ========================= */}
          <div
            ref={contactInfoRef}
            className="space-y-8"
          >

            <div>
              <h3 className="text-2xl font-semibold text-red-400 mb-6">
                Get in touch
              </h3>

              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                I’ll get back to you as soon as I can.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="space-y-6">

              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center space-x-4 p-6 bg-black/50 border border-red-800 rounded-2xl hover:border-red-500 hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] transition-all group transform hover:-translate-y-1"
                >

                  {/* ICON */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-700 to-black rounded-full flex items-center justify-center text-red-300 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>

                  {/* TEXT */}
                  <div>
                    <div className="font-medium text-red-400">
                      {info.title}
                    </div>

                    <div className="text-gray-300">
                      {info.content}
                    </div>
                  </div>

                </a>
              ))}

            </div>

            {/* BOTTOM TEXT */}
            <div className="pt-8">
              <p className="text-gray-300 leading-relaxed">
                Currently available for freelance work and full-time
                opportunities. Let’s build something amazing together!
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;