// Array of image paths and their corresponding pages
const images = [
    { src: 'images/image1.jpg', link: 'cardio.html' },
    { src: 'images/image2.jpg', link: 'muscle.html' },
    { src: 'images/image3.jpg', link: 'yoga.html' }
  ];
  
  let currentIndex = 0;
  const sliderImage = document.getElementById('sliderImage');
  
  function showImage(index) {
    sliderImage.src = images[index].src;
  }
  
  // Automatically change image every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }, 5000);
  
  // Redirect to corresponding page when image clicked
  function goToPage(index) {
    window.location.href = images[index].link;
  }

  