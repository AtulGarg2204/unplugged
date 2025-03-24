import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URI;

const ApiService = {
  // Get all experiences
  getAllExperiences: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences`);
      return response.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // Get active experiences for landing page
  getActiveExperiences: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active experiences:', error);
      throw error;
    }
  },

  // Get single experience
  getExperience: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      throw error;
    }
  },

  // Create new experience
  createExperience: async (experienceData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      Object.keys(experienceData).forEach(key => {
        if (key === 'image' && experienceData[key] instanceof File) {
          formData.append('image', experienceData[key]);
        } else {
          formData.append(key, experienceData[key]);
        }
      });
      
      const response = await axios.post(`${API_URL}/api/experiences`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },

  // Update experience
  updateExperience: async (id, experienceData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      Object.keys(experienceData).forEach(key => {
        if (key === 'image' && experienceData[key] instanceof File) {
          formData.append('image', experienceData[key]);
        } else {
          formData.append(key, experienceData[key]);
        }
      });
      
      const response = await axios.put(`${API_URL}/api/experiences/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating experience ${id}:`, error);
      throw error;
    }
  },

  // Update experience active status
  updateExperienceStatus: async (id, isActive) => {
    try {
      const response = await axios.patch(`${API_URL}/api/experiences/${id}/status`, { isActive });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for experience ${id}:`, error);
      throw error;
    }
  },

  // Delete experience
  deleteExperience: async (id) => {
    console.log("hello");
    try {
      const response = await axios.delete(`${API_URL}/api/experiences/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting experience ${id}:`, error);
      throw error;
    }
  }
};

export default ApiService;