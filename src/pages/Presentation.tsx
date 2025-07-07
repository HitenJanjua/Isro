// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Satellite, Database, BarChart3, Target, Zap, Shield } from 'lucide-react';

// const Presentation = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Research methodology slides with content
//   const slides = [
//     {
//       id: 1,
//       title: 'Project Overview',
//       content: {
//         heading: 'Identifying Halo CME Events',
//         subheading: 'Using SWIS-ASPEX Payload Data from Aditya-L1',
//         points: [
//           'Early warning system for space weather events',
//           'Particle data analysis at L1 Lagrange point',
//           'Protection of space assets from CME impacts',
//           'Advanced signal processing techniques'
//         ],
//         icon: Satellite
//       }
//     },
//     {
//       id: 2,
//       title: 'Research Objectives',
//       content: {
//         heading: 'Primary Research Goals',
//         subheading: 'Advancing Space Weather Prediction',
//         points: [
//           'Identify transient halo CME events from SWIS data',
//           'Analyze particle flux, density, temperature, velocity',
//           'Develop threshold detection methodologies',
//           'Create robust early warning capabilities'
//         ],
//         icon: Target
//       }
//     },
//     {
//       id: 3,
//       title: 'Dataset & Tools',
//       content: {
//         heading: 'Data Sources & Technology Stack',
//         subheading: 'Comprehensive Research Infrastructure',
//         points: [
//           'SWIS Level-2 data from August 2024 onwards (ISSDC)',
//           'CACTUS CME database for event validation',
//           'Python/C with CDF libraries (NASA SPDF)',
//           'Matplotlib, Plotly, Pandas, SciPy, NumPy'
//         ],
//         icon: Database
//       }
//     },
//     {
//       id: 4,
//       title: 'Methodology',
//       content: {
//         heading: 'Research Approach',
//         subheading: 'Systematic CME Detection Process',
//         points: [
//           'Extract SWIS data for identified CME windows',
//           'Analyze time-series features and gradients',
//           'Derive statistical thresholds for detection',
//           'Validate against confirmed CME occurrences'
//         ],
//         icon: BarChart3
//       }
//     },
//     {
//       id: 5,
//       title: 'Expected Outcomes',
//       content: {
//         heading: 'Research Deliverables',
//         subheading: 'Advancing Space Weather Science',
//         points: [
//           'Threshold parameters for CME event detection',
//           'Enhanced understanding of solar wind signatures',
//           'Improved space weather prediction accuracy',
//           'Robust early warning system framework'
//         ],
//         icon: Zap
//       }
//     },
//     {
//       id: 6,
//       title: 'Impact & Applications',
//       content: {
//         heading: 'Real-World Applications',
//         subheading: 'Protecting Space Infrastructure',
//         points: [
//           'Satellite protection from radiation damage',
//           'Power grid stability during geomagnetic storms',
//           'Aviation safety for polar flight routes',
//           'International space weather collaboration'
//         ],
//         icon: Shield
//       }
//     }
//   ];


//   // const slides = [
//   //   {
//   //     id: 1,
//   //     imagePath: '/slides/1.jpg',
//   //     alt: 'Slide 1'
//   //   },
//   //   {
//   //     id: 2,
//   //     imagePath: '/slides/2.jpg',
//   //     alt: 'Slide 2'
//   //   },
//   //   {
//   //     id: 3,
//   //     imagePath: '/slides/3.jpg',
//   //     alt: 'Slide 3'
//   //   },
//   //   {
//   //     id: 4,
//   //     imagePath: '/slides/4.jpg',
//   //     alt: 'Slide 4'
//   //   },
//   //   {
//   //     id: 5,
//   //     imagePath: '/slides/5.jpg',
//   //     alt: 'Slide 5'
//   //   }
//   // ];


//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentSlide(index);
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowLeft') prevSlide();
//       if (e.key === 'ArrowRight') nextSlide();
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   const progress = ((currentSlide + 1) / slides.length) * 100;
//   const currentSlideData = slides[currentSlide];

//   return (
//     <div className="pt-16 bg-gray-900 min-h-screen">
//       {/* Navigation Controls */}
//       <div className="relative bg-gray-800/50 backdrop-blur-sm border-b border-purple-500/20 py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {/* Left Arrow */}
//             <button
//               onClick={prevSlide}
//               className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-purple-500/30 hover:border-cyan-400/50"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </button>

//             {/* Progress Bar and Counter */}
//             <div className="flex-1 mx-8">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-400">
//                   {currentSlideData.title} ({currentSlide + 1} of {slides.length})
//                 </span>
//                 <span className="text-sm text-cyan-400">
//                   {Math.round(progress)}% Complete
//                 </span>
//               </div>
//               <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>

