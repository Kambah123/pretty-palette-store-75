
// Load image URLs and make them globally available
(function() {
  // Create script element to load image URLs
  const script = document.createElement('script');
  script.src = '/image_urls_array.js';
  script.onload = function() {
    console.log('Image URLs loaded:', window.imageUrls?.length || 0, 'images');
  };
  script.onerror = function() {
    console.warn('Failed to load image URLs from /image_urls_array.js');
    // Create fallback URLs for local images
    window.imageUrls = [];
    for (let i = 1; i <= 115; i++) {
      const imageNumber = i.toString().padStart(4, '0');
      window.imageUrls.push(`/images/product_${imageNumber}.jpg`);
    }
    console.log('Using fallback local image URLs:', window.imageUrls.length, 'images');
  };
  document.head.appendChild(script);
})();
