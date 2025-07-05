import React from 'react';
import { Users, Target, Award, Heart, Satellite } from 'lucide-react';

const About = () => {
  const objectives = [
    {
      icon: Target,
      title: 'CME Event Identification',
      description: 'Use SWIS data to identify transient events such as halo Coronal Mass Ejections from the Sun.'
    },
    {
      icon: Users,
      title: 'Data Characterization',
      description: 'Analyze SWIS Level-2 data including particle flux, number density, temperature, and velocity.'
    },
    {
      icon: Award,
      title: 'Threshold Development',
      description: 'Develop methods to process time-series data and derive suitable thresholds for CME detection.'
    },
    {
      icon: Heart,
      title: 'Early Warning System',
      description: 'Create an early warning system to prevent catastrophic destruction to space assets.'
    }
  ];

  return (
    <div className="pt-16 bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Cosmic background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400/10 rounded-full animate-pulse blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full animate-pulse blur-3xl" />
          {[...Array(50)].map((_, i) => (
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Satellite className="h-16 w-16 text-cyan-400 mx-auto mb-6 animate-bounce" />
          <h1 className="text-5xl font-bold text-white mb-6">
            About Our <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Research</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advancing space weather science through innovative analysis of solar wind data 
            from India's first dedicated solar observatory mission.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-purple-900/20 relative overflow-hidden">
        {/* Background stars */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Research <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Overview</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Our Sun drives the particle flux in the interplanetary medium and significantly affects 
                our near-Earth environment. Sudden changes in particle flux can result in significant 
                disturbances in the upper atmosphere, potentially causing major losses to space assets.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                This research project focuses on developing an early warning system based on particle 
                measurements carried out at the L1 Lagrange point, approximately 1.5 million kilometers 
                from Earth, before these particles reach our planet.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <div className="text-2xl font-bold text-cyan-400">L1 Point</div>
                  <div className="text-sm text-gray-400">Observation Location</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">SWIS-ASPEX</div>
                  <div className="text-sm text-gray-400">Instrument Payload</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl p-8 text-center border border-purple-500/20">
              <div className="text-6xl mb-4">🛰️</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Aditya-L1 <span className="text-cyan-400">Mission</span>
              </h3>
              <p className="text-gray-300">
                India's first dedicated solar observatory mission, positioned at the L1 Lagrange point 
                to continuously monitor solar activities and space weather phenomena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Research <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Objectives</span>
            </h2>
            <p className="text-xl text-gray-300">
              Key goals driving our space weather research initiative
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mx-auto mb-4">
                  <objective.icon className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {objective.title}
                </h3>
                <p className="text-gray-300">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background stars */}
        <div className="absolute inset-0">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Expected <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Outcomes</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Our research aims to deliver significant advances in space weather prediction capabilities
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-cyan-400/40 hover:shadow-cyan-500/25 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-cyan-400">Threshold Identification</span>
              </h3>
              <p className="text-gray-300">
                Development of threshold parameters and derived metrics from SWIS data time-series 
                that are indicative of halo CME events, enabling automated detection systems.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-cyan-400/40 hover:shadow-cyan-500/25 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-purple-400">Enhanced Understanding</span>
              </h3>
              <p className="text-gray-300">
                Improved comprehension of transient solar wind signatures at the L1 location, 
                contributing to the global understanding of space weather phenomena.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;