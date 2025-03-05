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
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
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
      // Update local state to reflect the change
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
        // Remove from local state
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      );
    }

    if (showForm) {
      return (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Experience Management</h1>
        
        {!showForm && !showBookings && (
          <button
            onClick={handleAddNew}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2 -ml-1 h-4 w-4" />
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
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ChevronLeft className="mr-2 -ml-1 h-4 w-4" />
            Back to List
          </button>
        )}
      </div>
      
      {renderContent()}
    </div>
  );
};

export default AdminPage;