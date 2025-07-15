import { useEffect, useRef, useState } from "react";

const GameZoneFooter = () => {
  const footerRef = useRef(null);
  const particlesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    // Animate particles
    const animateParticles = () => {
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          const speed = 0.3 + (i % 4) * 0.1;
          const amplitude = 8 + (i % 3) * 4;
          const time = Date.now() * 0.0008;
          
          particle.style.transform = `translate(${Math.sin(time * speed) * amplitude}px, ${Math.cos(time * speed * 0.6) * amplitude}px)`;
          particle.style.opacity = 0.05 + Math.sin(time * speed) * 0.15;
        }
      });
      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      observer.disconnect();
    };
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <div
      key={`footer-particle-${i}`}
      ref={el => (particlesRef.current[i] = el)}
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 1 + (i % 3),
        height: 1 + (i % 3),
        background: "rgba(255, 255, 255, 0.2)",
        left: `${5 + (i * 4.5) % 90}%`,
        top: `${10 + (i * 7) % 80}%`,
        filter: "blur(0.5px)",
      }}
    />
  ));

  const footerSections = [
    {
      title: "ArcadiaX",
      items: [
        { text: "About Us", href: "#about" },
        { text: "Our Games", href: "#games" },
        { text: "News & Updates", href: "#news" },
        { text: "Careers", href: "#careers" }
      ]
    },
    {
      title: "Community",
      items: [
        { text: "Forums", href: "#forums" },
        { text: "Discord", href: "#discord" },
        { text: "Events", href: "#events" },
        { text: "Tournaments", href: "#tournaments" }
      ]
    },
    {
      title: "Support",
      items: [
        { text: "Help Center", href: "#help" },
        { text: "Contact Us", href: "#contact" },
        { text: "Bug Reports", href: "#bugs" },
        { text: "Feedback", href: "#feedback" }
      ]
    },
    {
      title: "Legal",
      items: [
        { text: "Privacy Policy", href: "#privacy" },
        { text: "Terms of Service", href: "#terms" },
        { text: "Cookie Policy", href: "#cookies" },
        { text: "DMCA", href: "#dmca" }
      ]
    }
  ];

  const socialLinks = [
    { icon: "📘", name: "Facebook", href: "#facebook", color: "hover:text-blue-400" },
    { icon: "🐦", name: "Twitter", href: "#twitter", color: "hover:text-sky-400" },
    { icon: "📸", name: "Instagram", href: "#instagram", color: "hover:text-pink-400" },
    { icon: "📺", name: "YouTube", href: "#youtube", color: "hover:text-red-400" },
    { icon: "🎮", name: "Twitch", href: "#twitch", color: "hover:text-purple-400" },
    { icon: "💼", name: "LinkedIn", href: "#linkedin", color: "hover:text-blue-300" }
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-[#00152b] via-[#001122] to-[#000a11] text-white overflow-hidden"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-pulse-hover:hover {
          animation: pulse 0.6s ease-in-out;
        }
        
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
        .animate-delay-4 { animation-delay: 0.4s; }
        .animate-delay-5 { animation-delay: 0.5s; }
        .animate-delay-6 { animation-delay: 0.6s; }
        
        .social-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .social-icon:hover {
          transform: translateY(-3px) scale(1.1);
        }
        
        
        .footer-link:hover::after {
          width: 100%;
        }
        
        .logo-glow {
          text-shadow: 0 0 20px rgba(161, 196, 253, 0.3);
        }
      `}</style>

      {particles}

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      <div className="container mx-auto px-6 py-16">
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold mb-2 logo-glow bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              🎮 ArcadiaX
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Where gaming dreams come alive. Join millions of players in epic adventures.
            </p>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                className={`text-2xl social-icon ${social.color} ${isVisible ? `animate-slide-in-right animate-delay-${index + 1}` : 'opacity-0'}`}
                title={social.name}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={`bg-white/5 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-white/10 ${isVisible ? 'animate-fade-in-up animate-delay-4' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 lg:mr-8">
              <h3 className="text-2xl font-bold mb-2 text-white">
                🚀 Stay in the Game
              </h3>
              <p className="text-white/70">
                Get the latest updates, exclusive content, and special offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-w-0 lg:min-w-[300px]"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 animate-pulse-hover">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className={`border-t border-white/10 pt-8 ${isVisible ? 'animate-fade-in-up animate-delay-5' : 'opacity-0'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-white/60 mb-4 lg:mb-0">
              <p>© 2025 ArcadiaX. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="text-white/40">Made with ❤️ for gamers</span>
              <span className="text-white/40">•</span>
              <span className="text-white/40">Version 2.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default GameZoneFooter;