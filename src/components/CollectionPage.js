import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link import
import './CollectionPage.css'; // We'll create this CSS file

// --- Sample Data (Replace with data fetching based on :collectionSlug) ---
const collectionDetails = {
  'urban-canvas': {
    artistName: "Benjamin Heinze",
    collectionTitle: "Urban Canvas",
    artistPortraitUrl: "/Artist PP/WhatsApp Bild 2025-04-25 um 15.58.55_143d490f.jpg", // Updated Path
    heroImageUrl: "/first picture/WhatsApp Bild 2025-04-25 um 15.48.20_f726f5f8.jpg", // Corrected hero path from previous step
    introduction: "Benjamin Heinze translates the raw, untamed energy of the city onto fabric. Her 'Urban Canvas' collection is a dialogue between street art aesthetics and contemporary fashion, exploring themes of decay and rebirth found in the urban landscape.",
    storySections: [
      {
        type: 'text',
        title: 'The Artist\'s Journey',
        content: "From large-scale murals that commanded attention on brick walls to the intricate details on a jacket, Sophia's journey has always been about finding new canvases. She draws inspiration from the layers of posters, graffiti, and weathering that tell the unspoken stories of a city."
      },
      {
        type: 'artwork_gallery',
        title: 'Sketches & Inspirations',
        images: [
          "/Skizzen und Inspirationen/WhatsApp Bild 2025-04-25 um 15.57.17_1c10d098.jpg",
          "/Skizzen und Inspirationen/WhatsApp Bild 2025-04-25 um 15.48.19_093bd0a7.jpg",
          "/Skizzen und Inspirationen/WhatsApp Bild 2025-04-25 um 15.48.17_dea6c0fd.jpg"
        ]
      },
      {
        type: 'text_with_product',
        title: 'Translating Texture',
        content: "The texture of peeling paint and aged concrete finds its way into the collection through distressed fabrics and layered prints. Each piece aims to capture a fragment of the city's soul.",
        product: {
          name: "Weathered Hoodie",
          price: "€110",
          imageUrls: [
            "/Produktee Hoodies/BLUE2.png",
            "/Produktee Hoodies/BLACK FRONT.png",
            "/Produktee Hoodies/GREEN FRONT.png",
            "/Produktee Hoodies/PINK23.png",
            "/Produktee Hoodies/AA.png"
          ],
          link: "#"
        }
      },
       {
        type: 'artwork_gallery',
        title: 'Featured Artwork',
        images: [
            "/Featured Artwork/WhatsApp Bild 2025-04-25 um 16.47.20_2c509f74.jpg",
            "/Featured Artwork/WhatsApp Bild 2025-04-25 um 16.46.55_ef2f29ed.jpg"
        ]
      },
      {
        type: 'text_with_product_alt', // Example of alternative layout
        content: "The color palette reflects the sudden bursts of color found in street art against muted urban tones.",
        product: {
          name: "Graffiti-Inspired Tee",
          price: "€65",
          imageUrls: [
             "/Produktee Tshirts/3.png",
             "/Produktee Tshirts/2.png",
             "/Produktee Tshirts/15.png",
             "/Produktee Tshirts/9.png",
             "/Produktee Tshirts/16.png"
          ],
          link: "#" // Placeholder link
        }
      },
    ],
    interview: [
        {
            question: "What was the core inspiration behind the 'Urban Canvas' theme?",
            answer: "It really came from walking around the city and noticing the layers – old posters peeling away, new graffiti over faded tags, the way nature reclaims concrete. There's a constant conversation happening on the walls, a mix of decay and vibrant new life. I wanted to capture that raw energy and texture, the beauty in imperfection that you find in urban environments. It's less about pristine design and more about lived-in stories."
        },
        {
            question: "How did you translate large-scale street art concepts onto clothing?",
            answer: "That was the fun challenge! You can't just shrink a mural onto a t-shirt. It's about capturing the *essence*. For me, that meant focusing on fragments – a specific brushstroke style, a textured background effect inspired by concrete, or using color palettes that mimic spray paint on brick. It's also about the layering; some pieces use overlapping prints or distressed details to mimic the layered look of street posters."
        },
        {
            question: "What message do you hope people take away from wearing this collection?",
            answer: "I hope they feel a connection to that urban energy, maybe appreciate the overlooked details of their own surroundings a bit more. It's about finding art in unexpected places and embracing a bit of rawness and authenticity. It's wearable art that tells a story of the city."
        }
    ],
    shopLink: "#" // Placeholder link to full collection shop
  }
  // Add more collections here keyed by their slug
};
// --- End Sample Data ---


