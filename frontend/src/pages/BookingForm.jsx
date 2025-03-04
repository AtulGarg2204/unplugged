import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
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
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`);
        setExperience(response.data);
      } catch (err) {
        console.error('Failed to load experience details:', err);
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
    }
  };

  if (!experience) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="py-8 px-6 sm:px-10">
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Book Experience: {experience.name}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    pattern="[A-Za-z\s]+"
                    title="Please enter only letters and spaces"
                    className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    pattern="[A-Za-z\s]+"
                    title="Please enter only letters and spaces"
                    className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Gender</h2>
              <div className="grid grid-cols-3 gap-4">
                {['Male', 'Female', 'Other'].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={option.toLowerCase()}
                      name="gender"
                      value={option}
                      required
                      className="h-5 w-5 border-2 border-gray-300 text-purple-600 focus:ring-purple-500"
                      checked={formData.gender === option}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={option.toLowerCase()} className="ml-3 block text-base text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Details</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    title="Please enter a valid 10-digit phone number"
                    placeholder="10-digit mobile number"
                    className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address"
                    className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Age</h2>
              <div className="max-w-xs">
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="5"
                  max="120"
                  title="Please enter an age between 5 and 120"
                  className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Source of Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">How did you get to know about the event?</h2>
              <select
                name="sourceOfInformation"
                required
                className="h-12 block w-full rounded-lg border-2 border-gray-200 px-4 py-2.5 focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.sourceOfInformation}
                onChange={handleInputChange}
              >
                <option value="">Select an option</option>
                <option value="Instagram">Instagram</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Friends/Family">Friends/Family</option>
                <option value="Posters">Posters</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* WhatsApp Updates */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="whatsappUpdates"
                  name="whatsappUpdates"
                  className="h-5 w-5 border-2 border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={formData.whatsappUpdates}
                  onChange={handleInputChange}
                />
                <label htmlFor="whatsappUpdates" className="ml-3 block text-base text-gray-700">
                  Would you like to receive updates about future workshops via WhatsApp?
                </label>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Details</h2>
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                <p className="text-lg font-medium text-gray-700 mb-6">Amount to Pay: ₹{experience.registrationFee}</p>
                <div className="mb-6">
                  <img 
                    src="/qr-code.png"
                    alt="Payment QR Code"
                    className="mx-auto max-w-[250px] rounded-lg shadow-md"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="paymentConfirmed"
                    name="paymentConfirmed"
                    required
                    className="h-5 w-5 border-2 border-gray-300 text-purple-600 focus:ring-purple-500"
                    checked={formData.paymentConfirmed}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="paymentConfirmed" className="ml-3 block text-base text-gray-700">
                    I confirm that I have completed the payment
                  </label>
                </div>
                <p className="text-sm text-gray-600 italic">Once you are done with the payment, click submit</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-3 px-8 rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02]"
            >
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 