import React from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

const ExperienceList = ({ experiences, onEdit, onDelete, onToggleStatus, onViewBookings }) => {
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      {experiences.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No experiences found. Add your first experience!
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {experiences.map(experience => (
            <div key={experience._id} className="p-6 grid grid-cols-12 gap-6 items-center">
              {/* Experience Info - spans 5 columns */}
              <div className="col-span-12 md:col-span-5">
                <div className="flex items-start space-x-4">
                  <img 
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0" 
                    src={experience.imageUrl.startsWith('http') 
                      ? experience.imageUrl 
                      : `${process.env.REACT_APP_API_URI}${experience.imageUrl}`} 
                    alt={experience.name} 
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{experience.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{experience.shortDescription}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      {formatDate(experience.date)} at {experience.time} ({experience.dayOfWeek})
                    </div>
                  </div>
                </div>
              </div>

              {/* Artist and Fee - spans 3 columns */}
              <div className="col-span-12 md:col-span-3">
                <div className="flex flex-col space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-900 font-medium">{experience.artistName}</span>
                    <div className="text-gray-500">@{experience.artistInstagramId}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{experience.registrationFee}
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${
                    experience.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {experience.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Actions - spans 4 columns */}
              <div className="col-span-12 md:col-span-4 flex items-center justify-end space-x-4">
                <button
                  onClick={() => onViewBookings(experience)}
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 min-w-[120px] justify-center"
                >
                  View Bookings
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onEdit(experience)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                    title="Edit"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(experience._id, !experience.isActive)}
                    className={`p-1 rounded-full ${
                      experience.isActive 
                        ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50' 
                        : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                    }`}
                    title={experience.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {experience.isActive ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => onDelete(experience._id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceList;