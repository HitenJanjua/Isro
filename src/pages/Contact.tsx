import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Satellite, CheckCircle, X, AlertCircle, Linkedin } from 'lucide-react';
import { useHref } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);

        // Show success popup
        setShowSuccessPopup(true);

        // Reset form
        setFormData({ name: '', email: '', company: '', message: '' });

        // Auto-hide popup after 5 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 5000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setShowErrorPopup(true);

      // Auto-hide error popup after 5 seconds
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Research Email',
      info: 'teamsuryakiran.nitj@gmail.com',
      description: 'Send us your research inquiries!',
      link: 'mailto:teamsuryakiran.nitj@gmail.com'
    },
    // {
    //   icon: Phone,
    //   title: 'Research Hotline',
    //   info: '+91 (80) ADITYA-L1',
    //   description: 'Mon-Fri from 9am to 6pm (IST)'
    // },
    {
      icon: MapPin,
      title: 'Our University',
      info: 'Dr B R Ambedkar National Institute of Technology Jalandhar',
      description: 'Visit our University website',
      link: 'https://www.nitj.ac.in'
    },
    // {
    //   icon: Clock,
    //   title: 'Data Availability',
    //   info: 'August 2024 onwards',
    //   description: 'SWIS Level-2 data from ISSDC'
    // }
  ];

  const Person = [
    {
      name: 'Bhavya Goyal',
      info: 'Team Leader',
      description: 'hello world!',
      plink: "https://www.linkedin.com/in/martianbhavya",
      img: '/pimg/bhavya.jpeg'
    },
    {
      name: 'Krrish Baghla',
      info: 'Team member-1',
      description: 'hello world!',
      plink: 'https://www.linkedin.com/in/krrish-baghla-860523314/',
      img: '/pimg/krrish.jpeg'
    },
    {
      name: 'Harshita',
      info: 'Team member-2',
      description: 'hello world!',
      plink: 'https://www.linkedin.com/in/harshita-kapur-764623320',
      img: '/pimg/images.png'
    },
    {
      name: 'Hiten Janjua',
      info: 'Team member-3',
      description: 'hello world!',
      plink: "https://www.linkedin.com/in/hiten-janjua-b71534325/",
      img: '/pimg/hiten.jpeg'
    }
  ]





  return (
    <div className="pt-16 bg-gray-900">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-purple-900/50 backdrop-blur-sm rounded-xl border border-green-500/30 shadow-2xl max-w-md w-full mx-auto transform animate-in fade-in zoom-in duration-300">
            <div className="p-8 text-center relative">
              {/* Close button */}
              <button
                onClick={closeSuccessPopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Success icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-full mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>

              {/* Success message */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Message <span className="text-green-400">Received!</span>
              </h3>
              <p className="text-gray-300 mb-6">
                Your research inquiry has been successfully submitted.
                Our team will respond within 24 hours!
              </p>

              {/* Cosmic elements */}
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Close button */}
              <button
                onClick={closeSuccessPopup}
                className="bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-400 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue Research
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-red-900/50 backdrop-blur-sm rounded-xl border border-red-500/30 shadow-2xl max-w-md w-full mx-auto transform animate-in fade-in zoom-in duration-300">
            <div className="p-8 text-center relative">
              {/* Close button */}
              <button
                onClick={closeErrorPopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Error icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-400" />
              </div>

              {/* Error message */}
              <h3 className="text-2xl font-bold text-white mb-2">
                Transmission <span className="text-red-400">Failed!</span>
              </h3>
              <p className="text-gray-300 mb-6">
                Unable to submit your message. Please check your connection and try again.
                Make sure the backend server is running.
              </p>

              {/* Close button */}
              <button
                onClick={closeErrorPopup}
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 via-blue-900 to-purple-900 relative overflow-hidden">
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
            Contact <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Team Surya Kiran</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interested in collaborating on space weather research? Have questions about our CME detection methodology?
            We'd love to hear from fellow researchers and space science enthusiasts.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Send us a <span className="text-cyan-400">research inquiry</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400 disabled:opacity-50"
                      placeholder="Dr. Space Researcher"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400 disabled:opacity-50"
                      placeholder="researcher@university.edu"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Institution/Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400 disabled:opacity-50"
                    placeholder="Your Research Institution"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Research Inquiry
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400 disabled:opacity-50"
                    placeholder="Tell us about your research interests, collaboration ideas, or questions about our CME detection methodology..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Contact</span> Information
                </h2>
                <p className="text-gray-300 mb-8">
                  We welcome collaboration opportunities, data sharing requests, and discussions
                  about space weather research methodologies and findings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  
                  <div  className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 hover:border-cyan-400/40 hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2">
                    <a key={index} href={info.link}>
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-4">
                      <info.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-1">
                      {info.info}
                    </p>
                    <p className="text-sm text-gray-400">
                      {info.description}
                    </p>
                    </a>
                  </div>
                  
                ))}
              </div>

              {/* Research FAQ Section */}
              {/* <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Frequently Asked <span className="text-cyan-400">Research Questions</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      How can I access the SWIS Level-2 data?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      SWIS data from August 2024 onwards is available through the ISSDC (Indian Space Science Data Centre) portal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      What programming tools are recommended?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      We recommend Python or C with CDF libraries from NASA SPDF, along with Matplotlib, Plotly, Pandas, SciPy, and NumPy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      Can I collaborate on this research?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Yes! We welcome collaborations from researchers worldwide. Contact us to discuss potential partnerships.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            {Person.map((person, index) => (
              <a key={index} href={person.plink}>

                <div className="relative bg-gradient-to-br from-gray-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 hover:border-cyan-400/40 hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </div>

                  <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-purple-500/20  mb-4 rounded-full">
                    <img src={person.img} className="h-20 w-20 rounded-full " />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 col-span-2">
                    {person.name}
                  </h3>
                  <p className="text-cyan-400 font-medium mb-1">
                    {person.info}
                  </p>
                  
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;