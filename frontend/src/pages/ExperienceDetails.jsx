
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Instagram, MapPin, ArrowLeft, Loader2, MessageSquare } from 'lucide-react'
import axios from "axios"

const ExperienceDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [experience, setExperience] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbnails, setThumbnails] = useState([])
  const [isBooking, setIsBooking] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    mainContent: false,
    details: false,
    aboutArtist: false,
    video: false
  })

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/experiences/${id}`)
        setExperience(response.data)

        // For demo purposes, using the same image for thumbnails
        // In a real app, you would have multiple images in your model
        if (response.data.imageUrl) {
          setThumbnails([
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl,
            response.data.imageUrl,
          ])
        }

        setLoading(false)
        
        // Trigger fade-in animations after data is loaded
        setTimeout(() => {
          setVisibleSections({
            mainContent: true,
            details: true,
            aboutArtist: true,
            video: true
          })
        }, 100)
      } catch (err) {
        setError("Failed to load experience details")
        setLoading(false)
        console.error(err)
      }
    }

    fetchExperience()
    
    // Set up intersection observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const sections = ['details-section', 'about-artist', 'video-section']
    sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) observer.unobserve(element)
    })
  }, [id])

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    })
  }

  const formatTime = (timeString) => {
    return timeString || ""
  }

  const handleBooking = () => {
    setIsBooking(true)
    setTimeout(() => {
      window.scrollTo(0, 0)
      navigate(`/book-experience/${id}`)
    }, 1500) // 1.5 seconds delay
  }

  const navigateToFeedback = () => {
    navigate(`/feedback/${id}`)
  }

  const handleThumbnailHover = (index) => {
    if (index !== selectedImage) {
      setSelectedImage(index)
    }
  }

  // Function to get appropriate embed URL based on the video platform
  const getVideoEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle YouTube URLs (standard and shortened)
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    
    // Handle Instagram URLs (posts, reels, tv)
    const instagramRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com(?:\/p\/|\/reel\/|\/tv\/)([a-zA-Z0-9_-]+)(?:\S+)?/;
    const instagramMatch = url.match(instagramRegex);
    
    if (instagramMatch && instagramMatch[1]) {
      return `https://www.instagram.com/p/${instagramMatch[1]}/embed`;
    }
    
    // Return original URL if not matching any known platform
    return url;
  };

  // Determine if video is from Instagram
  const isInstagramVideo = (url) => {
    if (!url) return false;
    return url.includes('instagram.com');
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )

  if (error)
    return (
      <div 
        className="container mx-auto p-4 text-center text-red-400 bg-black min-h-screen"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
      >
        <p>{error}</p>
        <Link
          to="/"
          className="text-gray-300 hover:text-purple-400 hover:underline mt-4 inline-block transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    )

  if (!experience)
    return (
      <div 
        className="container mx-auto p-4 text-center bg-black text-white min-h-screen"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
      >
        <p>Experience not found</p>
        <Link
          to="/"
          className="text-gray-300 hover:text-purple-400 hover:underline mt-4 inline-block transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    )

  const mainImageUrl = thumbnails[selectedImage] || experience.imageUrl
  const displayImageUrl = mainImageUrl.startsWith("http")
    ? mainImageUrl
    : `${process.env.REACT_APP_API_URI}${mainImageUrl}`

  return (
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="container mx-auto px-4 pb-16 pt-40 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-gray-300 hover:text-purple-400 mb-6 transition-colors duration-300"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experiences
        </Link>

        <div className={`grid md:grid-cols-2 gap-8 mb-12 ${visibleSections.mainContent ? 'fade-in' : 'fade-in-slow'}`}>
          {/* Left Column - Image */}
          <div className="image-zoom">
            <div className="mb-4 rounded-lg overflow-hidden shadow-lg transition-shadow duration-500 hover:shadow-purple-500/30 hover:shadow-2xl">
              <img
                src={displayImageUrl || "/placeholder.svg"}
                alt={experience.name}
                className="w-full h-auto object-cover transition-transform duration-700"
              />
            </div>

            {/* Thumbnails */}
            {thumbnails.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto">
                {thumbnails.map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    onMouseEnter={() => handleThumbnailHover(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 hover:shadow-purple-500/30 ${
                      selectedImage === index ? "border-purple-500 transform scale-105" : "border-transparent"
                    }`}
                  >
                    <img
                      src={thumb.startsWith("http") ? thumb : `${process.env.REACT_APP_API_URI}${thumb}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="bg-black p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-800 pulse-bg">
            <h1 
              className="text-3xl text-white mb-1 tracking-wide uppercase animate-glow"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
            >
              {experience.name}
            </h1>
            <p 
              className="text-gray-300 mb-4 transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              {experience.shortDescription}
            </p>

            <div 
              className="text-2xl font-bold text-white mb-4 price-highlight inline-block px-3 py-1 rounded"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.4px' }}
            >
              ₹{experience.registrationFee.toLocaleString()}
              <span 
                className="text-sm font-normal text-gray-400 ml-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
              >
                (Inclusive of 18% GST)
              </span>
            </div>

            <div 
              className="flex items-center mb-4 text-gray-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              <MapPin className="mr-2 h-5 w-5 text-purple-400 float-icon" />
              <span>The Brown Table, Sadashivnagar, Bangalore</span>
            </div>

            <div 
              className="flex flex-wrap items-center border-b border-t border-gray-800 py-4 mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              <div className="mr-8">
                <span className="text-gray-300">
                  {experience.dayOfWeek}, {formatDate(experience.date)} | {formatTime(experience.time)}
                </span>
              </div>

              <div>
                <span className="text-gray-300">No. of Seats: {experience.numberOfSeats}</span>
              </div>
            </div>

            <div className="mb-6">
              <p 
                className="text-sm text-gray-300 mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
              >
                {experience.numberOfSeats} seats left
              </p>
              <p 
                className="text-gray-300 mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
              >
                {experience.description}
              </p>

              {experience.artistName && (
                <p 
                  className="text-purple-400 italic mb-2 animate-glow"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.4px' }}
                >
                  The theme for this experience is led by {experience.artistName}.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBooking}
                disabled={isBooking}
                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 w-full pulse-button"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
              >
                {isBooking ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Booking...
                  </>
                ) : (
                  "Book this Experience"
                )}
              </button>

              <button
                onClick={navigateToFeedback}
                className="inline-flex items-center justify-center bg-black hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 text-sm w-auto mx-auto hover:shadow-md border border-gray-800 hover:border-purple-400"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.4px' }}
              >
                <MessageSquare className="mr-1 h-4 w-4" />
                Give Your Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Additional Details Sections */}
        <div id="details-section" className={`grid md:grid-cols-2 gap-8 mb-12 ${visibleSections.details ? 'fade-in' : 'fade-in-slow'}`}>
          <div className="bg-black p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-800 card-hover">
            <h2 
              className="text-xl text-white mb-4 tracking-wide animate-glow"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
            >
              What Will You Get
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  An immersive experience using the finest ingredients, under the guidance of expert artists.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  A delectable menu to relish during the experience.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  An exclusive recipe e-booklet.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  Unadulterated joy, conversations and memories to take home.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-800 card-hover">
            <h2 
              className="text-xl text-white mb-4 tracking-wide animate-glow"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
            >
              Registration Details
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  One ticket is valid for one participant.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  Ticket price includes all material, equipment and utilities required for the experience.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  Registrations close on the day of the experience - an hour prior to the start time, subject to
                  availability of seats.
                </span>
              </li>
              <li className="flex items-start group">
                <span className="text-purple-400 mr-2 transition-transform duration-300 group-hover:scale-125">•</span>
                <span 
                  className="text-gray-300 transition-colors duration-300 group-hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
                >
                  Cancellations, refunds and transfers, if any, will be as per our Refund Policy.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* About the Artist Section */}
        {experience.aboutArtist && (
          <div id="about-artist" className={`mb-12 bg-black p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-800 card-hover ${visibleSections.aboutArtist ? 'fade-in' : 'fade-in-slow'}`}>
            <h2 
              className="text-xl text-white mb-4 tracking-wide animate-glow"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
            >
              About the Artist
            </h2>
            <p 
              className="text-gray-300 mb-4 transition-colors duration-300 hover:text-white"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              {experience.aboutArtist}
            </p>

            {experience.artistInstagramId && (
              <div className="flex items-center text-gray-300 transition-all duration-300 hover:transform hover:translate-x-2">
                <Instagram className="text-pink-400 mr-2 h-5 w-5 transition-transform duration-300 hover:scale-110" />
                <a
                  href={experience.artistInstagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 hover:underline transition-colors duration-300"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: '0.3px' }}
                >
                  {experience.artistInstagramId}
                </a>
              </div>
            )}
          </div>
        )}

       {/* Video Section */}
       {experience.videoUrl && (
          <div id="video-section" className={`mb-12 ${visibleSections.video ? 'fade-in' : 'fade-in-slow'}`}>
            <h2 
              className="text-xl text-white mb-4 tracking-wide animate-glow"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 500, letterSpacing: '0.5px' }}
            >
              Watch Preview
            </h2>
            {/* Make this a fixed aspect ratio container */}
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-purple-500/30 hover:shadow-xl border border-gray-800" 
                style={{ paddingBottom: isInstagramVideo(experience.videoUrl) ? '120%' : '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getVideoEmbedUrl(experience.videoUrl)}
                title="Video player"
                frameBorder="0"
                scrolling="no"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperienceDetails
