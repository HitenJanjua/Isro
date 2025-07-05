import React from 'react';
import { ArrowRight, Satellite } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400/10 rounded-full animate-pulse blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full animate-pulse blur-3xl" />
        {[...Array(40)].map((_, i) => (
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <Satellite className="h-16 w-16 text-cyan-400 mx-auto animate-bounce" />
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Explore <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Space Weather Data?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our research initiative to advance space weather prediction capabilities using 
          cutting-edge data from the Aditya-L1 mission at the L1 Lagrange point.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2">
            <Satellite className="h-5 w-5" />
            <span>Access Research Data</span>
          </button>
          
          <button className="group border-2 border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white hover:border-purple-500 font-semibold py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center space-x-2">
            <span>View Publications</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;