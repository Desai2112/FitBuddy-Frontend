import React from 'react';
import Navbar from '../../components/LandingPage/Navbar';
import Features from '../../components/LandingPage/Features';
import Hero from '../../components/LandingPage/Hero';
import Footer from '../../components/LandingPage/Footer';
import Banner from "../../components/LandingPage/Banner";
import Review from "../../components/LandingPage/Review";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-0"> {/* Removed top padding since we have a spacer in the Navbar component */}
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="banner">
         <Banner/>
        </div>
        <div id="review">
         <Review/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;