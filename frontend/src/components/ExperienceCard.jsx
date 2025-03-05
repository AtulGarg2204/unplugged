import React from 'react';
import {Calendar, Clock, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate(`/experience/${experience._id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={experience.imageUrl.startsWith('http') ? experience.imageUrl : `${process.env.REACT_APP_API_URI}${experience.imageUrl}`} 
          alt={experience.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
          <h3 className="text-xl font-bold text-white">{experience.name}</h3>
          <p className="text-white/90">{experience.shortDescription}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="font-medium text-gray-700">{experience.artistName}</p>
        
        <div className="flex items-center mt-2 text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formatDate(experience.date)} ({experience.dayOfWeek})</span>
        </div>
        
        <div className="flex items-center mt-2 text-gray-600">
          <Clock className="mr-2 h-4 w-4" />
          <span>{experience.time}</span>
        </div>
        
        <div className="flex items-center mt-2 text-emerald-600 font-semibold">
          <Wallet className="mr-2 h-4 w-4" />
          <span>₹{experience.registrationFee}</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;