import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToCalculator = () => {
    navigate('/calculator');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black shadow-md py-1' 
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-3 transition-all duration-300">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/unplugged_1.png" 
                  alt="Unplugged Logo" 
                  className={`transition-all duration-300 ${scrolled ? 'h-36' : 'h-52'} w-auto`}
                />
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
            <button
              onClick={() => scrollToSection('experiences')}
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:text-purple-300 transition-all duration-300 relative group"
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}
            >
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:text-purple-300 transition-all duration-300 relative group"
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                location.pathname === '/contact'
                  ? 'text-purple-400'
                  : 'text-white hover:text-purple-300'
              }`}
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <button
              onClick={() => navigateToCalculator()}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                location.pathname === '/calculator'
                  ? 'text-purple-400'
                  : 'text-white hover:text-purple-300'
              }`}
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}
            >
              Calculator
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            
            <button
              onClick={() => scrollToSection('host')}
              className={`ml-3 px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20`}
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400, letterSpacing: '0.5px' }}
            >
              Host an Experience
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-400 focus:outline-none transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-sm">
          <button
            onClick={() => {
              scrollToSection('experiences');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-gray-900 transition-colors duration-300"
            style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400 }}
          >
            Experiences
          </button>
          
          <button
            onClick={() => {
              scrollToSection('about');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-gray-900 transition-colors duration-300"
            style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400 }}
          >
            About
          </button>
          
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
              location.pathname === '/contact'
                ? 'text-purple-400 bg-gray-800'
                : 'text-white hover:text-purple-300 hover:bg-gray-900'
            }`}
            onClick={() => setIsMenuOpen(false)}
            style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400 }}
          >
            Contact Us
          </Link>
          
          <button
            onClick={() => {
              navigateToCalculator();
              setIsMenuOpen(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/calculator'
                ? 'text-purple-400 bg-gray-800'
                : 'text-white hover:text-purple-300 hover:bg-gray-900'
            }`}
            style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400 }}
          >
            Calculator
          </button>
          
          <button
            onClick={() => {
              scrollToSection('host');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-colors duration-300"
            style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 400 }}
          >
            Host an Experience
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;