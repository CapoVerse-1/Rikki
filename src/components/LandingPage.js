import React, { useState } from 'react';
import CollectionIndicator from './CollectionIndicator';

// Placeholder data - replace with actual data later (e.g., from API)
const collectionsData = [
  {
    id: 1,
    artist: 'Kilian', // Placeholder
    title: 'Alpine Echoes', // Placeholder
    visual: '/placeholder-visual-1.jpg', // Placeholder
    artistStory: 'Inspired by the serene yet imposing nature of the Alps, this collection explores the interplay of light and shadow on mountain faces. Kilian uses stark contrasts and a muted palette to evoke a sense of calm power.',
    narrative: 'Alpine Echoes represents a journey into minimalist landscapes, translating vastness into wearable art. Each piece carries the quiet strength of the mountains.',
    philosophy: 'Focusing on sustainable materials and timeless design, this collection emphasizes mindful creation and connection to nature.',
  },
  {
    id: 2,
    artist: 'Sophia', // Placeholder
    title: 'Urban Canvas', // Placeholder
    visual: '/placeholder-visual-2.jpg', // Placeholder
    artistStory: 'Sophia draws inspiration from the raw energy and hidden textures of city life. Graffiti, architecture, and the constant flow of movement inform her dynamic designs for the Urban Canvas collection.',
    narrative: 'Urban Canvas transforms the cityscape into a wearable medium. It\'s about finding beauty in the grit, expressing individuality amidst the crowd.',
    philosophy: 'This collection champions bold self-expression and utilizes recycled materials where possible, reflecting the resourcefulness of the urban environment.',
  },
];

const LandingPage = () => {
  const [collections] = useState(collectionsData);
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0);

  const handleSelectCollection = (index) => {
    setCurrentCollectionIndex(index);
  };

  // Get the currently active collection based on the index
  const currentCollection = collections[currentCollectionIndex];

  // If no collection data, render loading or empty state
  if (!currentCollection) {
      // TODO: Add a better loading or empty state here
      return <div>Loading collections...</div>;
  }

  return (
    <div className="landing-page">
      <header className="main-header">
        <h1>HaKi</h1>
        <nav>
          {/* Links might need rethinking if content below changes drastically */}
          {/* <a href="#collections">Collections</a> <a href="#about">About</a> <a href="#story">Our Story</a> */}
          <a href="#shop">Shop</a>
        </nav>
      </header>

      {/* Hero Section remains static as requested (outside the switching area) */}
      <section className="hero-section" style={{backgroundImage: `url(/placeholder-hero.jpg)`}}>
        <div className="hero-content">
          <h2>Where Art Meets Apparel</h2>
          <p>Explore limited-edition collections crafted by visionary artists.</p>
          <button>Discover the Latest Drop</button> {/* Button could link to the current collection */}
        </div>
      </section>

      {/* Wrapper for the dynamically changing content */}
      <div className="collection-content-wrapper" key={currentCollection.id}> {/* Use key for transitions */}
        <section id="collections" className="featured-collection">
          <h2>Featured Collection: {currentCollection.artist} - {currentCollection.title}</h2>
          <div className="collection-intro">
            <div className="collection-visual">
              <img src={currentCollection.visual} alt={`Visual representing the ${currentCollection.title} collection by ${currentCollection.artist}`} />
            </div>
            <div className="artist-story">
              <h3>Meet the Artist: {currentCollection.artist}</h3>
              <p>{currentCollection.artistStory}</p>
              {/* Link might go to a dedicated collection page */}
              <a href={`/collections/${currentCollection.id}`} className="cta-link">Explore the Full Collection</a>
            </div>
          </div>
        </section>

        <section id="story" className="our-story-section">
          <h2>The Narrative: {currentCollection.title}</h2>
          <p>{currentCollection.narrative}</p>
        </section>

        <section id="about" className="about-brand">
          <h2>Collection Philosophy</h2>
          <p>{currentCollection.philosophy}</p>
        </section>
      </div>

      {/* Dot Indicator */}
      <CollectionIndicator
        count={collections.length}
        currentIndex={currentCollectionIndex}
        onSelect={handleSelectCollection}
      />

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