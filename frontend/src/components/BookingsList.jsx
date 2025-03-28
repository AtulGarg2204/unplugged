import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BookingsList = ({ bookings, experienceName, onBack }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 
          className="text-2xl font-bold text-gray-900"
          style={{ 
            fontFamily: "'DM Serif Display', serif", 
            fontWeight: 500, 
            letterSpacing: '0.5px',
            background: "linear-gradient(to bottom, #333333, #000000)",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            WebkitBackgroundClip: "text"
          }}
        >
          Bookings for {experienceName}
        </h2>
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.3px' }}
        >
          <ArrowLeft className="mr-2 -ml-1 h-4 w-4" />
          Back to Experiences
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
                >
                  Name
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
                >
                  Contact
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
                >
                  Age
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
                >
                  Booked On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td 
                    colSpan="4" 
                    className="px-6 py-4 text-center text-gray-500"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                  >
                    No bookings found for this experience yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="text-sm font-medium text-gray-900"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        {booking.firstName} {booking.lastName}
                      </div>
                      <div 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {booking.gender}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="text-sm text-gray-900"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.3px' }}
                      >
                        {booking.phone}
                      </div>
                      <div 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                      >
                        {booking.email}
                      </div>
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      {booking.age}
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                    >
                      {formatDate(booking.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsList;
