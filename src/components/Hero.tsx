import React from 'react';
import { ArrowRight, Play, Satellite } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-gray-900" />
      
      {/* Animated stars and cosmic elements */}
      <div className="absolute inset-0">
        {/* Large floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full animate-pulse blur-xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-bounce blur-xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full animate-bounce blur-xl" />
        
        {/* Small stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Satellite className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Identifying Halo
          <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CME Events
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Using particle data from SWIS-ASPEX payload onboard Aditya-L1 mission to detect and analyze 
          Coronal Mass Ejections for space weather prediction and early warning systems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center space-x-2">
            <span>Explore Research</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>View Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;