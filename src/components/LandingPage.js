import React, { useState } from 'react';

// Sample data for collaborations (replace with actual data later)
const collaborationsData = [
  {
    id: 1,
    artistName: "Sophia Liu",
    collectionTitle: "Urban Canvas",
    description: "Dive into the vibrant world of Sophia Liu. Discover the raw energy, process, and narrative behind the \"Urban Canvas\" collection. Celebrating street art aesthetics.",
    imageUrl: "/placeholder-sophia.jpg",
    collectionLink: "/collections/sophia-liu"
  },
  {
    id: 2,
    artistName: "Kenji Tanaka",
    collectionTitle: "Minimalist Echoes",
    description: "Explore the serene minimalism of Kenji Tanaka. Uncover the inspiration and meticulous craft behind \"Minimalist Echoes\". A study in form and tranquility.",
    imageUrl: "/placeholder-kenji.jpg",
    collectionLink: "/collections/kenji-tanaka"
  },
  {
    id: 3,
    artistName: "Anya Petrova",
    collectionTitle: "Abstract Dreams",
    description: "Immerse yourself in the Abstract Dreams collection by Anya Petrova. Experience the flow of color and emotion captured in each unique piece.",
    imageUrl: "/placeholder-anya.jpg",
    collectionLink: "/collections/anya-petrova"
  }
];

const LandingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="landing-page">
      <header className="main-header">
        <h1>HaKi</h1>
        <nav>
          <a href="#collections">Collections</a>
          <a href="#about">About</a>
          <a href="#story">Our Story</a>
          <a href="#shop">Shop</a>
        </nav>
      </header>

      <section className="hero-section" style={{backgroundImage: `url(/placeholder-hero.jpg)`}}>
        <div className="hero-content">
          <h2>Where Art Meets Apparel</h2>
          <p>Explore limited-edition collections crafted by visionary artists.</p>
          <button>Discover the Latest Drop</button>
        </div>
      </section>

      {/* --- Featured Collection Section --- */}
      <section id="collections" className="featured-collection-section">
        {/* Static Title */}
        <h2>Featured Collaborations</h2>

        {/* Slider Container */}
        <div className="collection-slider">
          <div className="slider-wrapper" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {/* Map through collaborations data */}
            {collaborationsData.map((collab, index) => (
              <div className="collection-slide" key={collab.id}>
                <div className="collection-intro">
                  <div className="collection-visual">
                    <img src={collab.imageUrl} alt={`Visual representing the ${collab.collectionTitle} collection by ${collab.artistName}`} />
                  </div>
                  <div className="artist-story">
                    <h3>{collab.artistName}</h3>
                    <h4>{collab.collectionTitle}</h4>
                    <p>{collab.description}</p>
                    <a href={collab.collectionLink} className="cta-link">Explore the Collection Story</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="slider-dots">
          {collaborationsData.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      {/* --- End Featured Collection Section --- */}

      <section id="story" className="our-story-section">
        <h2>The HaKi Narrative</h2>
        <p>HaKi isn't just a clothing brand; it's a canvas for collaboration. We partner with emerging and established artists, giving them a platform to translate their unique perspectives into wearable art. Each collection tells a story, inviting you to connect with the art and the artist.</p>
      </section>

      <section id="about" className="about-brand">
        <h2>Our Philosophy</h2>
        <p>We champion artistic expression and sustainable practices. Our goal is to create meaningful pieces that resonate, fostering a community around art, design, and mindful consumption.</p>
      </section>

      <footer className="main-footer">
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a> | <a href="#contact">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} HaKi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 