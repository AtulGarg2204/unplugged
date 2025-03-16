// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Instagram, MapPin, ArrowLeft, Loader2, MessageSquare } from 'lucide-react';
// import axios from 'axios';

// const ExperienceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [experience, setExperience] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [thumbnails, setThumbnails] = useState([]);
//   const [isBooking, setIsBooking] = useState(false);

//   useEffect(() => {
//     const fetchExperience = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`);
//         setExperience(response.data);
        
//         // For demo purposes, using the same image for thumbnails
//         // In a real app, you would have multiple images in your model
//         if (response.data.imageUrl) {
//           setThumbnails([
//             response.data.imageUrl,
//             response.data.imageUrl,
//             response.data.imageUrl,
//             response.data.imageUrl,
//             response.data.imageUrl
//           ]);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load experience details');
//         setLoading(false);
//         console.error(err);
//       }
//     };

//     fetchExperience();
//   }, [id]);

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: '2-digit'
//     });
//   };

//   const formatTime = (timeString) => {
//     return timeString || '';
//   };

//   const handleBooking = () => {
//     setIsBooking(true);
//     setTimeout(() => {
//       window.scrollTo(0, 0);
//       navigate(`/book-experience/${id}`);
//     }, 1500); // 1.5 seconds delay
//   };

//   const navigateToFeedback = () => {
//     navigate(`/feedback/${id}`);
//   };

//   if (loading) return (
//     <div className="min-h-screen flex justify-center items-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="container mx-auto p-4 text-center text-red-500">
//       <p>{error}</p>
//       <Link to="/" className="text-purple-800 hover:underline mt-4 inline-block">
//         Return to Home
//       </Link>
//     </div>
//   );
  
//   if (!experience) return (
//     <div className="container mx-auto p-4 text-center">
//       <p>Experience not found</p>
//       <Link to="/" className="text-purple-800 hover:underline mt-4 inline-block">
//         Return to Home
//       </Link>
//     </div>
//   );

//   const mainImageUrl = thumbnails[selectedImage] || experience.imageUrl;
//   const displayImageUrl = mainImageUrl.startsWith('http') 
//     ? mainImageUrl 
//     : `${process.env.REACT_APP_API_URI}${mainImageUrl}`;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl">
//       <Link to="/" className="inline-flex items-center text-purple-800 hover:underline mb-6">
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Experiences
//       </Link>

//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         {/* Left Column - Image */}
//         <div>
//           <div className="mb-4">
//             <img 
//               src={displayImageUrl} 
//               alt={experience.name} 
//               className="w-full h-auto object-cover rounded-md"
//             />
//           </div>
          
//           {/* Thumbnails */}
//           {thumbnails.length > 0 && (
//             <div className="flex space-x-2 overflow-x-auto">
//               {thumbnails.map((thumb, index) => (
//                 <button 
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
//                     selectedImage === index ? 'border-yellow-500' : 'border-transparent'
//                   }`}
//                 >
//                   <img 
//                     src={thumb.startsWith('http') ? thumb : `${process.env.REACT_APP_API_URI}${thumb}`}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Right Column - Details */}
//         <div>
//           <h1 className="text-3xl font-bold text-purple-900 mb-1">{experience.name}</h1>
//           <p className="text-gray-700 mb-4">{experience.shortDescription}</p>
          
//           <div className="text-2xl font-bold text-gray-900 mb-4">
//             ₹{experience.registrationFee.toLocaleString()}
//             <span className="text-sm font-normal text-gray-500 ml-2">(Inclusive of 18% GST)</span>
//           </div>
          
//           <div className="flex items-center mb-4 text-gray-700">
//             <MapPin className="mr-2 h-5 w-5 text-purple-800" />
//             <span>The Brown Table, Sadashivnagar, Bangalore</span>
//           </div>
          
//           <div className="flex flex-wrap items-center border-b border-t py-4 mb-4">
//             <div className="mr-8">
//               <span className="text-gray-600">
//                 {experience.dayOfWeek}, {formatDate(experience.date)} | {formatTime(experience.time)}
//               </span>
//             </div>
            
//             <div>
//               <span className="text-gray-600">No. of Seats: {experience.numberOfSeats}</span>
//             </div>
//           </div>
          
//           <div className="mb-6">
//             <p className="text-sm text-gray-700 mb-2">{experience.numberOfSeats} seats left</p>
//             <p className="text-gray-700 mb-4">{experience.description}</p>
            
//             {experience.artistName && (
//               <p className="text-gray-700 italic mb-2">The theme for this experience is led by {experience.artistName}.</p>
//             )}
//           </div>
          
//           <div className="space-y-3">
//             <button 
//               onClick={handleBooking}
//               disabled={isBooking}
//               className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-md transition w-full"
//             >
//               {isBooking ? (
//                 <>
//                   <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
//                   Booking...
//                 </>
//               ) : (
//                 'Book this Experience'
//               )}
//             </button>
            
//             <button 
//               onClick={navigateToFeedback}
//               className="inline-flex items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-md transition text-sm w-auto mx-auto"
//             >
//               <MessageSquare className="mr-1 h-4 w-4" />
//               Give Your Feedback
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Additional Details Sections */}
//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">What Will You Get</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>An immersive experience using the finest ingredients, under the guidance of expert artists.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>A delectable menu to relish during the experience.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>An exclusive recipe e-booklet.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>Unadulterated joy, conversations and memories to take home.</span>
//             </li>
//           </ul>
//         </div>
        
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Registration Details</h2>
//           <ul className="space-y-3">
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>One ticket is valid for one participant.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>Ticket price includes all material, equipment and utilities required for the experience.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>Registrations close on the day of the experience - an hour prior to the start time, subject to availability of seats.</span>
//             </li>
//             <li className="flex items-start">
//               <span className="text-yellow-500 mr-2">•</span>
//               <span>Cancellations, refunds and transfers, if any, will be as per our Refund Policy.</span>
//             </li>
//           </ul>
//         </div>
//       </div>
      
