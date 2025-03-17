

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/unplugged_1.png" 
                  alt="Unplugged Logo" 
                  className="h-52 w-auto"
                />
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <button
              onClick={() => scrollToSection('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300 hover:bg-gray-900`}
            >
              About
            </button>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/contact'
                  ? 'text-white bg-gray-800'
                  : 'text-white hover:text-gray-300 hover:bg-gray-900'
              }`}
            >
              Contact Us
            </Link>
            <button
              onClick={() => scrollToSection('host')}
              className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300 hover:bg-gray-900`}
            >
              Host
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
          <button
            onClick={() => {
              scrollToSection('about');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-900"
          >
            About
          </button>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/contact'
                ? 'text-white bg-gray-800'
                : 'text-white hover:text-gray-300 hover:bg-gray-900'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>
          <button
            onClick={() => {
              scrollToSection('host');
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-900"
          >
            Host
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;