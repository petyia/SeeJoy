document.addEventListener("DOMContentLoaded", () => {
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
      popularSection.scrollBy({
        left: -300,
        behavior: "smooth",
      });
      setTimeout(updatePopularButtonStates, 300);
    });

    scrollRightButton.addEventListener("click", () => {
      popularSection.scrollBy({
        left: 300,
        behavior: "smooth",
      });
      setTimeout(updatePopularButtonStates, 300);
    });

    popularSection.addEventListener("scroll", updatePopularButtonStates);
    updatePopularButtonStates();

    // Touch Events
    const initTouchEvents = (container, leftButton, rightButton) => {
      let startX = 0;
      let startScrollLeft = 0;

      container.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startScrollLeft = container.scrollLeft;
      });

      container.addEventListener("touchmove", (e) => {
        const deltaX = e.touches[0].clientX - startX;
        container.scrollLeft = startScrollLeft - deltaX;
        updatePopularButtonStates();
      });

      container.addEventListener("touchend", () => {
        // You can add additional logic here if needed
      });
    };

    initTouchEvents(popularSection, scrollLeftButton, scrollRightButton);
  }
});
