import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail } from 'lucide-react';

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
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            Thank you for booking the experience. We have received your booking and payment confirmation.
          </p>

          <div className="flex items-center justify-center text-gray-600 space-x-2">
            <Mail className="h-5 w-5" />
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mt-4">
            <p className="text-purple-700">
              Please check your email for detailed information about the experience.
              If you don't see the email, please check your spam folder.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation; 