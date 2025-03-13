import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    acceptance: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/api/contact`,
        formData
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          acceptance: false
        });
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-lg p-8">
          <svg
            className="w-16 h-16 mx-auto text-green-500 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-3xl font-semibold text-green-800 mb-4">
            Thank You for Contacting Us!
          </h2>
          <p className="text-green-600 mb-8">
            We have received your message and will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-green-700 underline hover:text-green-800"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                className="px-2 border border-gray-300 border-r-0 rounded-l-md bg-white focus:outline-none"
                defaultValue="+91"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptance"
            name="acceptance"
            required
            checked={formData.acceptance}
            onChange={handleChange}
            className="mr-2 border-gray-300"
          />
          <label htmlFor="acceptance" className="text-sm text-blue-600">
            I confirm all these above information
          </label>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
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
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span className="mr-2">SEND</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Contact Info Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-purple-900 border-b-2 border-yellow-500 inline-block pb-1">
          GET IN TOUCH
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 mt-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-900">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-700">WeWork Salarpuria Symbiosis</p>
              <a 
                href="https://g.co/kgs/q9eQ8vA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-900 hover:text-purple-700 text-sm inline-flex items-center mt-1"
              >
                View on Maps →
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-900">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="text-gray-700">1800 123 222 333</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-900">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
            </div>
            <a 
              href="https://wa.me/919036779767" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-purple-900"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-900">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
            </div>
            <a 
              href="https://www.instagram.com/be.unplugged?igsh=MTY5am03N25mcW05cg==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-purple-900"
            >
              @be.unplugged
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-6 h-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-900">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <a 
              href="mailto:unpluggedevents2@gmail.com" 
              className="text-gray-700 hover:text-purple-900"
            >
              unpluggedevents2@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Partner With Us Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-purple-900 border-b-2 border-yellow-500 inline-block pb-1">
          PARTNER WITH US
        </h2>
        <p className="text-gray-700 mb-6">
          Are you an expert, keen to develop an immersive experience with us; or a venue looking to offer interesting things to do for your patrons?
        </p>
        <button 
          onClick={() => navigate('/partner-registration')}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <span>Register as Partner</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* List Your Space Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-purple-900 border-b-2 border-yellow-500 inline-block pb-1">
          LIST YOUR SPACE
        </h2>
        <p className="text-gray-700 mb-6">
          Do you have a unique space that could host amazing experiences? List it with us and connect with creative professionals looking for the perfect venue.
        </p>
        <button 
          onClick={() => navigate('/space-registration')}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2"
        >
          <span>List Your Space</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactUs; 