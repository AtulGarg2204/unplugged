import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Send, Home } from 'lucide-react';

const SpaceRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    usageType: '',
    hourlyRate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    form: false
  });

  useEffect(() => {
    // Check visibility on initial load
    setTimeout(() => {
      setVisibleSections({ form: true });
    }, 300);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/spaces`,
        formData
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          usageType: '',
          hourlyRate: ''
        });
        toast.success('Space listing submitted successfully!');
      }
    } catch (error) {
      toast.error('Error submitting form. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white pb-16 pt-40 px-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-[#12121e] rounded-xl shadow-lg p-10 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 
                className="text-3xl text-white mb-4 tracking-wide uppercase animate-glow"
                style={{ fontWeight: 500, letterSpacing: '0.5px' }}
              >
                Thank You for Listing Your Space!
              </h2>
              
              <p 
                className="text-gray-300 mb-8"
                style={{ fontWeight: 300, letterSpacing: '0.3px' }}
              >
                We have received your space listing and will get in touch with you soon.
              </p>
              
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                style={{ fontWeight: 400, letterSpacing: '0.4px' }}
              >
                List another space
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16 pt-40 px-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="relative pulse-bg inline-block">
            <h1 
              className="text-4xl md:text-5xl tracking-wide uppercase animate-glow mb-4"
              style={{ fontWeight: 500, letterSpacing: '0.5px' }}
            >
              Space Owner
            </h1>
          </div>
          <p 
            className="text-gray-400 max-w-2xl mx-auto"
            style={{ fontWeight: 300, letterSpacing: '0.3px' }}
          >
            We'd love to get to know more about your space and how we can showcase it to potential experience hosts.
          </p>
        </div>

        {/* Form Section */}
        <div id="space-form" className={`mb-16 ${visibleSections.form ? 'fade-in' : 'fade-in-slow'}`}>
          <div className="bg-[#12121e] rounded-xl shadow-lg p-8 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-8 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <h2 
                  className="text-2xl text-white tracking-wide animate-glow"
                  style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                >
                  Tell Us About Your Space
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      required
                      value={formData.name}
                      onChange={handleChange}
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
                      Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Your email"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm text-gray-400 mb-2"
                    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                  >
                    Phone Number <span className="text-purple-400">*</span>
                  </label>
                  <div className="flex">
                    <select
                      className="px-3 py-3 bg-black/50 border border-gray-700 border-r-0 rounded-l-lg focus:outline-none focus:border-purple-500 transition-colors text-gray-400"
                      defaultValue="+91"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      <option>+91</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-r-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Your phone number"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="location" 
                    className="block text-sm text-gray-400 mb-2"
                    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                  >
                    Where is the space located? <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Enter address or general area"
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="usageType" 
                    className="block text-sm text-gray-400 mb-2"
                    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                  >
                    What can it be used for? <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    id="usageType"
                    name="usageType"
                    required
                    value={formData.usageType}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Describe possible activities (workshops, meetups, etc.)"
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="hourlyRate" 
                    className="block text-sm text-gray-400 mb-2"
                    style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                  >
                    How much do you want to charge for an hourly rental? <span className="text-purple-400">*</span>
                  </label>
                  <div className="relative">
                    <span 
                      className="absolute left-4 top-3.5 text-gray-400"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      ₹
                    </span>
                    <input
                      type="number"
                      id="hourlyRate"
                      name="hourlyRate"
                      required
                      min="0"
                      value={formData.hourlyRate}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Hourly rate"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    />
                  </div>
                </div>

                <div className="text-right pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 pulse-button"
                    style={{ fontWeight: 400, letterSpacing: '0.5px' }}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Submit</span>
                      </>
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

export default SpaceRegistration;