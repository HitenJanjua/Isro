import React from 'react';
import { Satellite, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Project Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold">Aditya-L1 Research</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Advanced research project focused on identifying Halo CME events using particle data 
              from the SWIS-ASPEX payload onboard India's Aditya-L1 solar observatory mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Research Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Research Focus</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CME Detection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Solar Wind Analysis</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Space Weather Prediction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Processing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ISSDC Data Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CACTUS CME Database</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Aditya-L1 CME Research Project. Advancing space weather science.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;