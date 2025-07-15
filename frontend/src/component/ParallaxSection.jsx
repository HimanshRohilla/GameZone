import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    gsap.set([titleRef.current, ...cardsRef.current], { opacity: 0, y: 50 });
    gsap.set(particlesRef.current, { opacity: 0 });

    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        opacity: gsap.utils.random(0.1, 0.3),
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const particles = Array.from({ length: 15 }).map((_, i) => (
    <div
      key={`particle-${i}`}
      ref={(el) => (particlesRef.current[i] = el)}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: gsap.utils.random(2, 6),
        height: gsap.utils.random(2, 6),
        background: "rgba(255, 255, 255, 0.3)",
        left: `${gsap.utils.random(0, 100)}%`,
        top: `${gsap.utils.random(0, 100)}%`,
        filter: "blur(1px)",
      }}
    />
  ));

  const handleTilt = (e, index) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * 10;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (index) => {
    const card = cardsRef.current[index];
    card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
  };

  const features = [
    {
      icon: "🚀",
      title: "Cutting-Edge Technology",
      description: "We leverage the latest web technologies including React, GSAP, and Three.js to create immersive gaming experiences that run smoothly across all devices.",
      color: "#4facfe",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Our UI/UX designers create stunning interfaces that are not only visually appealing but also intuitive and easy to navigate.",
      color: "#ff7043",
    },
    {
      icon: "🎮",
      title: "Immersive Gameplay",
      description: "We focus on creating games that pull you into their world with rich storytelling, engaging mechanics, and responsive controls.",
      color: "#ba68c8",
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 overflow-hidden bg-[#001f3d]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {particles}

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#001f3d]/30 to-[#001f3d]/80 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 leading-tight"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right, #fff 0%, #a1c4fd 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            opacity: 0,
          }}
        >
          About ZeroFrame
        </h2>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white/5 p-8 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 border border-white/10 backdrop-blur-sm hover:shadow-lg hover:border-white/20"
              onMouseMove={(e) => handleTilt(e, index)}
              onMouseLeave={() => resetTilt(index)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  color: feature.color,
                  textShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                {feature.title}
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

function adjustColor(color, amount, opacity = 1) {
  return `rgba(${parseInt(color.substr(1, 2), 16) + amount}, ${
    parseInt(color.substr(3, 2), 16) + amount
  }, ${parseInt(color.substr(5, 2), 16) + amount}, ${opacity})`;
}

export default AboutSection;