import React, { useState, useEffect } from 'react';
import ExperienceForm from '../components/ExperienceForm';
import ExperienceList from '../components/ExperienceList';
import BookingsList from '../components/BookingsList';
import ApiService from '../components/ApiService';
import { PlusCircle, ChevronLeft } from 'lucide-react';

const AdminPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [showBookings, setShowBookings] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
      setError('Failed to load experiences. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentExperience(null);
    setFormMode('add');
    setShowForm(true);
  };

  const handleEdit = (experience) => {
    setCurrentExperience(experience);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleViewBookings = async (experience) => {
    try {
      setLoading(true);
      setCurrentExperience(experience);
      const response = await fetch(`${process.env.REACT_APP_API_URI}/api/bookings/experience/${experience._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
      setShowBookings(true);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      alert('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromBookings = () => {
    setShowBookings(false);
    setCurrentExperience(null);
    setBookings([]);
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      await ApiService.updateExperienceStatus(id, isActive);
      setExperiences(experiences.map(exp => 
        exp._id === id ? { ...exp, isActive } : exp
      ));
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update experience status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience? This action cannot be undone.')) {
      try {
        await ApiService.deleteExperience(id);
        setExperiences(experiences.filter(exp => exp._id !== id));
      } catch (err) {
        console.error('Failed to delete experience:', err);
        alert('Failed to delete experience. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'add') {
        const newExperience = await ApiService.createExperience(formData);
        setExperiences([...experiences, newExperience]);
      } else {
        const updatedExperience = await ApiService.updateExperience(currentExperience._id, formData);
        setExperiences(experiences.map(exp => 
          exp._id === updatedExperience._id ? updatedExperience : exp
        ));
      }
      setShowForm(false);
      setCurrentExperience(null);
    } catch (err) {
      console.error('Failed to save experience:', err);
      alert(`Failed to ${formMode === 'add' ? 'create' : 'update'} experience. Please try again.`);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-900/20 border border-red-800 text-red-400 px-6 py-4 rounded-lg"
             style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}>
          {error}
        </div>
      );
    }

    if (showForm) {
      return (
        <div className="bg-[#0a0a13] shadow-lg rounded-xl p-8 border border-gray-800 transition-all duration-500 hover:shadow-purple-500/20">
          <h2 
            style={{ 
              background: "linear-gradient(to right, #8B5CF6, #6366F1)",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              fontFamily: "'DM Serif Display', serif",
              fontWeight: "500",
              letterSpacing: '0.5px'
            }}
            className="text-2xl mb-6"
          >
            {formMode === 'add' ? 'Add New Experience' : 'Edit Experience'}
          </h2>
          <ExperienceForm 
            experience={currentExperience} 
            onSubmit={handleFormSubmit}
            submitButtonText={formMode === 'add' ? 'Create Experience' : 'Update Experience'}
          />
        </div>
      );
    }

    if (showBookings) {
      return (
        <BookingsList
          bookings={bookings}
          experienceName={currentExperience?.name}
          onBack={handleBackFromBookings}
        />
      );
    }

    return (
      <ExperienceList
        experiences={experiences}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onViewBookings={handleViewBookings}
      />
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto pb-16 pt-40 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h3 
              className="text-purple-400 text-sm font-medium mb-2"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                fontStyle: "italic"
              }}
            >
              Dashboard
            </h3>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ 
                background: "linear-gradient(to right, #8B5CF6, #6366F1)",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                fontFamily: "'DM Serif Display', serif",
                letterSpacing: '0.5px'
              }}
            >
              EXPERIENCE MANAGEMENT
            </h1>
          </div>
          
          {!showForm && !showBookings && (
            <button
              onClick={handleAddNew}
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Experience
            </button>
          )}
          
          {(showForm || showBookings) && (
            <button
              onClick={() => {
                setShowForm(false);
                setShowBookings(false);
                setCurrentExperience(null);
              }}
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 rounded-lg text-gray-300 bg-transparent border border-gray-700 hover:border-purple-500 hover:text-white transition-all duration-300"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                letterSpacing: '0.4px'
              }}
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Back to List
            </button>
          )}
        </div>
        
        <div className="bg-[#0a0a13] rounded-xl shadow-xl border border-gray-800">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;