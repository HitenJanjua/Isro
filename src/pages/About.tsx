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
                What is <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CME?</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                A Coronal Mass Ejection (CME) is a massive burst of solar wind and magnetic
                fields rising above the solar corona or being released into space.
                CMEs often accompany solar flares and other forms of solar activity like sunspots.
              </p>


              <h2 className="text-4xl font-bold text-white mb-6">
                What Happens <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">During a CME?</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                The Sun ejects billions of tons of plasma (charged particles like electrons and protons) into space.
                This ejected material travels through the solar system at speeds ranging from 250 to 3,000 km/s.
                CMEs can take 1 to 3 days to reach Earth, depending on their speed.
              </p>
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                  <div className="text-2xl font-bold text-cyan-400">L1 Point</div>
                  <div className="text-sm text-gray-400">Observation Location</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">SWIS-ASPEX</div>
                  <div className="text-sm text-gray-400">Instrument Payload</div>
                </div>
              </div> */}
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
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">

            <div>


              <h2 className="text-4xl font-bold text-white mb-6">
                Brief about <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Idea:</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                SuryaKiran is an advanced early warning system that integrates physics-informed 
                methodologies with machine learning techniques to detect Halo Coronal Mass Ejections 
                (CMEs) utilizing in-situ particle data from the SWIS payload aboard the Aditya-L1 
                satellite. Halo CMEs represent significant solar eruptions directed towards Earth, 
                which have the potential to disrupt satellite operations, GPS functionality, power 
                grids, and communication networks. Conventional systems, such as CACTUS, depend on 
                image-based coronagraph data, which can result in delays and necessitate visual confirmation.
              </p>

              <p className="text-lg text-gray-300 mb-6">
                In contrast, our system presents a novel, data-driven approach: it processes 
                real-time Level-2 solar wind data from SWIS, including parameters such as flux, 
                density, temperature, and speed, to identify patterns indicative of CMEs. 
                The system further validates detected events by cross-referencing timestamps and 
                velocity metrics from the CACTUS CME catalog. It is designed to issue immediate alerts
                to relevant infrastructure authorities, including power grid operators and satellite 
                managers, through a web-based platform that features real-time dashboards, timelines, and live risk indicators.
              </p>

              <p className="text-lg text-gray-300 mb-6">
                By utilizing insights from particle behavior and plasma dynamics, SuryaKiran is capable of 
                predicting CME activity prior to its impact on Earth, independent of image data. 
                The system employs a combination of signal processing techniques, established physics 
                thresholds, and Random Forest models to create a scalable pipeline for early detection. 
                SuryaKiran represents India's inaugural comprehensive predictive alert system for Halo CMEs, 
                effectively integrating space science, electronics, and machine learning into a singular, 
                accessible tool for enhancing real-time preparedness for space weather events.
              </p>


              <h2 className="text-4xl font-bold text-white mb-6">
              Problem We are <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">trying to Solve:</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
              Systems such as satellites, communication networks, aviation, power grids, and 
              defense infrastructure. A significant yet frequently underestimated threat to these 
              systems arises from a solar phenomenon known as Halo Coronal Mass Ejections (CMEs). 
              These events consist of substantial eruptions of charged particles from the Sun 
              directed towards Earth, which can lead to severe disruptions in satellite operations, 
              GPS, communications and power distribution systems by instigating geomagnetic storms 
              upon interaction with Earth's magnetosphere.

              </p>

              <p className="text-lg text-gray-300 mb-6">
              Current detection systems for CMEs, such as the CACTUS system, depend on coronagraph 
              imagery obtained from spacecraft like SOHO. These systems are image-based, necessitating
              extensive processing of white-light images to ascertain the shapes and trajectories of
              CMEs. This methodology results in delays, particularly for Earth-directed (halo) CMEs.
              Furthermore, the reliance on visual confirmation introduces a degree of subjectivity 
              and is often contingent upon optimal viewing angles. Consequently, there exists a 
              notable absence of a fully automated, real-time, data-driven early warning system that 
              utilizes direct observations of solar wind particles, particularly one that functions 
              independently of image-based detection methods.
              </p>
              

              <p className="text-lg text-gray-300 mb-6">
              SuryaKiran addresses this by developing an automated detection system for Halo CMEs 
              that is predicated on real-time particle data from the SWIS payload aboard Aditya-L1, 
              our approach involves the analysis of in-situ solar wind parameters, such as ion flux, 
              temperature, speed, and density to identify the physical signatures indicative of CME 
              events prior to their impact on Earth. We juxtapose these signatures with validated 
              historical CME records from the CACTUS database to train a ML model (Random Forest), 
              thereby establishing a robust pipeline for the detection of potential Halo CMEs. 
              This facilitates real-time predictions and alerts to stakeholders in critical 
              infrastructure through a web-based dashboard.
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
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TechStack:</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-5xl mx-auto">
          Python, FastAPI, Pandas, NumPy, SciPy, Scikit-learn (Random Forest), SQLite, JSON, Plotly, Tailwind CSS, Next.js, Vercel, GitHub, SMTP, Twilio
          </p>

        </div>

        </section>
    </div>
  );
};

export default About;