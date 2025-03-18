import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CreditCard, User, Mail, Phone, Calendar, Info, Loader2 } from 'lucide-react';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    form: false
  });
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    age: '',
    sourceOfInformation: '',
    whatsappUpdates: false,
    paymentConfirmed: false
  });

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`);
        setExperience(response.data);
        setLoading(false);
        
        // Activate animations after data is loaded
        setTimeout(() => {
          setVisibleSections({ form: true });
        }, 300);
      } catch (err) {
        console.error('Failed to load experience details:', err);
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special validation for phone numbers
    if (name === 'phoneNumber') {
      // Only allow numbers and limit to 10 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
      return;
    }

    // Special validation for names
    if (name === 'firstName' || name === 'lastName') {
      // Only allow letters and spaces
      const sanitizedValue = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional validation before submission
    if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (formData.age < 5 || formData.age > 120) {
      alert('Please enter a valid age between 5 and 120');
      return;
    }

    try {
      setSubmitting(true);
      const bookingData = {
        ...formData,
        experienceId: id,
        age: parseInt(formData.age),
        bookingDate: new Date(),
      };

      await axios.post(`${process.env.REACT_APP_API_URI}/api/bookings`, bookingData);
      navigate('/booking-confirmation');
    } catch (err) {
      console.error('Failed to submit booking:', err);
      alert('Failed to submit booking. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center p-4" style={{ fontFamily: "'Bayon', sans-serif" }}>
        <div className="text-center">
          <h2 
            className="text-2xl mb-4"
            style={{ fontWeight: 500, letterSpacing: '0.5px' }}
          >
            Experience not found
          </h2>
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105"
            style={{ fontWeight: 400, letterSpacing: '0.4px' }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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

        <div className={`mb-8 ${visibleSections.form ? 'fade-in' : 'fade-in-slow'}`}>
          <div className="relative pulse-bg mb-2">
            <h1 
              className="text-3xl md:text-4xl text-white tracking-wide uppercase animate-glow"
              style={{ fontWeight: 500, letterSpacing: '0.5px' }}
            >
              Book Experience
            </h1>
          </div>
          <p 
            className="text-purple-400 text-xl"
            style={{ fontWeight: 400, letterSpacing: '0.4px' }}
          >
            {experience.name}
          </p>
        </div>

        <div className={`bg-[#12121e] rounded-xl shadow-lg border border-gray-800 overflow-hidden ${visibleSections.form ? 'fade-in' : 'fade-in-slow'}`} style={{animationDelay: '0.2s'}}>
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>
            
            <div className="relative z-10 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      Personal Information
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="firstName" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        First Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        pattern="[A-Za-z\s]+"
                        title="Please enter only letters and spaces"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="lastName" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Last Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        pattern="[A-Za-z\s]+"
                        title="Please enter only letters and spaces"
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Gender Selection */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      Gender
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Male', 'Female', 'Other'].map((option) => (
                      <div key={option} className="flex items-center">
                        <input
                          type="radio"
                          id={option.toLowerCase()}
                          name="gender"
                          value={option}
                          required
                          className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700"
                          checked={formData.gender === option}
                          onChange={handleInputChange}
                        />
                        <label 
                          htmlFor={option.toLowerCase()} 
                          className="text-gray-300 hover:text-white transition-colors"
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      Contact Details
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="phoneNumber" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Phone Number <span className="text-purple-400">*</span>
                      </label>
                      <div className="flex">
                        <span 
                          className="px-4 py-3 bg-black/70 border border-r-0 border-gray-700 rounded-l-lg text-gray-400"
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        >
                          +91
                        </span>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          pattern="[0-9]{10}"
                          maxLength="10"
                          title="Please enter a valid 10-digit phone number"
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-r-lg focus:outline-none focus:border-purple-500 transition-colors"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm text-gray-400 mb-2"
                        style={{ fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        Email <span className="text-purple-400">*</span>
                      </label>
                      <div className="flex items-center">
                        <Mail className="text-gray-500 absolute ml-3" size={18} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          title="Please enter a valid email address"
                          className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                          style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      Age
                    </h2>
                  </div>
                  
                  <div className="max-w-xs">
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      min="5"
                      max="120"
                      title="Please enter an age between 5 and 120"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Your age"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    />
                  </div>
                </div>

                {/* Source of Information */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      How did you get to know about the event?
                    </h2>
                  </div>
                  
                  <select
                    name="sourceOfInformation"
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-gray-300"
                    value={formData.sourceOfInformation}
                    onChange={handleInputChange}
                    style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                  >
                    <option value="" className="bg-[#0a0a13] text-gray-300">Select an option</option>
                    <option value="Instagram" className="bg-[#0a0a13] text-gray-300">Instagram</option>
                    <option value="WhatsApp" className="bg-[#0a0a13] text-gray-300">WhatsApp</option>
                    <option value="Friends/Family" className="bg-[#0a0a13] text-gray-300">Friends/Family</option>
                    <option value="Posters" className="bg-[#0a0a13] text-gray-300">Posters</option>
                    <option value="Other" className="bg-[#0a0a13] text-gray-300">Other</option>
                  </select>
                </div>

                {/* WhatsApp Updates */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="whatsappUpdates"
                      name="whatsappUpdates"
                      className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                      checked={formData.whatsappUpdates}
                      onChange={handleInputChange}
                    />
                    <label 
                      htmlFor="whatsappUpdates" 
                      className="text-gray-300 hover:text-white transition-colors"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      Would you like to receive updates about future workshops via WhatsApp?
                    </label>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-black/30 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-purple-500/10 hover:shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 float-icon mr-4">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 
                      className="text-xl text-white tracking-wide animate-glow"
                      style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                    >
                      Payment Details
                    </h2>
                  </div>
                  
                  <div className="bg-[#0a0a13] p-6 rounded-lg border border-gray-700">
                    <p 
                      className="text-lg text-white mb-6 price-highlight inline-block px-4 py-2 rounded-lg"
                      style={{ fontWeight: 500, letterSpacing: '0.4px' }}
                    >
                      Amount to Pay: ₹{experience.registrationFee}
                    </p>
                    <div className="mb-6 transform transition-transform hover:scale-105">
                      <img 
                        src="/qr-code.png"
                        alt="Payment QR Code"
                        className="mx-auto max-w-[250px] rounded-lg shadow-md border border-gray-700"
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="paymentConfirmed"
                        name="paymentConfirmed"
                        required
                        className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 bg-black/50 border-gray-700 rounded"
                        checked={formData.paymentConfirmed}
                        onChange={handleInputChange}
                      />
                      <label 
                        htmlFor="paymentConfirmed" 
                        className="text-gray-300 hover:text-white transition-colors"
                        style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        I confirm that I have completed the payment
                      </label>
                    </div>
                    <p 
                      className="text-sm text-gray-400 italic"
                      style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      Once you are done with the payment, click submit
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center pulse-button"
                    style={{ fontWeight: 500, letterSpacing: '0.5px' }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      'Submit Booking'
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

export default BookingForm;