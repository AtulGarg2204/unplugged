import { Instagram, Mail, MessageSquare } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <h2 
              className="text-3xl font-bold gradient-text"
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 600, letterSpacing: '0.5px' }}
            >
              Unplugged
            </h2>
          </div>

          <div className="mt-8 md:mt-0">
            <p 
              className="text-center md:text-right text-gray-400 italic"
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              Unique experiences in Bangalore
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-8 md:justify-start">
            <a
              href="https://www.instagram.com/be.unplugged?igsh=MTY5am03N25mcW05cg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-all duration-300"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6 transform transition-transform duration-300 hover:scale-125" />
            </a>
            <a
              href="mailto:unpluggedevents2@gmail.com"
              className="text-gray-400 hover:text-purple-400 transition-all duration-300"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6 transform transition-transform duration-300 hover:scale-125" />
            </a>
            <a
              href="https://wa.me/919036779767"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-all duration-300"
            >
              <span className="sr-only">WhatsApp</span>
              <MessageSquare className="h-6 w-6 transform transition-transform duration-300 hover:scale-125" />
            </a>
          </div>

          <div className="mt-8 md:mt-0">
            <p 
              className="text-base text-gray-400"
              style={{ fontFamily: "'Bayon', sans-serif", fontWeight: 300, letterSpacing: '0.3px' }}
            >
              &copy; {new Date().getFullYear()} Unplugged. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer