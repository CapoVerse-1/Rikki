import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Updated data structure
const featuredCollection = {
    id: 1,
    artistName: "Benjamin Heinze",
    collectionTitle: "Urban Canvas",
    description: "Dive into the vibrant world of Benjamin Heinze. Discover the raw energy, process, and narrative behind the \"Urban Canvas\" collection. Celebrating street art aesthetics.",
    // Array of image URLs for the mini-slider - UPDATED
    imageUrls: [
        "/collection pictures/WhatsApp Bild 2025-04-25 um 16.46.55_e58722cc.jpg",
        "/collection pictures/WhatsApp Bild 2025-04-25 um 15.48.19_5e2e4683.jpg",
        "/collection pictures/WhatsApp Bild 2025-04-25 um 15.48.17_7170cbf1.jpg"
    ],
    collectionLink: "/collection/urban-canvas"
};

const LandingPage = () => {
  const [imageSliderIndex, setImageSliderIndex] = useState(0); // State for image slider

  // Auto-play logic for image slider
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageSliderIndex(prevIndex => 
        (prevIndex + 1) % featuredCollection.imageUrls.length
      );
    }, 3500); // Changed interval to 3.5 seconds (3500ms)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs only once on mount

  const goToImageSlide = (index) => {
    // Optional: Reset interval on manual click? For now, let it continue
    setImageSliderIndex(index);
  };

  return (
    <div className="landing-page">
      <header className="main-header">
        <h1>Rikki</h1>
        <nav>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
          <a href="#story">Our Story</a>
          <a href="#shop">Shop</a>
        </nav>
      </header>

      <section className="hero-section" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/hero-section-pic/frame-2.png)`}}>
        <div className="hero-content">
          <h2>Where Art Meets Apparel</h2>
          <p>Explore limited-edition collections crafted by visionary artists.</p>
          <button>Discover the Latest Drop</button>
        </div>
      </section>

      {/* --- Featured Collection Section --- */}
      <section id="collections" className="featured-collection-section">
        <h2>Featured Collaboration</h2>

        <div className="collection-card">
            {/* --- Image Slider Column --- */}
            <div className="collection-visual"> {/* Keep this class as the container */}
                <div className="image-slider"> {/* Slider itself with grey background */}
                    <div className="image-slider-wrapper" style={{ transform: `translateX(-${imageSliderIndex * 100}%)` }}>
                        {featuredCollection.imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Collection ${index + 1} for ${featuredCollection.collectionTitle}`} />
                        ))}
                    </div>
                </div>
                 {/* Dot Indicators for Image Slider */}
                <div className="image-slider-dots">
                    {featuredCollection.imageUrls.map((_, index) => (
                        <button
                        key={index}
                        className={`dot ${index === imageSliderIndex ? 'active' : ''}`}
                        onClick={() => goToImageSlide(index)}
                        aria-label={`Go to image slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
            {/* --- Artist Story Column --- */}
            <div className="artist-story">
                <h3>{featuredCollection.artistName}</h3>
                <h4>{featuredCollection.collectionTitle}</h4>
                <p>{featuredCollection.description}</p>
                <Link to={featuredCollection.collectionLink} className="cta-link">Explore the Collection Story</Link>
            </div>
        </div>
      </section>
      {/* --- End Featured Collection Section --- */}

       <section id="story" className="our-story-section">
        <h2>The Rikki Narrative</h2>
        <p>Rikki isn't just a clothing brand; it's a canvas for collaboration. We partner with emerging and established artists, giving them a platform to translate their unique perspectives into wearable art. Each collection tells a story, inviting you to connect with the art and the artist.</p>
      </section>

      <section id="about" className="about-brand">
        <h2>Our Philosophy</h2>
        <p>We champion artistic expression and sustainable practices. Our goal is to create meaningful pieces that resonate, fostering a community around art, design, and mindful consumption.</p>
      </section>

      <footer className="main-footer">
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a> | <a href="#contact">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Rikki. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 