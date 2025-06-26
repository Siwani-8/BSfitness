// Slider functionality
const images = [
  {
    src: 'images/body building slider.jpg',
    link: 'bodybuilding.html'
  },
  {
    src: 'images/heightgrowth.jpg',
    link: 'heightgrowth.html'
  },
  {
    src: 'images/yoga.jpg',
    link: 'yoga.html'
  }
];
let currentIndex = 0;
const sliderImage = document.getElementById('sliderImage');
let slideInterval;

function showSlide(index) {
  sliderImage.classList.add('fade');
  
  setTimeout(() => {
    currentIndex = index;
    sliderImage.src = images[currentIndex].src;
    setTimeout(() => {
      sliderImage.classList.remove('fade');
    }, 50);
  }, 500);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
}

function goToPage() {
  window.location.href = images[currentIndex].link;
}

// Start the slideshow
function startSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(nextSlide, 5000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startSlideShow();
}); 