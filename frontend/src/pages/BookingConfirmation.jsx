import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for booking the experience. We have received your booking and payment confirmation.
          You will receive further details about the experience via SMS.
        </p>

        <Link
          to="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation; 