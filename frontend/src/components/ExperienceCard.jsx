import { Calendar, Clock, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ExperienceCard = ({ experience }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleCardClick = () => {
    window.scrollTo(0, 0)
    navigate(`/experience/${experience._id}`)
  }

  return (
    <div
      className="bg-black rounded-xl shadow-lg overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-purple-500/30 hover:shadow-xl border border-gray-800 group card-hover"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden image-zoom">
        <img
          src={
            experience.imageUrl.startsWith("http")
              ? experience.imageUrl
              : `${process.env.REACT_APP_API_URI}${experience.imageUrl}`
          }
          alt={experience.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 flex flex-col justify-end transition-all duration-500" 
             style={{
               transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
               opacity: isHovered ? 1 : 0.9
             }}>
          <h3 className="text-xl text-white mb-1 font-semibold animate-glow">
            {experience.name}
          </h3>
          <p className="text-white/80 font-light text-sm transition-all duration-500"
             style={{
               transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
               opacity: isHovered ? 1 : 0.8
             }}>
            {experience.shortDescription}
          </p>
        </div>
      </div>

      <div className="p-4 bg-[#0a0a13]">
        <p className="font-medium text-purple-400 mb-3 italic text-sm transition-all duration-500"
           style={{
             transform: isHovered ? 'translateX(5px)' : 'translateX(0)'
           }}>
          {experience.artistName}
        </p>

        <div className="flex items-center mt-2 text-gray-300 text-sm transition-all duration-300"
             style={{
               opacity: isHovered ? 1 : 0.8
             }}>
          <Calendar className="mr-2 h-4 w-4 text-purple-400 transition-transform duration-500"
                   style={{
                     transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)'
                   }} />
          <span className="font-light">
            {formatDate(experience.date)} ({experience.dayOfWeek})
          </span>
        </div>

        <div className="flex items-center mt-2 text-gray-300 text-sm transition-all duration-300"
             style={{
               opacity: isHovered ? 1 : 0.8
             }}>
          <Clock className="mr-2 h-4 w-4 text-purple-400 transition-transform duration-500"
                style={{
                  transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)'
                }} />
          <span className="font-light">{experience.time}</span>
        </div>

        <div className="flex items-center mt-3 font-semibold text-white p-2 rounded-lg transition-all duration-500 price-highlight">
          <Wallet className="mr-2 h-4 w-4 text-purple-400 transition-transform duration-500"
                 style={{
                   transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)'
                 }} />
          <span>₹{experience.registrationFee}</span>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard