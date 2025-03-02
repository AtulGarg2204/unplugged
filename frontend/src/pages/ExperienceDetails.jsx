import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Instagram, MapPin, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ExperienceDetails = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`);
        setExperience(response.data);
        
        // For demo purposes, using the same image for thumbnails
        // In a real app, you would have multiple images in your model
        if (response.data.imageUrl) {
          setThumbnails([
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl
          ]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load experience details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchExperience();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit'
    });
  };

  const formatTime = (timeString) => {
    return timeString || '';
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-500">
      <p>{error}</p>
      <Link to="/" className="text-purple-800 hover:underline mt-4 inline-block">
        Return to Home
      </Link>
    </div>
  );
  
  if (!experience) return (
    <div className="container mx-auto p-4 text-center">
      <p>Experience not found</p>
      <Link to="/" className="text-purple-800 hover:underline mt-4 inline-block">
        Return to Home
      </Link>
    </div>
  );

  const mainImageUrl = thumbnails[selectedImage] || experience.imageUrl;
  const displayImageUrl = mainImageUrl.startsWith('http') 
    ? mainImageUrl 
    : `${process.env.REACT_APP_API_URI}${mainImageUrl}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/" className="inline-flex items-center text-purple-800 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Experiences
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Image */}
        <div>
          <div className="mb-4">
            <img 
              src={displayImageUrl} 
              alt={experience.name} 
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          
          {/* Thumbnails */}
          {thumbnails.length > 0 && (
            <div className="flex space-x-2 overflow-x-auto">
              {thumbnails.map((thumb, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-yellow-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={thumb.startsWith('http') ? thumb : `${process.env.REACT_APP_API_URI}${thumb}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Column - Details */}
        <div>
          <h1 className="text-3xl font-bold text-purple-900 mb-1">{experience.name}</h1>
          <p className="text-gray-700 mb-4">{experience.shortDescription}</p>
          
          <div className="text-2xl font-bold text-gray-900 mb-4">
            ₹{experience.registrationFee.toLocaleString()}
            <span className="text-sm font-normal text-gray-500 ml-2">(Inclusive of 18% GST)</span>
          </div>
          
          <div className="flex items-center mb-4 text-gray-700">
            <MapPin className="mr-2 h-5 w-5 text-purple-800" />
            <span>The Brown Table, Sadashivnagar, Bangalore</span>
          </div>
          
          <div className="flex flex-wrap items-center border-b border-t py-4 mb-4">
            <div className="mr-8">
              <span className="text-gray-600">
                {experience.dayOfWeek}, {formatDate(experience.date)} | {formatTime(experience.time)}
              </span>
            </div>
            
            <div>
              <span className="text-gray-600">No. of Seats: {experience.numberOfSeats}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">{experience.numberOfSeats} seats left</p>
            <p className="text-gray-700 mb-4">{experience.description}</p>
            
            {experience.artistName && (
              <p className="text-gray-700 italic mb-2">The theme for this experience is led by {experience.artistName}.</p>
            )}
          </div>
          
          <a 
            href={experience.googleFormLink || "https://l6ae6wgo.forms.app/unplugged-bhangra"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-md transition w-full text-center"
          >
            Book this Experience
          </a>
        </div>
      </div>
      
      {/* Additional Details Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">What Will You Get</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>An immersive experience using the finest ingredients, under the guidance of expert artists.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>A delectable menu to relish during the experience.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>An exclusive recipe e-booklet.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>Unadulterated joy, conversations and memories to take home.</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Registration Details</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>One ticket is valid for one participant.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>Ticket price includes all material, equipment and utilities required for the experience.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>Registrations close on the day of the experience - an hour prior to the start time, subject to availability of seats.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span>Cancellations, refunds and transfers, if any, will be as per our Refund Policy.</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* About the Artist Section */}
      {experience.aboutArtist && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About the Artist</h2>
          <p className="text-gray-700 mb-4">{experience.aboutArtist}</p>
          
          {experience.artistInstagramId && (
            <div className="flex items-center text-gray-700">
              <Instagram className="text-pink-500 mr-2 h-5 w-5" />
              <a 
                href={experience.artistInstagramLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:underline"
              >
                {experience.artistInstagramId}
              </a>
            </div>
          )}
        </div>
      )}
      
      {/* Video Section */}
      {experience.videoUrl && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Watch Preview</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="100%"
              src={experience.videoUrl.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetails; 