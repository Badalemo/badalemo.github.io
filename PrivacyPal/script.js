// Get references to various HTML elements by their IDs or tagsaaelheaderTitle = document.getElementById("headerTitle"); // The main title in the header
let exploreButton = document.getElementById("exploreButton"); // Button likely on the index page to explore tools
let toolsButton = document.getElementById("toolsButton"); // Button in the header for the tools page
let homeButton = document.getElementById("homeButton"); // Button in the header for the home page (index.html) - Note: This variable is declared but not used in the current code.
let header = document.querySelector("header"); // The header element

// Check the current page's URL path
// If the page is index.html or about.html, set the header's position to relative.
// This might be used to prevent the header from being fixed or sticky on these specific pages.
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("about.html")) {
  header.style.position = "relative";
}

// Add a click event listener to the header title
headerTitle.addEventListener("click", function() {
    // When clicked, redirect the user to the index.html page
    window.location.href = "index.html";
});

// Add a click event listener to the tools button in the header
toolsButton.addEventListener("click", function() {
    // When clicked, redirect the user to the tools.html page
    window.location.href = "tools.html";
});

// Add a click event listener to the explore button (likely on index.html)
exploreButton.addEventListener("click", function() {
    // When clicked, redirect the user to the tools.html page
    window.location.href = "tools.html";
});

// Add an event listener that waits for the entire HTML document to be fully loaded and parsed
document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the learn button by its ID
  let learnButton = document.getElementById("learnButton");
  // Check if the learn button exists on the current page
  if (learnButton) {
    // If it exists, add a click event listener to it
    learnButton.addEventListener("click", function() {
      // When clicked, redirect the user to the learn.html page
      window.location.href = "learn.html";
    });
  }
  // This check and listener are inside DOMContentLoaded to ensure the learnButton element exists before trying to access it.
});

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Calculate the current scroll position plus the height of the visible window
  var scrollPosition = window.scrollY + window.innerHeight;
  // Get the total height of the document body
  var documentHeight = document.body.offsetHeight;

  // Check if the user has scrolled to the bottom of the page (or very close to it)
  if (scrollPosition >= documentHeight) {
    // If at the bottom, display the footer
    document.getElementById("footer").style.display = 'block';
  } else {
    // If not at the bottom, hide the footer
    document.querySelector("footer").style.display = 'none';
  }
  // This creates a footer that only appears when the user scrolls to the end of the content.
});