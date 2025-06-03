// Your Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config object
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get form elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully logged in
      const user = userCredential.user;
      console.log('Logged in user:', user.email);
      // Redirect to dashboard or home page
      window.location.href = 'dashboard.html'; // Change this to your dashboard page
    })
    .catch((error) => {
      // Handle errors
      alert('Error: ' + error.message);
    });
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully signed up
      const user = userCredential.user;
      console.log('Created new user:', user.email);
      // Redirect to dashboard or home page
      window.location.href = 'dashboard.html'; // Change this to your dashboard page
    })
    .catch((error) => {
      // Handle errors
      alert('Error: ' + error.message);
    });
});

// Check auth state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User is signed in:', user.email);
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});

// Toggle between login and signup forms
function showSignup() {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
}

function showLogin() {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
}
