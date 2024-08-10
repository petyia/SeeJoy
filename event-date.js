document.addEventListener("DOMContentLoaded", () => {
  function setupHeartIcon(cardId, heartIconId) {
    const card = document.getElementById(cardId);
    if (card) {
      const heartIcon = card.querySelector(heartIconId);
      if (heartIcon) {
        const filledHeartIcon = heartIcon.querySelector(
          ".event-date-heart-icon-filled"
        );
        const unfilledHeartIcon = heartIcon.querySelector(
          ".event-date-heart-icon"
        );
        let isFilled = false;

        if (filledHeartIcon) filledHeartIcon.style.display = "none"; // Initially hide the filled icon

        heartIcon.addEventListener("click", () => {
          isFilled = !isFilled;

          if (isFilled) {
            if (filledHeartIcon) filledHeartIcon.style.display = "inline-block";
            if (unfilledHeartIcon) unfilledHeartIcon.style.display = "none";
          } else {
            if (filledHeartIcon) filledHeartIcon.style.display = "none";
            if (unfilledHeartIcon)
              unfilledHeartIcon.style.display = "inline-block";
          }
        });
      } else {
        console.error(`Heart icon with ID ${heartIconId} not found.`);
      }
    } else {
      console.error(`Card with ID ${cardId} not found.`);
    }
  }

  // Setup heart icons for each card
  setupHeartIcon("card9", "#heart-icon9");
  setupHeartIcon("card10", "#heart-icon11");
  setupHeartIcon("card11", "#heart-icon12");
  setupHeartIcon("card12", "#heart-icon4");
});
