//Popular Scroll Speed

const popularSection = document.querySelector(".p-l-scroll-container"); // Use the container that wraps .popular-line
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");

scrollLeftButton.addEventListener("click", () => {
  popularSection.scrollBy({
    left: -300, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});

scrollRightButton.addEventListener("click", () => {
  popularSection.scrollBy({
    left: 300, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});

//Stories Scroll Speed

const storiesSection = document.querySelector(".stories-scroll-container"); // Use the container that wraps .popular-line
const scrollLeftStoriesButton = document.querySelector(".scroll-left-stories");
const scrollRightStoriesButton = document.querySelector(
  ".scroll-right-stories"
);

scrollLeftStoriesButton.addEventListener("click", () => {
  storiesSection.scrollBy({
    left: -150, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});

scrollRightStoriesButton.addEventListener("click", () => {
  storiesSection.scrollBy({
    left: 150, // Adjust the scroll amount as needed
    behavior: "smooth", // Enable smooth scrolling
  });
});
