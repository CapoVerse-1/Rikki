import React from 'react';

const CollectionIndicator = ({ count, currentIndex, onSelect }) => {
  // Don't render indicators if there's only one item or none
  if (count <= 1) {
    return null;
  }

  return (
    <div className="collection-indicator">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`dot ${index === currentIndex ? 'active' : ''}`}
          onClick={() => onSelect(index)}
          aria-label={`Go to collection ${index + 1}`}
          title={`Collection ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CollectionIndicator; 