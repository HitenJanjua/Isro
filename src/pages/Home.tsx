import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Stats />
      {/* <CTA /> */}
    </div>
  );
};

export default Home;