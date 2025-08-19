import React from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react'; 

// Footer Component 
export const Footer = () => {
  return (
    <footer className="bg-white border-t-2">
      {/* Container for footer content to be placed */}

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Copyright text to the left */}
        <p className="text-gray-500 text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Cloksy. All rights reserved.
        </p>

        {/* Social media container to the right */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm">Follow Us</span>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <Instagram size={20} />
          </a>
          <a href="https://github.com/Luxxgit2k4/Cloksy" className="text-gray-500 hover:text-blue-600">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};