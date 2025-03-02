import React, { useState, useEffect } from 'react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="experiences" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Upcoming Experiences</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : experiences.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-10 rounded text-center">
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
        
        <div className="bg-indigo-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Want to host an experience?</h3>
          <p className="text-indigo-600 mb-6">
            We're always looking for talented artists and creators to host experiences on Unplugged.
          </p>
          <a 
            href="mailto:contact@unplugged.com" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;