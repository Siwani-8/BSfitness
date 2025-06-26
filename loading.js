// Loading screen functionality with smoother transition
window.addEventListener('load', function() {
  // Add a minimum display time for the loading screen
  const minDisplayTime = 2000; // 2 seconds minimum display time
  const startTime = Date.now();
  
  // Function to hide loading screen
  const hideLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.opacity = '0';
    
    // Remove the element after transition completes
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 800); // Match this with the CSS transition time
  };

  // Ensure minimum display time
  window.setTimeout(() => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minDisplayTime) {
      setTimeout(hideLoadingScreen, minDisplayTime - elapsedTime);
    } else {
      hideLoadingScreen();
    }
  }, 0);
}); 