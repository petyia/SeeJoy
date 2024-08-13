// Popular Scroll Speed

const popularSection = document.querySelector(".p-l-scroll-container");
const scrollLeftButton = document.querySelector(".scroll-left");
const scrollRightButton = document.querySelector(".scroll-right");

if (popularSection && scrollLeftButton && scrollRightButton) {
  const updatePopularButtonStates = () => {
    const maxScrollLeft =
      popularSection.scrollWidth - popularSection.clientWidth;
    scrollLeftButton.disabled = popularSection.scrollLeft <= 0;
    scrollRightButton.disabled = popularSection.scrollLeft >= maxScrollLeft;
  };

  scrollLeftButton.addEventListener("click", () => {
    const scrollAmount = 300;
    popularSection.scrollBy({
      left: Math.max(-scrollAmount, -popularSection.scrollLeft),
      behavior: "smooth",
    });
    // Delay update to account for scroll animation
    setTimeout(updatePopularButtonStates, 300);
  });

  scrollRightButton.addEventListener("click", () => {
    const scrollAmount = 300;
    popularSection.scrollBy({
      left: Math.min(
        scrollAmount,
        popularSection.scrollWidth -
          popularSection.clientWidth -
          popularSection.scrollLeft
      ),
      behavior: "smooth",
    });
    // Delay update to account for scroll animation
    setTimeout(updatePopularButtonStates, 300);
  });

  // Initial check
  updatePopularButtonStates();
}

// Stories Scroll Speed

const storiesSection = document.querySelector(".stories-scroll-container");
const scrollLeftStoriesButton = document.querySelector(".scroll-left-stories");
const scrollRightStoriesButton = document.querySelector(
  ".scroll-right-stories"
);

if (storiesSection && scrollLeftStoriesButton && scrollRightStoriesButton) {
  const updateStoriesButtonStates = () => {
    const maxScrollLeft =
      storiesSection.scrollWidth - storiesSection.clientWidth;
    scrollLeftStoriesButton.disabled = storiesSection.scrollLeft <= 0;
    scrollRightStoriesButton.disabled =
      storiesSection.scrollLeft >= maxScrollLeft;
  };

  scrollLeftStoriesButton.addEventListener("click", () => {
    const scrollAmount = 150;
    storiesSection.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
    // Delay update to account for scroll animation
    setTimeout(updateStoriesButtonStates, 300);
  });

  scrollRightStoriesButton.addEventListener("click", () => {
    const scrollAmount = 150;
    storiesSection.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    // Delay update to account for scroll animation
    setTimeout(updateStoriesButtonStates, 300);
  });

  // Initial check
  updateStoriesButtonStates();

  // Also monitor scrolling to keep button states updated
  storiesSection.addEventListener("scroll", updateStoriesButtonStates);
}

// Helper function to update button states
const updateButtonStates = (container, leftButton, rightButton) => {
  if (container.scrollLeft <= 0) {
    leftButton.classList.add("disabled");
  } else {
    leftButton.classList.remove("disabled");
  }

  if (container.scrollWidth <= container.scrollLeft + container.clientWidth) {
    rightButton.classList.add("disabled");
  } else {
    rightButton.classList.remove("disabled");
  }
};

// Initialize touch events for scrollable containers
const initTouchEvents = (container, leftButton, rightButton) => {
  let startX = 0;
  let startScrollLeft = 0;
  const scrollAmount = 1.5; // Adjust the scroll amount as needed

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startScrollLeft = container.scrollLeft;
  });

  container.addEventListener("touchmove", (e) => {
    const deltaX = (e.touches[0].clientX - startX) * scrollAmount;
    container.scrollLeft = startScrollLeft - deltaX;
    updateButtonStates(container, leftButton, rightButton);
  });

  container.addEventListener("scroll", () => {
    updateButtonStates(container, leftButton, rightButton);
  });
};

if (popularSection && scrollLeftButton && scrollRightButton) {
  initTouchEvents(popularSection, scrollLeftButton, scrollRightButton);
}

if (storiesSection && scrollLeftStoriesButton && scrollRightStoriesButton) {
  initTouchEvents(
    storiesSection,
    scrollLeftStoriesButton,
    scrollRightStoriesButton
  );
}
