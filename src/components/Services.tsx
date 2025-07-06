import React from 'react';
import { Satellite, BarChart3, Target, Shield, Zap, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Satellite,
      title: 'SWIS Data Analysis',
      description: 'Processing Solar Wind Ion Spectrometer data to extract particle flux, density, temperature, and velocity parameters.',
      features: ['Level-2 Data Processing', 'Time-series Analysis', 'Parameter Extraction', 'Quality Assessment']
    },
    {
      icon: Target,
      title: 'CME Event Detection',
      description: 'Identifying halo Coronal Mass Ejection events using advanced signal processing and threshold analysis.',
      features: ['Event Identification', 'Signature Recognition', 'Temporal Analysis', 'Pattern Matching']
    },
    {
      icon: BarChart3,
      title: 'Statistical Modeling',
      description: 'Developing statistical thresholds and derived parameters for robust CME event classification.',
      features: ['Threshold Derivation', 'Feature Engineering', 'Statistical Analysis', 'Model Validation']
    },
    {
      icon: Shield,
      title: 'Space Weather Prediction',
      description: 'Early warning system development for space weather events that could impact Earth and satellites.',
      features: ['Predictive Modeling', 'Risk Assessment', 'Alert Systems', 'Impact Analysis']
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'High-performance algorithms for processing continuous data streams from Aditya-L1 at L1 Lagrange point.',
      features: ['Stream Processing', 'Real-time Analysis', 'Low Latency', 'Automated Detection']
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Combining SWIS data with CACTUS CME database for comprehensive event validation and analysis.',
      features: ['Multi-source Integration', 'Data Correlation', 'Validation Framework', 'Archive Management']
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
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
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Research <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced methodologies for analyzing solar wind data and detecting space weather events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 p-8 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-6 group-hover:from-cyan-400/30 group-hover:to-purple-400/30 transition-all duration-300">
                <service.icon className="h-8 w-8 text-cyan-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-4">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;