import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import ExperienceDetails from './pages/ExperienceDetails';
import BookingForm from './pages/BookingForm';
import BookingConfirmation from './pages/BookingConfirmation';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import ContactUs from './components/ContactUs';
import ArtistRegistration from './components/ArtistRegistration';
import SpaceRegistration from './components/SpaceRegistration';
import Feedback from './components/Feedback';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/partner-registration" element={<ArtistRegistration />} />
            <Route path="/feedback/:id" element={<Feedback />} />
            <Route path="/space-registration" element={<SpaceRegistration />} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="/book-experience/:id" element={<BookingForm />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;