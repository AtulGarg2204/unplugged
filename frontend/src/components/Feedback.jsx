import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
    </div>
  );

  if (success) return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="text-green-500 h-16 w-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">Your feedback has been successfully submitted.</p>
        <p className="text-gray-500 mb-6">Redirecting you back to the experience page...</p>
        <Link 
          to={`/experience/${id}`}
          className="inline-block bg-purple-800 hover:bg-purple-900 text-white font-medium py-2 px-6 rounded-md transition"
        >
          Return to Experience
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to={`/experience/${id}`} className="inline-flex items-center text-purple-800 hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Experience
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Share Your Feedback</h1>
        {experience && (
          <p className="text-gray-600 mb-6">About: {experience.name}</p>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email ID <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-gray-700 font-medium mb-1">
                Age <span className="text-red-500">*</span>
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="occupation" className="block text-gray-700 font-medium mb-1">
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-gray-700 font-medium mb-1">
                Which area do you stay in? (E.g. Koramangala, Indiranagar, Whitefield, etc)
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              How would you rate your overall experience? (1- Poor, 5 - Excellent) <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingChange(rating)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    formData.rating === rating 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Feedback */}
          <div className="space-y-4">
            <div>
              <label htmlFor="enjoyedMost" className="block text-gray-700 font-medium mb-1">
                What did you enjoy the most about the workshop? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="enjoyedMost"
                name="enjoyedMost"
                value={formData.enjoyedMost}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <div>
              <label htmlFor="improvements" className="block text-gray-700 font-medium mb-1">
                What could have been better? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="improvements"
                name="improvements"
                value={formData.improvements}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
          </div>

          {/* Event Attendance */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              How often do you typically go for social/learning events in Bangalore? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
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
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={`frequency-${option.value}`} className="text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Reasons */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Why did you decide to attend this workshop? (Select all that apply) <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                <div key={reason.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`reason-${reason.value}`}
                    name="attendReasons"
                    value={reason.value}
                    checked={formData.attendReasons.includes(reason.value)}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={`reason-${reason.value}`} className="text-gray-700">
                    {reason.label}
                  </label>
                </div>
              ))}
              <div className="flex items-center md:col-span-2">
                <input
                  type="checkbox"
                  id="reason-other"
                  name="attendReasons"
                  value="other"
                  checked={formData.attendReasons.includes('other')}
                  onChange={handleCheckboxChange}
                  className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="reason-other" className="text-gray-700 mr-2">
                  Other:
                </label>
                <input
                  type="text"
                  name="otherAttendReason"
                  value={formData.otherAttendReason}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!formData.attendReasons.includes('other')}
                />
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div>
            <label htmlFor="comparison" className="block text-gray-700 font-medium mb-1">
              How does this workshop compare to similar experiences you've attended? (Better, similar, worse? Why?)
            </label>
            <textarea
              id="comparison"
              name="comparison"
              value={formData.comparison}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Regular Sessions Interest */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Would you be interested in regular Freestyle sessions? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
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
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={`regular-${option.value}`} className="text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Dance Styles */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              What other dance styles would you like to learn? (multiple select)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                { value: 'hip-hop', label: 'Hip Hop' },
                { value: 'bollywood', label: 'Bollywood' },
                { value: 'latin', label: 'Bachata/Salsa/Kizomba/Zouk' },
                { value: 'contemporary', label: 'Contemporary' },
                { value: 'classical', label: 'Classical/Semi-classical' }
              ].map((style) => (
                <div key={style.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`dance-${style.value}`}
                    name="danceStyles"
                    value={style.value}
                    checked={formData.danceStyles.includes(style.value)}
                    onChange={handleCheckboxChange}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={`dance-${style.value}`} className="text-gray-700">
                    {style.label}
                  </label>
                </div>
              ))}
              <div className="flex items-center md:col-span-2">
                <input
                  type="checkbox"
                  id="dance-other"
                  name="danceStyles"
                  value="other"
                  checked={formData.danceStyles.includes('other')}
                  onChange={handleCheckboxChange}
                  className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="dance-other" className="text-gray-700 mr-2">
                  Other:
                </label>
                <input
                  type="text"
                  name="otherDanceStyle"
                  value={formData.otherDanceStyle}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!formData.danceStyles.includes('other')}
                />
              </div>
            </div>
          </div>

          {/* Other Interests */}
          <div>
            <label htmlFor="otherInterests" className="block text-gray-700 font-medium mb-1">
              Besides dance, what other Unplugged experiences would interest you? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="otherInterests"
              name="otherInterests"
              value={formData.otherInterests}
              onChange={handleChange}
              required
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* App Interest */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Would it help if there is an app where Unplugged curates & recommends weekend experiences for you? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
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
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor={`app-${option.value}`} className="text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Feedback */}
          <div>
            <label htmlFor="additionalFeedback" className="block text-gray-700 font-medium mb-1">
              Any overall thoughts or suggestions?
            </label>
            <textarea
              id="additionalFeedback"
              name="additionalFeedback"
              value={formData.additionalFeedback}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 px-6 rounded-md transition flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;