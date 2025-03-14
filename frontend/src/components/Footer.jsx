import React from 'react';
import { Instagram, Mail, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <h2 className="text-2xl font-bold">Unplugged</h2>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-gray-400">
              Unique experiences in Bangalore
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:justify-start">
            <a href="https://www.instagram.com/be.unplugged?igsh=MTY5am03N25mcW05cg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="mailto:unpluggedevents2@gmail.com" className="text-gray-400 hover:text-white">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
            <a href="https://wa.me/919036779767" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">WhatsApp</span>
              <MessageSquare className="h-6 w-6" />
            </a>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} Unplugged. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;