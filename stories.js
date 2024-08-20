document.addEventListener("DOMContentLoaded", () => {
  const storiesSection = document.querySelector(".stories-scroll-container");
  const scrollLeftStoriesButton = document.querySelector(
    ".scroll-left-stories"
  );
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
      storiesSection.scrollBy({
        left: -150,
        behavior: "smooth",
      });
      setTimeout(updateStoriesButtonStates, 300);
    });

    scrollRightStoriesButton.addEventListener("click", () => {
      storiesSection.scrollBy({
        left: 150,
        behavior: "smooth",
      });
      setTimeout(updateStoriesButtonStates, 300);
    });

    storiesSection.addEventListener("scroll", updateStoriesButtonStates);
    updateStoriesButtonStates();

    // Touch Events
    const initTouchEventsStories = (container, leftButton, rightButton) => {
      let startX = 0;
      let startScrollLeft = 0;

      container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startScrollLeft = container.scrollLeft;
      });

      container.addEventListener("touchmove", (e) => {
        const deltaX = e.touches[0].clientX - startX;
        container.scrollLeft = startScrollLeft - deltaX;
        updateStoriesButtonStates();
      });

      container.addEventListener("touchend", () => {
        // Additional logic if needed
      });
    };

    initTouchEventsStories(
      storiesSection,
      scrollLeftStoriesButton,
      scrollRightStoriesButton
    );
  }
});
