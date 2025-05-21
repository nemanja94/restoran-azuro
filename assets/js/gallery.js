document.addEventListener('DOMContentLoaded', function() {
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeButton = document.querySelector('.lightbox-close');
    const nextButton = document.querySelector('.lightbox-next');
    const prevButton = document.querySelector('.lightbox-prev');
    
    let currentIndex = 0;
    const images = [];
    
    // Detect if user is on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Collect all image sources and captions
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push({
            src: img.src,
            alt: img.alt || `Gallery image ${index + 1}`
        });
        
        // Add click event to each gallery item
        item.addEventListener('click', () => {
            currentIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
            
            // Hide top button when lightbox is open
            const topBtn = document.getElementById("topBtn");
            if (topBtn) {
                topBtn.style.display = 'none';
            }
        });
    });
    
    // Update lightbox image based on current index
    function updateLightboxImage() {
        if (images.length === 0) return;
        
        const image = images[currentIndex];
        // Preload image to prevent flickering
        const preloadImg = new Image();
        preloadImg.src = image.src;
        preloadImg.onload = function() {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        };
    }
    
    // Close lightbox
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            closeLightbox();
        });
    }
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Restore top button visibility based on scroll position
        const topBtn = document.getElementById("topBtn");
        if (topBtn) {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        }
    }
    
    // Next image
    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        });
    }
    
    // Previous image
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (!lightbox.classList.contains('active')) return;
        
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> Next image
            currentIndex = (currentIndex + 1) % images.length;
            updateLightboxImage();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> Previous image
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }
    }
    
    // Back to top button functionality (copied from main.js)
    const topBtn = document.getElementById("topBtn");

    window.onscroll = () => {
        if (
            document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200
        ) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}