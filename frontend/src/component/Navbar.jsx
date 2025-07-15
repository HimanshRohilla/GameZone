import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GameZoneNavbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const logoTextRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isHovering, setIsHovering] = useState(null);

  useEffect(() => {
    // Initialize logo position and opacity
    gsap.set([logoRef.current, logoTextRef.current], { 
      y: 0,
      opacity: 1 
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const sections = ['home', 'games', 'about'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home', icon: '🏠' },
    { id: 'games', label: 'Games', href: '#games', icon: '🎮' },
    { id: 'about', label: 'About', href: '#about', icon: '🎯' },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 p-4`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className={`rounded-2xl transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#001122]/90 backdrop-blur-lg shadow-2xl border border-white/10' 
          : 'bg-[#001122]/70 backdrop-blur-md border border-white/10'
      }`}>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleNavClick('home')}
            >
              <div className="relative" ref={logoRef}>
                <span className="text-3xl z-10 relative">🎮</span>
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
              </div>
              <h1 
                ref={logoTextRef}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300"
              >
                GameZone
              </h1>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setIsHovering(item.id)}
                  onMouseLeave={() => setIsHovering(null)}
                  className={`relative px-6 py-3 rounded-xl transition-all duration-300 group`}
                >
                  <div className="flex items-center space-x-2 z-10 relative">
                    <span className={`text-lg transition-all duration-300 ${
                      activeSection === item.id || isHovering === item.id 
                        ? 'scale-110 text-white' 
                        : 'text-white/80'
                    }`}>
                      {item.icon}
                    </span>
                    <span className={`font-medium transition-all duration-300 ${
                      activeSection === item.id || isHovering === item.id 
                        ? 'text-white' 
                        : 'text-white/80'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  <div className={`absolute inset-0 rounded-xl z-0 transition-all duration-500 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-white/10' 
                      : isHovering === item.id 
                        ? 'bg-white/5 border border-white/5' 
                        : 'bg-transparent'
                  }`}></div>
                  
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                isMobileMenuOpen ? 'bg-white/10' : 'hover:bg-white/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : ''
                }`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isMobileMenuOpen 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      }`}>
        <div className="h-full bg-[#001122] bg-opacity-95 backdrop-blur-xl border-l border-white/10 rounded-l-2xl shadow-2xl overflow-hidden">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => handleNavClick('home')}
              >
                <span className="text-2xl">🎮</span>
                <h2 className="text-xl font-bold text-white">GameZone</h2>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-xl text-white">✕</span>
              </button>
            </div>

            <div className="flex-1 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-4 text-left p-4 rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-white/60 text-sm text-center">
                GameZone © {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      ></div>
    </nav>
  );
};

export default GameZoneNavbar;