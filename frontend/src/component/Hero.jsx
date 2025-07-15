import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    )
    .fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "-=0.3"
    );

    particlesRef.current.forEach((particle, i) => {
      gsap.to(particle, {
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1
      });
    });

    gsap.to(containerRef.current, {
      backgroundPosition: "50% 60%",
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "none"
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(particlesRef.current);
    };
  }, []);

  const particles = Array.from({ length: 15 }).map((_, i) => (
    <div
      key={i}
      ref={el => (particlesRef.current[i] = el)}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: gsap.utils.random(2, 6),
        height: gsap.utils.random(2, 6),
        background: `rgba(255, 255, 255, ${gsap.utils.random(0.1, 0.3)})`,
        left: `${gsap.utils.random(0, 100)}%`,
        top: `${gsap.utils.random(0, 100)}%`,
        filter: "blur(1px)"
      }}
    />
  ));

  const scrollToGames = () => {
    const gamesSection = document.getElementById("game-cards");
    if (gamesSection) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: gamesSection,
          offsetY: 50 
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "radial-gradient(ellipse at 50% 50%, #002a4d 0%, #001f3d 50%, #00152b 100%)",
        backgroundSize: "150% 150%"
      }}
    >
      {particles}

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#001f3d]/30 to-[#001f3d]/80 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl px-6">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 md:mb-6 leading-tight"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(to right, #fff 0%, #a1c4fd 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Welcome to GameZone 🎮
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10"
          style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)" }}
        >
          Explore the world of indie and arcade games with stunning web animation!
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce w-6 h-10 border-4 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scrollIndicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;