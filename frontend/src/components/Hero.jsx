import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Discover Unique Experiences',
      description: 'Immerse yourself in curated experiences that inspire and connect'
    },
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Learn From Local Artists',
      description: 'Connect with talented creators and learn new skills in intimate settings'
    },
    {
      image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Create Lasting Memories',
      description: 'Join workshops and events that will leave you with unforgettable experiences'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const changeSlide = (indexOrFunction) => {
    setIsChanging(true);
    setTimeout(() => {
      if (typeof indexOrFunction === 'function') {
        setCurrentSlide(indexOrFunction);
      } else {
        setCurrentSlide(indexOrFunction);
      }
      setTimeout(() => {
        setIsChanging(false);
      }, 100);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      changeSlide(index);
    }
  };

  const goToPrevSlide = () => {
    changeSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    changeSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleExploreClick = (e) => {
    e.preventDefault();
    const experiencesSection = document.getElementById('experiences');
    const offset = 80; // Offset from the top (adjust as needed)
    const targetPosition = experiencesSection.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-indigo-900/30 z-10 transition-opacity duration-1000"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-3000 ${
              index === currentSlide ? 'scale-105' : 'scale-100'
            }`}
            style={{
              transform: isChanging ? 'scale(1.02)' : 'scale(1.05)',
              transition: 'transform 7s ease-out'
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
            <div className={`transform transition-all duration-1000 delay-300 ${
              index === currentSlide && !isChanging ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-3xl md:text-4xl text-white mb-4 max-w-4xl tracking-wide uppercase font-light animate-glow">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
                {slide.description}
              </p>
              <button
                onClick={handleExploreClick}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg pulse-button"
              >
                Explore Experiences
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-purple-600/80 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-purple-600/80 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-purple-400 w-6' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;