// Check authentication state
const checkAuth = async () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authLink = document.getElementById('authLink');
  const userWelcome = document.getElementById('userWelcome');
  
  if (isLoggedIn) {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const user = await response.json();
        document.getElementById('username').textContent = user.username;
        userWelcome.style.display = 'block';
        authLink.style.display = 'none';
      } else {
        localStorage.removeItem('isLoggedIn');
        userWelcome.style.display = 'none';
        authLink.style.display = 'block';
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  } else {
    userWelcome.style.display = 'none';
    authLink.style.display = 'block';
  }
};

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  try {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html'; // Redirect to login page on logout
  } catch (error) {
    console.error('Error logging out:', error);
  }
});

// Initialize auth check when the page loads
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
}); 