import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle, MessageSquare, Star } from 'lucide-react';
import axios from 'axios';

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    form: false
  });
  
  const [formData, setFormData] = useState({
    experienceId: id,
    name: '',
    email: '',
    age: '',
    occupation: '',
    area: '',
    rating: 0,
    enjoyedMost: '',
    improvements: '',
    eventFrequency: '',
    attendReasons: [],
    otherAttendReason: '',
    comparison: '',
    regularSessions: '',
    danceStyles: [],
    otherDanceStyle: '',
    otherInterests: '',
    appInterest: '',
    additionalFeedback: ''
  });

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`);
        setExperience(response.data);
        setLoading(false);
        
        // Activate animations after data is loaded
        setTimeout(() => {
          setVisibleSections({ form: true });
        }, 300);
      } catch (err) {
        setError('Failed to load experience details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchExperience();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'attendReasons') {
      setFormData(prev => {
        if (checked) {
          return { ...prev, attendReasons: [...prev.attendReasons, value] };
        } else {
          return { ...prev, attendReasons: prev.attendReasons.filter(reason => reason !== value) };
        }
      });
    } else if (name === 'danceStyles') {
      setFormData(prev => {
        if (checked) {
          return { ...prev, danceStyles: [...prev.danceStyles, value] };
        } else {
          return { ...prev, danceStyles: prev.danceStyles.filter(style => style !== value) };
        }
      });
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await axios.post(`${process.env.REACT_APP_API_URI}/api/feedback`, formData);
      setSuccess(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        navigate(`/experience/${id}`);
      }, 3000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      setSubmitting(false);
      console.error(err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (success) return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
      <div className="max-w-md w-full bg-[#12121e] rounded-xl shadow-lg p-8 text-center border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h2 
            className="text-2xl text-white mb-4 tracking-wide uppercase animate-glow"
            style={{ fontWeight: 500, letterSpacing: '0.5px' }}
          >
            Thank You!
          </h2>
          <p 
            className="text-gray-300 mb-6"
            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
          >
            Your feedback has been successfully submitted.
          </p>
          <p 
            className="text-gray-400 mb-6"
            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
          >
            Redirecting you back to the experience page...
          </p>
          
          <Link 
            to={`/experience/${id}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            style={{ fontWeight: 400, letterSpacing: '0.4px' }}
          >
            Return to Experience
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pb-16 pt-40 px-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
      <div className="container mx-auto max-w-4xl">
        <Link 
          to={`/experience/${id}`} 
          className="inline-flex items-center text-gray-300 hover:text-purple-400 mb-8 transition-colors duration-300 group"
          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Experience
        </Link>

        <div className={`bg-[#12121e] rounded-xl shadow-lg border border-gray-800 overflow-hidden ${visibleSections.form ? 'fade-in' : 'fade-in-slow'}`}>
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 
                    className="text-2xl text-white animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    Share Your Feedback
                  </h1>
                  {experience && (
                    <p 
                      className="text-gray-400"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      About: {experience.name}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div 
                  className="bg-red-900/20 text-red-400 p-4 rounded-lg mb-6 border border-red-800/50"
                  style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 
                    className="text-xl text-white mb-4 border-b border-gray-800 pb-2 animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your name"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Email ID <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your email"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label 
                        htmlFor="age"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Age <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="1"
                        max="120"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your age"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="occupation"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Occupation <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your occupation"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="area"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Area of Residence
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="E.g. Koramangala, Indiranagar"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Section */}
                <div>
                  <h2 
                    className="text-xl text-white mb-4 border-b border-gray-800 pb-2 animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    Your Experience
                  </h2>
                  
                  <label 
                    className="block text-sm text-gray-400 mb-3"
                    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                  >
                    How would you rate your overall experience? <span className="text-purple-400">*</span>
                  </label>
                  <div className="flex space-x-2 mb-6">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(rating)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          formData.rating >= rating 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                            : 'bg-black/50 border border-gray-700 text-gray-400 hover:border-purple-500'
                        }`}
                      >
                        <Star className={`h-6 w-6 ${formData.rating >= rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                    <span 
                      className="ml-2 text-gray-400 self-center"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label 
                        htmlFor="enjoyedMost"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        What did you enjoy the most about the workshop? <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        id="enjoyedMost"
                        name="enjoyedMost"
                        value={formData.enjoyedMost}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Share what you loved about the experience"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      ></textarea>
                    </div>

                    <div>
                      <label 
                        htmlFor="improvements"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        What could have been better? <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        id="improvements"
                        name="improvements"
                        value={formData.improvements}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Your suggestions for improvement"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Event Attendance */}
                <div>
                  <h2 
                    className="text-xl text-white mb-4 border-b border-gray-800 pb-2 animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    Your Event Habits
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label 
                        className="block text-sm text-gray-400 mb-3"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        How often do you typically go for social/learning events in Bangalore? <span className="text-purple-400">*</span>
                      </label>
                      <div className="space-y-3 pl-1">
                        {[
                          { value: 'weekly', label: 'Once a week' },
                          { value: '2-3-monthly', label: '2-3 times a month' },
                          { value: 'monthly', label: 'Once a month' },
                          { value: 'first-time', label: 'It was my first workshop!' }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              id={`frequency-${option.value}`}
                              name="eventFrequency"
                              value={option.value}
                              checked={formData.eventFrequency === option.value}
                              onChange={handleChange}
                              required
                              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700"
                            />
                            <label 
                              htmlFor={`frequency-${option.value}`} 
                              className="text-gray-300 hover:text-white transition-colors"
                              style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label 
                        className="block text-sm text-gray-400 mb-3"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Why did you decide to attend this workshop? (Select all that apply) <span className="text-purple-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                        {[
                          { value: 'freestyle', label: 'Always wanted to try Freestyle' },
                          { value: 'womens-day', label: 'Wanted to do something fun on Women\'s Day' },
                          { value: 'social', label: 'Looking for fun social experiences' },
                          { value: 'expertise', label: 'Instructor\'s expertise' },
                          { value: 'unplugged', label: 'Curious about Unplugged Events' },
                          { value: 'recommended', label: 'Recommended by a friend' },
                          { value: 'affordable', label: 'Affordable pricing' },
                          { value: 'location', label: 'Convenient location' },
                          { value: 'promotion', label: 'Great promotional content' },
                          { value: 'forced', label: 'Forced by my friend xD' }
                        ].map((reason) => (
                          <div key={reason.value} className="flex items-center group hover-list-item">
                            <input
                              type="checkbox"
                              id={`reason-${reason.value}`}
                              name="attendReasons"
                              value={reason.value}
                              checked={formData.attendReasons.includes(reason.value)}
                              onChange={handleCheckboxChange}
                              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                            />
                            <label 
                              htmlFor={`reason-${reason.value}`} 
                              className="text-gray-300 group-hover:text-white transition-colors"
                              style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                            >
                              {reason.label}
                            </label>
                          </div>
                        ))}
                        <div className="flex items-center md:col-span-2 mt-2">
                          <input
                            type="checkbox"
                            id="reason-other"
                            name="attendReasons"
                            value="other"
                            checked={formData.attendReasons.includes('other')}
                            onChange={handleCheckboxChange}
                            className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                          />
                          <label 
                            htmlFor="reason-other" 
                            className="text-gray-300 mr-2"
                            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                          >
                            Other:
                          </label>
                          <input
                            type="text"
                            name="otherAttendReason"
                            value={formData.otherAttendReason}
                            onChange={handleChange}
                            className="px-3 py-1 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            disabled={!formData.attendReasons.includes('other')}
                            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Preferences */}
                <div>
                  <h2 
                    className="text-xl text-white mb-4 border-b border-gray-800 pb-2 animate-glow"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    Additional Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label 
                        htmlFor="comparison"
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        How does this workshop compare to similar experiences you've attended?
                      </label>
                      <textarea
                        id="comparison"
                        name="comparison"
                        value={formData.comparison}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Better, similar, worse? Why?"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      ></textarea>
                    </div>

                    <div>
                      <label 
                        className="block text-sm text-gray-400 mb-3"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Would you be interested in regular Freestyle sessions? <span className="text-purple-400">*</span>
                      </label>
                      <div className="space-y-3 pl-1">
                        {[
                          { value: 'yes', label: 'Yes' },
                          { value: 'no', label: 'No' },
                          { value: 'maybe', label: 'Maybe' }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="radio"
                              id={`regular-${option.value}`}
                              name="regularSessions"
                              value={option.value}
                              checked={formData.regularSessions === option.value}
                              onChange={handleChange}
                              required
                              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700"
                            />
                            <label 
                              htmlFor={`regular-${option.value}`} 
                              className="text-gray-300 hover:text-white transition-colors"
                              style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label 
                        className="block text-sm text-gray-400 mb-3"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        What other dance styles would you like to learn? (multiple select)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1">
                        {[
                          { value: 'hip-hop', label: 'Hip Hop' },
                          { value: 'bollywood', label: 'Bollywood' },
                          { value: 'latin', label: 'Bachata/Salsa/Kizomba/Zouk' },
                          { value: 'contemporary', label: 'Contemporary' },
                          { value: 'classical', label: 'Classical/Semi-classical' }
                        ].map((style) => (
                          <div key={style.value} className="flex items-center group hover-list-item">
                            <input
                              type="checkbox"
                              id={`dance-${style.value}`}
                              name="danceStyles"
                              value={style.value}
                              checked={formData.danceStyles.includes(style.value)}
                              onChange={handleCheckboxChange}
                              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                            />
                            <label 
                              htmlFor={`dance-${style.value}`} 
                              className="text-gray-300 group-hover:text-white transition-colors"
                              style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                            >
                              {style.label}
                            </label>
                          </div>
                        ))}
                        <div className="flex items-center md:col-span-2 mt-2">
                          <input
                            type="checkbox"
                            id="dance-other"
                            name="danceStyles"
                            value="other"
                            checked={formData.danceStyles.includes('other')}
                            onChange={handleCheckboxChange}
                            className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                          />
                          <label 
                            htmlFor="dance-other" 
                            className="text-gray-300 mr-2"
                            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                          >
                            Other:
                          </label>
                          <input
                            type="text"
                            name="otherDanceStyle"
                            value={formData.otherDanceStyle}
                            onChange={handleChange}
                            className="px-3 py-1 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                            disabled={!formData.danceStyles.includes('other')}
                            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="otherInterests" className="block text-sm text-gray-400 mb-2">
                        Besides dance, what other Unplugged experiences would interest you? <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        id="otherInterests"
                        name="otherInterests"
                        value={formData.otherInterests}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        placeholder="Share your interests"
                      ></textarea>
                    </div>

                    <div>
  <label 
    htmlFor="otherInterests" 
    className="block text-sm text-gray-400 mb-2"
    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
  >
    Besides dance, what other Unplugged experiences would interest you? <span className="text-purple-400">*</span>
  </label>
  <textarea
    id="otherInterests"
    name="otherInterests"
    value={formData.otherInterests}
    onChange={handleChange}
    required
    rows="3"
    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
    placeholder="Share your interests"
    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
  ></textarea>
</div>

<div>
  <label 
    className="block text-sm text-gray-400 mb-3"
    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
  >
    Would it help if there is an app where Unplugged curates & recommends weekend experiences for you? <span className="text-purple-400">*</span>
  </label>
  <div className="space-y-3 pl-1">
    {[
      { value: 'yes', label: 'Yes! I\'d love a one-stop place/app for interesting events' },
      { value: 'maybe', label: 'Maybe, depends on the events listed' },
      { value: 'no', label: 'No, I already use other platforms' }
    ].map((option) => (
      <div key={option.value} className="flex items-center">
        <input
          type="radio"
          id={`app-${option.value}`}
          name="appInterest"
          value={option.value}
          checked={formData.appInterest === option.value}
          onChange={handleChange}
          required
          className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700"
        />
        <label 
          htmlFor={`app-${option.value}`} 
          className="text-gray-300 hover:text-white transition-colors"
          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
</div>

<div>
  <label 
    htmlFor="additionalFeedback" 
    className="block text-sm text-gray-400 mb-2"
    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
  >
    Any overall thoughts or suggestions?
  </label>
  <textarea
    id="additionalFeedback"
    name="additionalFeedback"
    value={formData.additionalFeedback}
    onChange={handleChange}
    rows="3"
    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
    placeholder="Additional comments or suggestions"
    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
  ></textarea>
</div>
</div>
</div>

{/* Submit Button */}
<div className="pt-4">
<button
  type="submit"
  disabled={submitting}
  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center"
  style={{ fontWeight: 500, letterSpacing: '0.4px' }}
>
  {submitting ? (
    <>
      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
      <span>Submitting...</span>
    </>
  ) : (
    'Submit Feedback'
  )}
</button>
</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;