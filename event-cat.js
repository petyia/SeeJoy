//Cat Scroll Speed

const catSection = document.querySelector(".event-mini"); // Use the container that wraps .popular-line
const scrollRightCatButton = document.querySelector(".scroll-right-cat");
const scrollLeftCatButton = document.querySelector(".scroll-left-cat");

scrollRightCatButton.addEventListener("click", () => {
  catSection.scrollBy({
    left: 300, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});

scrollLeftCatButton.addEventListener("click", () => {
  catSection.scrollBy({
    left: -300, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the right and left arrow elements
  const rightArrowButton = document.getElementById("fa-chevron-right-cat");
  const leftArrowContainer = document.querySelector(".cat-left-arrow");

  // Add a click event listener to the right arrow button
  rightArrowButton.addEventListener("click", function () {
    // Toggle the visibility of the left arrow container
    leftArrowContainer.style.display = "block";
  });
});