//             {/* Right Arrow */}
//             <button
//               onClick={nextSlide}
//               className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-purple-500/30 hover:border-cyan-400/50"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Slide Indicators */}
//           <div className="flex justify-center mt-4 space-x-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentSlide
//                     ? 'bg-cyan-400 scale-125'
//                     : 'bg-gray-600 hover:bg-gray-500'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Slide Content */}
//       <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
//         {/* Cosmic background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400/10 rounded-full animate-pulse blur-3xl" />
//           <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full animate-pulse blur-3xl" />
//           {[...Array(30)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>

//         {/* Content Slide */}
//         <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl p-12">
//               <div className="text-center">
//                 {/* Icon */}
//                 <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full mx-auto mb-8">
//                   <currentSlideData.content.icon className="h-10 w-10 text-cyan-400" />
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                   {currentSlideData.content.heading}
//                 </h1>

//                 {/* Subheading */}
//                 <h2 className="text-xl md:text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-12">
//                   {currentSlideData.content.subheading}
//                 </h2>

//                 {/* Content Points */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//                   {currentSlideData.content.points.map((point, index) => (
//                     <div 
//                       key={index}
//                       className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg border border-purple-500/20 hover:border-cyan-400/40 transition-all duration-300"
//                     >
//                       <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-2 flex-shrink-0" />
//                       <p className="text-gray-300 text-left text-lg leading-relaxed">
//                         {point}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Instructions */}
//       <div className="bg-gray-900 py-6 border-t border-purple-500/20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p className="text-gray-400 text-sm mb-2">
//             Use arrow keys, navigation buttons, or click the slide indicators to navigate through the research presentation.
//           </p>
//           <p className="text-gray-500 text-xs">
//             This presentation outlines our methodology for identifying Halo CME events using Aditya-L1 SWIS-ASPEX data.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Presentation;



import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Static image slides - you can replace these paths with your actual images
    const slides = [
    {
      id: 1,
      imagePath: '/slides/1.jpg',
      alt: 'Slide 1'
    },
    {
      id: 2,
      imagePath: '/slides/2.jpg',
      alt: 'Slide 2'
    },
    {
      id: 3,
      imagePath: '/slides/3.jpg',
      alt: 'Slide 3'
    },
    {
      id: 4,
      imagePath: '/slides/4.jpg',
      alt: 'Slide 4'
    },
    {
      id: 5,
      imagePath: '/slides/5.jpg',
      alt: 'Slide 5'
    },
    {
      id: 6,
      imagePath: '/slides/6.jpg',
      alt: 'Slide 6'
    },
    {
      id: 7,
      imagePath: '/slides/7.jpg',
      alt: 'Slide 7'
    },
    {
      id: 8,
      imagePath: '/slides/8.jpg',
      alt: 'Slide 8'
    },
    {
      id: 9,
      imagePath: '/slides/9.jpg',
      alt: 'Slide 9'
    },
    {
      id: 10,
      imagePath: '/slides/10.jpg',
      alt: 'Slide 10'
    },
    {
      id: 11,
      imagePath: '/slides/11.jpg',
      alt: 'Slide 11'
    },
    {
      id: 12,
      imagePath: '/slides/12.jpg',
      alt: 'Slide 12'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Navigation Controls */}
      <div className="relative bg-gray-800/50 backdrop-blur-sm border-b border-purple-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-purple-500/30 hover:border-cyan-400/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Progress Bar and Counter */}
            <div className="flex-1 mx-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
                <span className="text-sm text-cyan-400">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="bg-gray-700/50 hover:bg-gray-600/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-purple-500/30 hover:border-cyan-400/50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-cyan-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        {/* Cosmic background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400/10 rounded-full animate-pulse blur-3xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full animate-pulse blur-3xl" />
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

        {/* Image Slide */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl overflow-hidden">
              <div className="aspect-video bg-gray-800/50 flex items-center justify-center">
                <img
                  src={slides[currentSlide].imagePath}
                  alt={slides[currentSlide].alt}
                  className="w-full h-full object-contain transition-all duration-1000 ease-in-out"
                  onError={(e) => {
                    // Fallback when image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback placeholder */}
                <div className="hidden flex-col items-center justify-center text-center p-12">
                  <Rocket className="h-16 w-16 text-cyan-400 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Slide {currentSlide + 1}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Image placeholder - Add your image to:
                  </p>
                  <code className="text-cyan-400 bg-gray-800/50 px-3 py-1 rounded text-sm">
                    public{slides[currentSlide].imagePath}
                  </code>
                  <p className="text-gray-400 text-sm mt-4">
                    Supported formats: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900 py-6 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Use arrow keys, navigation buttons, or click the slide indicators to control the presentation.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Presentation;