const CollectionPage = () => {
  const { collectionSlug } = useParams(); // Get the slug from the URL
  const data = collectionDetails[collectionSlug]; // Get the data for this collection
  const [isInterviewExpanded, setIsInterviewExpanded] = useState(false); // State for interview expansion
  const [hoodieImageIndex, setHoodieImageIndex] = useState(0); // RE-ADD state for hoodie slider
  const [tshirtImageIndex, setTshirtImageIndex] = useState(0); // RE-ADD state for t-shirt slider
  const [expandedProductSectionId, setExpandedProductSectionId] = useState(null); // null, 'hoodie', 'tshirt'
  const [popupVariationData, setPopupVariationData] = useState(null); // State for popup { product, imgUrl, index }

  // Refs for scrolling expanded view
  const hoodieDetailRef = useRef(null);
  const tshirtDetailRef = useRef(null);

  // Use refs to store timeout IDs for each variation card hover
  const hoverTimeoutRefs = useRef({}); 

  // MOVED: Cleanup timeouts on unmount (moved before early return)
  useEffect(() => {
    // Capture the current value of the ref inside the effect
    const timeouts = hoverTimeoutRefs.current;
    return () => {
        // Use the captured value in the cleanup
        Object.values(timeouts).forEach(clearTimeout);
    };
  }, []);

  // --- NEW: Scroll to top on mount --- 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [collectionSlug]); // Scroll when the collection slug changes (ensures scroll on navigation)
  // --- END NEW --- 

  // RE-ADD: Auto-play for Hoodie Slider (Default View)
  useEffect(() => {
    const hoodieProduct = data.storySections.find(s => s.type === 'text_with_product')?.product;
    if (!hoodieProduct || !hoodieProduct.imageUrls || hoodieProduct.imageUrls.length < 2) return; // Only slide if more than 1 image

    const intervalId = setInterval(() => {
      setHoodieImageIndex(prevIndex => (prevIndex + 1) % hoodieProduct.imageUrls.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [data]); 

  // RE-ADD: Auto-play for T-shirt Slider (Default View)
  useEffect(() => {
    const tshirtProduct = data.storySections.find(s => s.type === 'text_with_product_alt')?.product;
    if (!tshirtProduct || !tshirtProduct.imageUrls || tshirtProduct.imageUrls.length < 2) return; // Only slide if more than 1 image

    const intervalId = setInterval(() => {
      setTshirtImageIndex(prevIndex => (prevIndex + 1) % tshirtProduct.imageUrls.length);
    }, 3500);
    return () => clearInterval(intervalId);
  }, [data]);

  // Handle case where slug doesn't match data
  if (!data) {
    return <div>Collection not found.</div>; // Or redirect
  }

  const toggleInterview = () => {
    setIsInterviewExpanded(!isInterviewExpanded);
  };

  const handleExpandProduct = (productId) => {
      setExpandedProductSectionId(productId);
  };

  // --- Popup Logic ---
  const handleVariationMouseEnter = (product, imgUrl, index) => {
    // Clear any existing timer for this *specific* card index if needed, though useRef handles this
    // Start a timer
    hoverTimeoutRefs.current[index] = setTimeout(() => {
      setPopupVariationData({ product, imgUrl, index });
    }, 2000); // 2-second delay
  };

  const handleVariationMouseLeave = (index) => {
    // Clear the timer when the mouse leaves the card
    if (hoverTimeoutRefs.current[index]) {
      clearTimeout(hoverTimeoutRefs.current[index]);
      delete hoverTimeoutRefs.current[index]; // Clean up ref
    }
  };

  const closePopup = () => {
    setPopupVariationData(null);
  };

  // Helper function to render product variation cards
  const renderProductVariations = (product) => {
    const variations = product.imageUrls || [];
    if (variations.length === 0) return null;

    return variations.map((imgUrl, index) => (
      <div 
        key={index} 
        className="product-variation-card"
        onMouseEnter={() => handleVariationMouseEnter(product, imgUrl, index)}
        onMouseLeave={() => handleVariationMouseLeave(index)}
      >
          <div className="variation-image-container">
               <img src={imgUrl} alt={`${product.name} variation ${index + 1}`} />
          </div>
          <h4>{product.name}</h4> 
          <span>{product.price}</span>
          <div className="variation-actions">
              <select name="size" aria-label={`Select size for ${product.name} variation ${index + 1}`}>
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
              </select>
              <button className="add-to-cart-btn">Add to Cart</button>
          </div>
      </div>
    ));
  };

  // Updated renderInitialProductView to handle sliding
  const renderInitialProductView = (product, imageIndex, productId) => {
    if (!product || !product.imageUrls || product.imageUrls.length === 0) {
      return <div className="product-module-placeholder">Image coming soon</div>;
    }
    return (
      <div className="product-module">
        {/* Container for the initial slider */}
        <div className="initial-product-image-slider"> 
          <div className="initial-product-image-wrapper" style={{ transform: `translateX(-${imageIndex * 100}%)` }}>
            {product.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`${product.name} ${index + 1}`} />
            ))}
          </div>
        </div>
        <h4>{product.name}</h4>
        <span>{product.price}</span>
        <button onClick={() => handleExpandProduct(productId)} className="product-link-button">View Details</button>
      </div>
    );
  };
  
  // Handle scroll for expanded variations
  const handleScroll = (ref, direction) => {
    if (ref.current) {
        const scrollAmount = ref.current.offsetWidth * 0.8; // Scroll by 80% of visible width
        ref.current.scrollBy({ 
            left: direction === 'left' ? -scrollAmount : scrollAmount, 
            behavior: 'smooth' 
        });
    }
  };

  return (
    <div className={`collection-page ${popupVariationData ? 'popup-open' : ''}`}> {/* Add class when popup open */}
      {/* Header could be reused from App.js or specific here */}
       <header className="collection-header">
         {/* Maybe a subtle back link */}
         <Link to="/" className="back-link">← Back to Home</Link>
         <h1>{data.collectionTitle}</h1>
         <h2>by {data.artistName}</h2>
         {/* Placeholder Cart Icon */}
         <div className="cart-icon-placeholder">🛒</div> 
       </header>

       {/* Updated Hero Image */}
       <section className="collection-hero" style={{ backgroundImage: `url('/first picture/WhatsApp Bild 2025-04-25 um 15.48.20_f726f5f8.jpg')` }}>
           {/* Can add overlay content if needed */}
       </section>

       <div className="collection-content-wrapper">
           <section className="collection-intro">
               <img src={data.artistPortraitUrl} alt={`${data.artistName} portrait`} className="artist-portrait" />
               <p>{data.introduction}</p>
           </section>

           {/* --- NEW: Social Media Icons --- */}
           <div className="social-media-icons">
             <a href="/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
               </svg>
             </a>
             <a href="/" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
               </svg>
             </a>
             <a href="mailto:example@example.com" aria-label="Email">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
               </svg>
             </a>
           </div>
           {/* --- END NEW Social Media Icons --- */}

           {/* Store sections temporarily */}
           {(() => {
               const sections = {};
               data.storySections.forEach((section, index) => {
                   // Render sections based on type and store in the sections object
                   // Use title or generate a stable key based on type and index
                   const key = section.title || `${section.type}-${index}`;
                   sections[key] = {
                       type: section.type,
                       originalData: section, // Store original data if needed
                       render: () => {
                           switch (section.type) {
                               case 'text':
                                   return (
                                       <section key={key} className="story-text-section">
                                           {section.title && <h3>{section.title}</h3>}
                                           <p>{section.content}</p>
                                       </section>
                                   );
                               case 'artwork_gallery':
                                   return (
                                       <section key={key} className="story-gallery-section">
                                           {section.title && <h3>{section.title}</h3>}
                                           <div className="artwork-gallery">
                                               {section.images.map((imgUrl, imgIndex) => (
                                                   <img key={imgIndex} src={imgUrl} alt={`Artwork ${imgIndex + 1}`} />
                                               ))}
                                           </div>
                                       </section>
                                   );
                               case 'text_with_product': // Hoodie Section
                                   const isHoodieExpanded = expandedProductSectionId === 'hoodie';
                                   const hoodieProduct = section.product;
                                   return (
                                       <section key={key} className={`story-product-section-container ${isHoodieExpanded ? 'expanded' : ''}`}>
                                           <div className="story-product-section-default-view">
                                               <div className="text-content">
                                                   {section.title && <h3>{section.title}</h3>}
                                                   <p>{section.content}</p>
                                               </div>
                                               {renderInitialProductView(hoodieProduct, hoodieImageIndex, 'hoodie')} 
                                           </div>
                                           <div className="product-detail-expanded" ref={hoodieDetailRef}> 
                                                {isHoodieExpanded && hoodieProduct.imageUrls.length > 5 && (
                                                    <button onClick={() => handleScroll(hoodieDetailRef, 'left')} className="scroll-arrow scroll-arrow-left">‹</button>
                                                )}
                                                {isHoodieExpanded && renderProductVariations(hoodieProduct)}
                                                {isHoodieExpanded && hoodieProduct.imageUrls.length > 5 && (
                                                    <button onClick={() => handleScroll(hoodieDetailRef, 'right')} className="scroll-arrow scroll-arrow-right">›</button>
                                                )}
                                                {isHoodieExpanded && <button onClick={() => setExpandedProductSectionId(null)} className="close-expanded-btn">×</button>}
                                           </div>
                                       </section>
                                   );
                                case 'text_with_product_alt': // T-shirt Section
                                   const isTshirtExpanded = expandedProductSectionId === 'tshirt';
                                   const tshirtProduct = section.product;
                                   return (
                                       <section key={key} className={`story-product-section-container alt ${isTshirtExpanded ? 'expanded' : ''}`}>
                                           <div className="story-product-section-default-view alt">
                                                <div className="text-content">
                                                   {section.title && <h3>{section.title}</h3>}
                                                   <p>{section.content}</p>
                                                </div>
                                                {renderInitialProductView(tshirtProduct, tshirtImageIndex, 'tshirt')} 
                                           </div>
                                           <div className="product-detail-expanded" ref={tshirtDetailRef}> 
                                                {isTshirtExpanded && tshirtProduct.imageUrls.length > 5 && (
                                                    <button onClick={() => handleScroll(tshirtDetailRef, 'left')} className="scroll-arrow scroll-arrow-left">‹</button>
                                                )}
                                                {isTshirtExpanded && renderProductVariations(tshirtProduct)}
                                                {isTshirtExpanded && tshirtProduct.imageUrls.length > 5 && (
                                                    <button onClick={() => handleScroll(tshirtDetailRef, 'right')} className="scroll-arrow scroll-arrow-right">›</button>
                                                )}
                                                {isTshirtExpanded && <button onClick={() => setExpandedProductSectionId(null)} className="close-expanded-btn">×</button>} 
                                           </div>
                                       </section>
                                   );
                               default:
                                   return null;
                           }
                       }
                   };
               });

               // Render Interview Section
               let interviewSection = null;
               if (data.interview && data.interview.length > 0) {
                   interviewSection = (
                       <section className="interview-section">
                           <h3>Artist Talk</h3>
                           <div className={`interview-content ${!isInterviewExpanded ? 'collapsed' : ''}`}>
                               {data.interview.map((qa, index) => (
                                   <div key={index} className="interview-qa-pair">
                                       <p className="interview-q">{qa.question}</p>
                                       <p className="interview-a">{qa.answer}</p>
                                   </div>
                               ))}
                           </div>
                           <button onClick={toggleInterview} className="expand-interview-btn">
                               {isInterviewExpanded ? 'Show Less ▲' : 'Read Full Interview ▼'}
                           </button>
                       </section>
                   );
               }

               // Define the desired order using stable keys
               const altProductKey = Object.keys(sections).find(k => sections[k].type === 'text_with_product_alt');
               
               const orderedKeys = [
                   sections['The Artist\'s Journey'] ? 'The Artist\'s Journey' : null, // Check if key exists
                   sections['Sketches & Inspirations'] ? 'Sketches & Inspirations' : null,
                   sections['Translating Texture'] ? 'Translating Texture' : null,
                   sections['Featured Artwork'] ? 'Featured Artwork' : null,
                   altProductKey // Add the dynamically found key
               ].filter(Boolean); // Remove nulls if titles were missing

               // Find the index where the interview should go
               const artworkIndex = orderedKeys.indexOf('Featured Artwork');

               // No need to filter again, already handled missing keys
               // const validOrderedKeys = orderedKeys.filter(k => k && sections[k]);

               return (
                   <>
                       {orderedKeys.slice(0, artworkIndex + 1).map(key => sections[key].render())}
                       {interviewSection} {/* Render interview section */} 
                       {orderedKeys.slice(artworkIndex + 1).map(key => sections[key].render())}
                   </>
               );
           })()}

           {/* Shop CTA is separate */} 
           <section className="collection-shop-cta">
               <h3>Explore the Full Collection</h3>
               <Link to={data.shopLink} className="cta-button">Shop Now</Link>
           </section>
       </div>

      {/* Footer could be reused or specific */} 
      <footer className="collection-footer">
          <p>&copy; {new Date().getFullYear()} Rikki. All rights reserved.</p>
      </footer>

      {/* --- NEW: Product Popup --- */}
        {popupVariationData && (
            <div className="product-popup-overlay" onClick={closePopup}> {/* Overlay closes popup */}
                <div className="product-popup-content" onClick={(e) => e.stopPropagation()}> {/* Prevent click inside closing popup */}
                    <button onClick={closePopup} className="popup-close-btn">×</button>
                    <div className="popup-image-container">
                         <img src={popupVariationData.imgUrl} alt={`${popupVariationData.product.name} variation ${popupVariationData.index + 1}`} />
                    </div>
                    <h4>{popupVariationData.product.name}</h4>
                    <span>{popupVariationData.product.price}</span>
                    <div className="variation-actions">
                        <select name="size" defaultValue="">
                            <option value="">Select Size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        )}
        {/* --- End Product Popup --- */}
    </div>
  );
};

export default CollectionPage; 