import React from 'react';

const LandingPage = () => {
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

      <section id="collections" className="featured-collection">
        <h2>Featured Collection: [Artist Name] - [Collection Title]</h2>
        <div className="collection-intro">
          <div className="collection-visual">
            <img src="/placeholder-artist-visual.jpg" alt="Visual representing the featured artist's collection" />
          </div>
          <div className="artist-story">
            <h3>Meet the Artist</h3>
            <p>Dive into the world of [Artist Name]. Discover the inspiration, process, and narrative behind the "[Collection Title]" collection. We believe in celebrating the creators behind the designs.</p>
            <a href="/collections/artist-name" className="cta-link">Explore the Collection Story</a>
          </div>
        </div>
      </section>

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