//       {/* About the Artist Section */}
//       {experience.aboutArtist && (
//         <div className="mb-12">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">About the Artist</h2>
//           <p className="text-gray-700 mb-4">{experience.aboutArtist}</p>
          
//           {experience.artistInstagramId && (
//             <div className="flex items-center text-gray-700">
//               <Instagram className="text-pink-500 mr-2 h-5 w-5" />
//               <a 
//                 href={experience.artistInstagramLink} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-pink-500 hover:underline"
//               >
//                 {experience.artistInstagramId}
//               </a>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Video Section */}
//       {experience.videoUrl && (
//         <div className="mb-12">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Watch Preview</h2>
//           <div className="aspect-video rounded-lg overflow-hidden shadow-md">
//             <iframe
//               width="100%"
//               height="100%"
//               src={experience.videoUrl.replace('watch?v=', 'embed/')}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExperienceDetails;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Instagram, MapPin, ArrowLeft, Loader2, MessageSquare } from 'lucide-react';
import axios from 'axios';

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);
  const [isBooking, setIsBooking] = useState(false);

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

  const handleBooking = () => {
    setIsBooking(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      navigate(`/book-experience/${id}`);
    }, 1500); // 1.5 seconds delay
  };

  const navigateToFeedback = () => {
    navigate(`/feedback/${id}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-400 bg-black min-h-screen">
      <p>{error}</p>
      <Link to="/" className="text-gray-300 hover:text-teal-400 hover:underline mt-4 inline-block transition-colors duration-300">
        Return to Home
      </Link>
    </div>
  );
  
  if (!experience) return (
    <div className="container mx-auto p-4 text-center bg-black text-white min-h-screen">
      <p>Experience not found</p>
      <Link to="/" className="text-gray-300 hover:text-teal-400 hover:underline mt-4 inline-block transition-colors duration-300">
        Return to Home
      </Link>
    </div>
  );

  const mainImageUrl = thumbnails[selectedImage] || experience.imageUrl;
  const displayImageUrl = mainImageUrl.startsWith('http') 
    ? mainImageUrl 
    : `${process.env.REACT_APP_API_URI}${mainImageUrl}`;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center text-gray-300 hover:text-teal-400 mb-6 transition-colors duration-300">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experiences
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Image */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <img 
                src={displayImageUrl} 
                alt={experience.name} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            {thumbnails.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {thumbnails.map((thumb, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-teal-500 transform scale-105' : 'border-transparent'
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
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-1">{experience.name}</h1>
            <p className="text-gray-300 mb-4">{experience.shortDescription}</p>
            
            <div className="text-2xl font-bold text-white mb-4">
              ₹{experience.registrationFee.toLocaleString()}
              <span className="text-sm font-normal text-gray-400 ml-2">(Inclusive of 18% GST)</span>
            </div>
            
            <div className="flex items-center mb-4 text-gray-300">
              <MapPin className="mr-2 h-5 w-5 text-teal-400" />
              <span>The Brown Table, Sadashivnagar, Bangalore</span>
            </div>
            
            <div className="flex flex-wrap items-center border-b border-t border-gray-700 py-4 mb-4">
              <div className="mr-8">
                <span className="text-gray-300">
                  {experience.dayOfWeek}, {formatDate(experience.date)} | {formatTime(experience.time)}
                </span>
              </div>
              
              <div>
                <span className="text-gray-300">No. of Seats: {experience.numberOfSeats}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-2">{experience.numberOfSeats} seats left</p>
              <p className="text-gray-300 mb-4">{experience.description}</p>
              
              {experience.artistName && (
                <p className="text-gray-300 italic mb-2">The theme for this experience is led by {experience.artistName}.</p>
              )}
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleBooking}
                disabled={isBooking}
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-[1.02] w-full"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Booking...
                  </>
                ) : (
                  'Book this Experience'
                )}
              </button>
              
              <button 
                onClick={navigateToFeedback}
                className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 text-sm w-auto mx-auto hover:shadow-md"
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Give Your Feedback
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Details Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">What Will You Get</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">An immersive experience using the finest ingredients, under the guidance of expert artists.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">A delectable menu to relish during the experience.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">An exclusive recipe e-booklet.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">Unadulterated joy, conversations and memories to take home.</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Registration Details</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">One ticket is valid for one participant.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">Ticket price includes all material, equipment and utilities required for the experience.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">Registrations close on the day of the experience - an hour prior to the start time, subject to availability of seats.</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-2">•</span>
                <span className="text-gray-300">Cancellations, refunds and transfers, if any, will be as per our Refund Policy.</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* About the Artist Section */}
        {experience.aboutArtist && (
          <div className="mb-12 bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">About the Artist</h2>
            <p className="text-gray-300 mb-4">{experience.aboutArtist}</p>
            
            {experience.artistInstagramId && (
              <div className="flex items-center text-gray-300">
                <Instagram className="text-pink-400 mr-2 h-5 w-5" />
                <a 
                  href={experience.artistInstagramLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 hover:underline transition-colors duration-300"
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
            <h2 className="text-xl font-bold text-white mb-4">Watch Preview</h2>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
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
    </div>
  );
};

export default ExperienceDetails;