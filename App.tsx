import React from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import Stats from './src/components/Stats';
import Portfolio from './src/components/Portfolio';
import ProblemSection from './src/components/ProblemSection';
import SolutionsSection from './src/components/SolutionsSection';
import PricingSection from './src/components/PricingSection';
import WhySection from './src/components/WhySection';
import SolutionSection from './src/components/SolutionSection';
import TestimonialSection from './src/components/TestimonialSection';
import CTASection from './src/components/CTASection';
import Footer from './src/components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Portfolio />
        <ProblemSection />
        <SolutionsSection />
        <PricingSection />
        <WhySection />
        <SolutionSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
