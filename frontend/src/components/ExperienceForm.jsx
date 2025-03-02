import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const ExperienceForm = ({ experience, onSubmit, submitButtonText }) => {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD for date input
    dayOfWeek: '',
    time: '',
    registrationFee: '',
    artistName: '',
    artistInstagramId: '',
    artistInstagramLink: '',
    aboutArtist: '',
    imageUrl: '',
    videoUrl: '',
    numberOfSeats: '',
    googleFormLink: 'https://l6ae6wgo.forms.app/unplugged-bhangra',
    isActive: true
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If editing an existing experience, populate the form
  useEffect(() => {
    if (experience) {
      setFormData({
        name: experience.name || '',
        shortDescription: experience.shortDescription || '',
        description: experience.description || '',
        date: experience.date ? new Date(experience.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        dayOfWeek: experience.dayOfWeek || '',
        time: experience.time || '',
        registrationFee: experience.registrationFee || '',
        artistName: experience.artistName || '',
        artistInstagramId: experience.artistInstagramId || '',
        artistInstagramLink: experience.artistInstagramLink || '',
        aboutArtist: experience.aboutArtist || '',
        imageUrl: experience.imageUrl || '',
        videoUrl: experience.videoUrl || '',
        numberOfSeats: experience.numberOfSeats || '',
        googleFormLink: experience.googleFormLink || 'https://l6ae6wgo.forms.app/unplugged-bhangra',
        isActive: experience.isActive !== undefined ? experience.isActive : true
      });
      
      if (experience.imageUrl) {
        setImagePreview(experience.imageUrl.startsWith('http') 
          ? experience.imageUrl 
          : `${process.env.REACT_APP_API_URI}${experience.imageUrl}`);
      }
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // If date is changed, update the day of week
    if (name === 'date') {
      const selectedDate = new Date(value);
      const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });
      setFormData(prev => ({
        ...prev,
        date: value,
        dayOfWeek: dayOfWeek
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFormData(prev => ({ ...prev, imageUrl: '' })); // Clear imageUrl if uploading a file
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = [
      'name', 'shortDescription', 'description', 'time', 'registrationFee', 
      'artistName', 'artistInstagramId', 'artistInstagramLink', 'aboutArtist', 'numberOfSeats'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate that either an image URL or a file upload is provided
    if (!formData.imageUrl && !image && !imagePreview) {
      newErrors.image = 'Please provide an image URL or upload an image';
    }
    
    // Number validations
    if (isNaN(Number(formData.registrationFee)) || Number(formData.registrationFee) < 0) {
      newErrors.registrationFee = 'Please enter a valid amount';
    }
    
    if (isNaN(Number(formData.numberOfSeats)) || Number(formData.numberOfSeats) <= 0) {
      newErrors.numberOfSeats = 'Please enter a valid number of seats';
    }
    
    // URL validations
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    if (formData.artistInstagramLink && !urlPattern.test(formData.artistInstagramLink)) {
      newErrors.artistInstagramLink = 'Please enter a valid URL';
    }
    
    if (formData.videoUrl && !urlPattern.test(formData.videoUrl)) {
      newErrors.videoUrl = 'Please enter a valid URL';
    }
    
    if (formData.googleFormLink && !urlPattern.test(formData.googleFormLink)) {
      newErrors.googleFormLink = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Create final submission data with either file or URL
        const submissionData = { ...formData };
        if (image) {
          submissionData.image = image;
        }
        
        await onSubmit(submissionData);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg p-8 shadow-sm">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          {experience ? 'Edit Experience' : 'Create New Experience'}
        </h2>
        <p className="text-gray-500 mt-1">Fill in the details to {experience ? 'update' : 'create'} an experience</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <span className="bg-purple-100 text-purple-800 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
            Basic Information
          </h3>
          
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Experience Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Short Description (5-6 words) *
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.shortDescription ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.shortDescription && <p className="mt-1.5 text-sm text-red-600">{errors.shortDescription}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Full Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="registrationFee" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Fee (₹) *
              </label>
              <input
                type="number"
                id="registrationFee"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
                min="0"
                className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.registrationFee ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.registrationFee && <p className="mt-1.5 text-sm text-red-600">{errors.registrationFee}</p>}
            </div>
            
            <div>
              <label htmlFor="numberOfSeats" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Seats *
              </label>
              <input
                type="number"
                id="numberOfSeats"
                name="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleChange}
                min="1"
                className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.numberOfSeats ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.numberOfSeats && <p className="mt-1.5 text-sm text-red-600">{errors.numberOfSeats}</p>}
            </div>
          </div>
        </div>
        
        {/* Date, Time & Artist Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <span className="bg-purple-100 text-purple-800 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
            Date, Time & Artist Information
          </h3>
          
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.time && <p className="mt-1.5 text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>
          
          <div className="mb-5">
            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700 mb-1">
              Day of Week
            </label>
            <input
              type="text"
              id="dayOfWeek"
              name="dayOfWeek"
              value={formData.dayOfWeek}
              className="block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-gray-50 text-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              readOnly
            />
            <p className="mt-1.5 text-xs text-gray-500">This is automatically set based on the date selection</p>
          </div>
          
          <div className="mb-5">
            <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 mb-1">
              Artist Name *
            </label>
            <input
              type="text"
              id="artistName"
              name="artistName"
              value={formData.artistName}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.artistName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.artistName && <p className="mt-1.5 text-sm text-red-600">{errors.artistName}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="artistInstagramId" className="block text-sm font-medium text-gray-700 mb-1">
              Artist Instagram ID *
            </label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <input
                type="text"
                id="artistInstagramId"
                name="artistInstagramId"
                value={formData.artistInstagramId}
                onChange={handleChange}
                className={`flex-1 min-w-0 block w-full px-4 py-2.5 rounded-none rounded-r-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.artistInstagramId ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.artistInstagramId && <p className="mt-1.5 text-sm text-red-600">{errors.artistInstagramId}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="artistInstagramLink" className="block text-sm font-medium text-gray-700 mb-1">
              Artist Instagram Link *
            </label>
            <input
              type="url"
              id="artistInstagramLink"
              name="artistInstagramLink"
              value={formData.artistInstagramLink}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.artistInstagramLink ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.artistInstagramLink && <p className="mt-1.5 text-sm text-red-600">{errors.artistInstagramLink}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="aboutArtist" className="block text-sm font-medium text-gray-700 mb-1">
              About the Artist *
            </label>
            <textarea
              id="aboutArtist"
              name="aboutArtist"
              rows={3}
              value={formData.aboutArtist}
              onChange={handleChange}
              className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                errors.aboutArtist ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.aboutArtist && <p className="mt-1.5 text-sm text-red-600">{errors.aboutArtist}</p>}
          </div>
        </div>
      </div>
      
      {/* Media & Links */}
      <div className="space-y-6 pt-6 mt-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
          <span className="bg-purple-100 text-purple-800 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
          Media & Links
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-3">
                Image Upload *
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageChange}
                  accept="image/*"
                  className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                    errors.image ? 'border-red-500' : ''
                  }`}
                />
              </div>
              
              <div className="mt-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Or Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  disabled={!!image}
                />
                <p className="mt-1.5 text-xs text-gray-500">Either upload an image or provide a URL</p>
              </div>
              
              {errors.image && <p className="mt-1.5 text-sm text-red-600">{errors.image}</p>}
            </div>
            
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <div className="flex justify-center border border-gray-200 rounded-lg p-3 bg-white">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-48 object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="mb-5">
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL (YouTube, Instagram, etc.)
              </label>
              <input
                type="url"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=example"
                className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.videoUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.videoUrl && <p className="mt-1.5 text-sm text-red-600">{errors.videoUrl}</p>}
            </div>
            
            <div className="mb-5">
              <label htmlFor="googleFormLink" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Form Link *
              </label>
              <input
                type="url"
                id="googleFormLink"
                name="googleFormLink"
                value={formData.googleFormLink}
                onChange={handleChange}
                className={`block w-full px-4 py-2.5 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.googleFormLink ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.googleFormLink && <p className="mt-1.5 text-sm text-red-600">{errors.googleFormLink}</p>}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mt-6">
              <div className="flex items-center">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-3 block text-sm text-gray-700 font-medium">
                  Active (visible on customer page)
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-8">
                Toggle this option to make the experience visible to customers
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-gray-200 mt-10 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center px-8 py-3 rounded-md text-white font-medium text-base transition-all ${
            isSubmitting 
              ? 'bg-yellow-400 cursor-not-allowed' 
              : 'bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg'
          }`}
        >
          <Save className="mr-2 h-5 w-5" />
          {isSubmitting ? 'Saving...' : (submitButtonText || 'Save Experience')}
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;