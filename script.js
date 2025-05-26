// Your actual Firebase config — replace with your real values!
const firebaseConfig = {
  apiKey: "AIzaSyAzh0RfZSMEU8YY4GEMb6SHilRqbwqw6Eo",
  authDomain: "bsfitness-8.firebaseapp.com",
  projectId: "bsfitness-8",
  storageBucket: "bsfitness-8.appspot.com",
  messagingSenderId: "730524182010",
  appId: "1:730524182010:web:e359ca66d1582b67a23043",
  measurementId: "G-38BXCY7ZWS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Functions to toggle between login and signup forms
function showSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

// Event listener for Login form submit
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Logged in successfully!");
      window.location.href = "home.html"; // Change this if you want a different page
    })
    .catch((error) => {
      alert("Login Failed: " + error.message);
    });
});

// Event listener for Signup form submit
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Account created! Please log in.");
      showLogin(); // Switch to login form after signup
    })
    .catch((error) => {
      alert("Signup Failed: " + error.message);
    });
});
