import { useEffect, useRef } from "react";
import gsap from "gsap";

const Intro = ({ onFinish }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    // Create particles
    particlesRef.current = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          onComplete: onFinish
        });
      }
    });

    // Initial setup
    gsap.set([logoRef.current, textRef.current], { opacity: 0 });
    gsap.set(progressRef.current, { scaleX: 0 });

    // Animation sequence
    tl.fromTo(
      logoRef.current,
      { 
        scale: 0.5,
        opacity: 0,
        y: 40
      },
      { 
        scale: 1.2,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }
    )
    .to(logoRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)"
    })
    .fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8 
      },
      "-=0.4"
    )
    .to(progressRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: "power1.inOut",
      transformOrigin: "left center"
    }, "-=0.5");

    // Particle animation
    const animateParticles = () => {
      particlesRef.current = particlesRef.current.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100
      }));
      requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      // Clean up any GSAP animations
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-[#00162b] to-[#000814] text-white flex flex-col items-center justify-center z-[9999]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Floating particles */}
      {particlesRef.current.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            background: "rgba(255, 255, 255, 0.6)",
            filter: "blur(0.5px)",
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={logoRef}
          className="text-8xl sm:text-9xl font-extrabold text-white glow mb-6"
        >
          🎮
        </div>
        <div
          ref={textRef}
          className="mb-8 text-xl sm:text-2xl text-white/80 typewriter"
        >
          Loading ZeroFrame...
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
          />
        </div>
      </div>

      {/* Scanlines effect */}
      <div className="absolute inset-0 pointer-events-none scanlines" />

      {/* Optional CRT effect */}
      <div className="absolute inset-0 pointer-events-none crt-effect" />

      <style jsx>{`
        .glow {
          text-shadow: 0 0 20px rgba(161, 196, 253, 0.6),
                      0 0 40px rgba(124, 58, 237, 0.4),
                      0 0 80px rgba(99, 102, 241, 0.2);
          animation: pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid rgba(255, 255, 255, 0.6);
          width: 0;
          animation: typing 1.8s steps(16, end) forwards, 
                    blink 0.8s step-end infinite;
        }
        
        @keyframes typing {
          to { width: 16ch; }
        }
        
        @keyframes blink {
          50% { border-color: transparent; }
        }
        
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 100%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
        }
        
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        .crt-effect {
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.2) 100%
          );
          box-shadow: inset 0 0 10vw rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }
        
        .crt-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 255, 255, 0.02) 1px,
            rgba(0, 0, 0, 0) 2px
          );
          background-size: 100% 4px;
          animation: scanline 0.1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Intro;