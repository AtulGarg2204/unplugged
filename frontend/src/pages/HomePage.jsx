import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, MessageSquare } from 'lucide-react';

import Hero from '../components/Hero';
import ExperienceCard from '../components/ExperienceCard';
import ApiService from '../components/ApiService';

const HomePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getActiveExperiences();
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        setError('Failed to load experiences. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      {/* Experiences Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="experiences" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Experiences</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : experiences.length === 0 ? (
              <div className="bg-white border border-gray-200 text-gray-700 px-4 py-10 rounded text-center">
                <p className="text-xl">No upcoming experiences at the moment.</p>
                <p className="mt-2">Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map(experience => (
                  <ExperienceCard key={experience._id} experience={experience} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overview/Introduction Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="about" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Unplugged</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unplugged is a platform for discovering and booking unique experiences in Bangalore. 
              Connect with local artists, learn new skills, and create lasting memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Experiences</h3>
              <p className="text-gray-600">
                Discover handpicked experiences hosted by talented local artists and creators in Bangalore.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="bg-yellow-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Events</h3>
              <p className="text-gray-600">
                Join workshops, classes, and events that inspire creativity and foster community connections.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intimate Settings</h3>
              <p className="text-gray-600">
                Enjoy small-group experiences that allow for personal interaction and hands-on learning.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="host" className="bg-purple-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Want to host an experience?</h3>
            <p className="text-purple-600 mb-6">
              We're always looking for talented artists and creators to host experiences on Unplugged.
            </p>
            <a 
              href="https://wa.me/919036779767?text=Hi%20Unplugged,%20I'm%20interested%20in%20hosting%20an%20experience" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;