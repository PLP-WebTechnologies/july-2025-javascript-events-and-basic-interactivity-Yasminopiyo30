//  INTERACTIVE WEB PAGES WITH JAVASCRIPT
// This file contains event handling, interactive elements, and form validation.

// ————————————————————————————————————————————————
// PART 1 & 2: EVENT HANDLING + INTERACTIVE ELEMENTS
// ————————————————————————————————————————————————

// 1. Dark/Light Mode Toggle
// Adds a click event to toggle body class and button text
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  // Update button text based on current mode
  if (document.body.classList.contains('dark-mode')) {
    this.textContent = 'Toggle Light Mode';
  } else {
    this.textContent = 'Toggle Dark Mode';
  }
});

// 2.  Counter Game (Click Challenge)
const startBtn = document.getElementById('start-game');
const clickBtn = document.getElementById('click-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 10;
let gameInterval;

// Start the game on button click
startBtn.addEventListener('click', function () {
  // Reset game state
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  startBtn.disabled = true;
  clickBtn.disabled = false;

  // Enable clicking the button
  clickBtn.addEventListener('click', function () {
    score++;
    scoreDisplay.textContent = score;
  });

  // Start 10-second countdown
  gameInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clickBtn.disabled = true;
      startBtn.disabled = false;
      alert(`Game over! Your score: ${score}`);
    }
  }, 1000);
});

// 3.  Collapsible FAQ Section
// Add click event to each FAQ question to show/hide answer
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', function () {
    // Toggle visibility of answer
    const answer = this.nextElementSibling;
    const isVisible = answer.style.display === 'block';

    // Close all answers first (optional: make only one open at a time)
    document.querySelectorAll('.faq-answer').forEach(a => {
      a.style.display = 'none';
    });

    // Open current if it was closed
    if (!isVisible) {
      answer.style.display = 'block';
    }
  });
});

// 4.  Tabbed Interface
// Handle tab switching
document.querySelectorAll('.tab-btn').forEach(tab => {
  tab.addEventListener('click', function () {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Add active class to clicked tab
    this.classList.add('active');

    // Show corresponding pane
    const tabId = this.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ————————————————————————————————————————————————
// PART 3: FORM VALIDATION
// ————————————————————————————————————————————————

// Get form and input elements
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmError = document.getElementById('confirm-error');
const formMessage = document.getElementById('form-message');

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s]{2,}$/; // At least 2 letters, spaces allowed
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 8+ chars, 1 upper, 1 lower, 1 digit

// Validate Full Name
function validateName() {
  const value = nameInput.value.trim();
  if (!value) {
    nameError.textContent = 'Name is required.';
    return false;
  } else if (!nameRegex.test(value)) {
    nameError.textContent = 'Please enter a valid name (letters and spaces only, at least 2 characters).';
    return false;
  } else {
    nameError.textContent = '';
    return true;
  }
}

// Validate Email
function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    emailError.textContent = 'Email is required.';
    return false;
  } else if (!emailRegex.test(value)) {
    emailError.textContent = 'Please enter a valid email address.';
    return false;
  } else {
    emailError.textContent = '';
    return true;
  }
}

// Validate Password
function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    passwordError.textContent = 'Password is required.';
    return false;
  } else if (!passwordRegex.test(value)) {
    passwordError.textContent = 'Password must be at least 8 characters long, include uppercase, lowercase, and a number.';
    return false;
  } else {
    passwordError.textContent = '';
    return true;
  }
}

// Validate Confirm Password
function validateConfirmPassword() {
  const value = confirmPasswordInput.value;
  const passwordValue = passwordInput.value;
  if (!value) {
    confirmError.textContent = 'Please confirm your password.';
    return false;
  } else if (value !== passwordValue) {
    confirmError.textContent = 'Passwords do not match.';
    return false;
  } else {
    confirmError.textContent = '';
    return true;
  }
}

// Real-time validation as user types
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

// Form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Run all validations
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  // If all valid, show success
  if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    formMessage.innerHTML = '<p style="color: green;"> Registration successful!</p>';
    form.reset(); // Clear form
    // Clear error messages
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
  } else {
    formMessage.innerHTML = '<p style="color: red;">Please fix the errors above.</p>';
  }
});