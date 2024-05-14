import React, { useState, useEffect } from "react";
import Navbar from "../../components/Lading/Navbar.jsx";
import HeroSection from "../../components/Lading/HeroSection.jsx";
import FeatureSection from "../../components/Lading/FeatureSection.jsx"
import Pricing from "../../components/Lading/Pricing.jsx";
import { useTheme } from 'next-themes';
import Footer from "../../components/Lading/Footer.jsx";

function LandingPage() {
  const { theme, setTheme } = useTheme(); 

    return (
        <>
          <Navbar />
          <div className={`max-w-7xl mx-auto pt-20 px-6 ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}   style={{ backgroundColor: theme === "light" ? "#ffff" : "#0000" }}>
            <HeroSection />
            <FeatureSection />
            <Pricing />
            <Footer />
          </div>
        </>
      );
}

export default LandingPage;