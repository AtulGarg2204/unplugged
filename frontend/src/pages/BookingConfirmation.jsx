import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Mail, Home, Calendar } from 'lucide-react';

const BookingConfirmation = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Add animation on load
    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-16 pt-40 px-4 flex items-center justify-center" style={{ fontFamily: "'Bayon', sans-serif" }}>
      <div className={`w-full max-w-lg transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="bg-[#12121e] rounded-xl shadow-lg p-10 border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 
              className="text-3xl text-white uppercase mb-6 animate-glow text-center"
              style={{ fontWeight: 500, letterSpacing: '0.5px' }}
            >
              Booking Confirmed!
            </h1>
            
            <div className="space-y-6 mb-8">
              <p 
                className="text-gray-300 text-center"
                style={{ fontWeight: 300, letterSpacing: '0.3px' }}
              >
                Thank you for booking the experience. We have received your booking and payment confirmation.
              </p>

              <div className="flex items-center justify-center space-x-3 bg-[#1a1a2e] p-4 rounded-lg border border-gray-700">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p 
                  className="text-gray-300"
                  style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-900/40">
                <p 
                  className="text-purple-300 text-center"
                  style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  Please check your email for detailed information about the experience.
                  If you don't see the email, please check your spam folder.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p 
                  className="text-gray-300"
                  style={{ fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  We're excited to see you at the event! Add this to your calendar so you don't miss it.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/"
                className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                style={{ fontWeight: 500, letterSpacing: '0.5px' }}
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;