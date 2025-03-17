import { useState, useEffect} from "react";
import { MapPin, Calendar, Users, MessageSquare } from "lucide-react";

import Hero from "../components/Hero";
import ExperienceCard from "../components/ExperienceCard";
import ApiService from "../components/ApiService";

const HomePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Make sure the visibility state keys match the section IDs
  const [visibleSections, setVisibleSections] = useState({
    experiences: false,
    about: false,
    features: false,
    host: false // Changed from 'cta' to 'host' to match section ID
  });

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getActiveExperiences();
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
        setError("Failed to load experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();

    // Make all sections visible if they're in the viewport on load
    setTimeout(() => {
      checkVisibility();
    }, 300);

    // Add scroll event listener to check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  // Function to check if elements are in viewport
  const checkVisibility = () => {
    const sections = [
      { id: 'experiences', ref: document.getElementById('experiences') },
      { id: 'about', ref: document.getElementById('about') },
      { id: 'features', ref: document.getElementById('features') },
      { id: 'host', ref: document.getElementById('host') }
    ];

    sections.forEach(section => {
      if (section.ref) {
        const rect = section.ref.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          setVisibleSections(prev => ({ ...prev, [section.id]: true }));
        }
      }
    });
  };

  return (
    <div className="bg-black min-h-screen font-['Montserrat',sans-serif]">
      {/* Hero Section */}
      <Hero />

      {/* Experiences Section */}
      <div className="bg-black pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="experiences" className={`mb-16 ${visibleSections.experiences ? 'fade-in' : 'fade-in-slow'}`}>
            <div className="mb-12 text-left pulse-bg">
              <h3 className="text-purple-400 text-base mb-2 font-medium italic animate-glow">
                Discover
              </h3>
              <h2 className="text-3xl md:text-4xl text-white mb-3 font-light tracking-wide uppercase animate-glow">
                Upcoming Experiences
              </h2>
              <p className="text-gray-400 mb-10 text-base">
                Discover and book unique experiences curated by talented local artists in Bangalore
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-6 py-4 rounded-lg">{error}</div>
            ) : experiences.length === 0 ? (
              <div className="bg-black border border-gray-800 text-gray-300 px-6 py-12 rounded-lg text-center">
                <p className="text-xl">No upcoming experiences at the moment.</p>
                <p className="mt-2 text-gray-400">Check back soon for new and exciting events!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((experience, index) => (
                  <div key={experience._id} className={`stagger-fade-in fade-in-slow ${visibleSections.experiences ? 'active' : ''}`} style={{animationDelay: `${0.1 + index * 0.1}s`}}>
                    <ExperienceCard experience={experience} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview/Introduction Section */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="about" className={`text-center mb-16 ${visibleSections.about ? 'fade-in' : 'fade-in-slow'}`}>
            <div className="mb-6 text-center relative pulse-bg">
              <h3 className="text-purple-400 text-base mb-2 font-medium italic animate-glow">
                Our Story
              </h3>
              <h2 className="text-3xl md:text-4xl text-white mb-4 font-light tracking-wide uppercase animate-glow">
                About Unplugged
              </h2>
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto mt-4 text-lg italic">
              Unplugged is a platform for discovering and booking unique experiences in Bangalore. Connect with local
              artists, learn new skills, and create lasting memories.
            </p>
          </div>

          <div id="features" className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 ${visibleSections.features ? 'fade-in' : 'fade-in-slow'}`}>
            <div className="bg-black p-8 rounded-xl text-center border border-gray-800 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/10 group">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-700 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 float-icon">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-light tracking-wide animate-glow">
                Local Experiences
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
                Discover handpicked experiences hosted by talented local artists and creators in Bangalore.
              </p>
            </div>

            <div className="bg-black p-8 rounded-xl text-center border border-gray-800 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/10 group">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-700 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 float-icon">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-light tracking-wide animate-glow">
                Curated Events
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
                Join workshops, classes, and events that inspire creativity and foster community connections.
              </p>
            </div>

            <div className="bg-black p-8 rounded-xl text-center border border-gray-800 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/10 group">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-700 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 float-icon">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl text-white mb-3 font-light tracking-wide animate-glow">
                Intimate Settings
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
                Enjoy small-group experiences that allow for personal interaction and hands-on learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - THIS SECTION SHOULD NOW BE VISIBLE */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="host"
            className={`bg-[#12121e] rounded-2xl p-10 text-center shadow-xl border border-gray-800 relative overflow-hidden ${visibleSections.host ? 'fade-in' : 'fade-in-slow'}`}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pulse-bg"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2 pulse-bg"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg text-purple-400 italic mb-2 animate-glow">
                Join Us
              </h3>
              <h2 className="text-2xl text-white mb-4 font-light tracking-wide animate-glow">
                Want to host an experience?
              </h2>

              <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-light">
                We're always looking for talented artists and creators to host experiences on Unplugged. Share your
                passion and connect with an engaged audience.
              </p>
              <a
                href="https://wa.me/919036779767?text=Hi%20Unplugged,%20I'm%20interested%20in%20hosting%20an%20experience"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 pulse-button"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;