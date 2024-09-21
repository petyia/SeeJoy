document.addEventListener("DOMContentLoaded", () => {
  function setupHeartIcons() {
    const heartIconClasses = [
      {
        filled: ".event-date-heart-icon-filled",
        unfilled: ".event-date-heart-icon",
      },
      { filled: ".popular-heart-icon-filled", unfilled: ".popular-heart-icon" },
      {
        filled: ".upcoming-heart-icon-filled",
        unfilled: ".upcoming-heart-icon",
      },
    ];

    const heartIcons = document.querySelectorAll(".heart-icon");

    heartIcons.forEach((heartIcon, index) => {
      heartIconClasses.forEach(({ filled, unfilled }) => {
        const filledHeartIcon = heartIcon.querySelector(filled);
        const unfilledHeartIcon = heartIcon.querySelector(unfilled);

        // Az esemény azonosítója (itt érdemes adaptálni a megoldásodat)
        const eventId = heartIcon.dataset.eventId;

        if (filledHeartIcon || unfilledHeartIcon) {
          let isFilled = localStorage.getItem(`heart-${eventId}`) === "true";

          // Alapértelmezett állapot beállítása
          if (isFilled) {
            filledHeartIcon.style.display = "inline-block";
            unfilledHeartIcon.style.display = "none";
          } else {
            filledHeartIcon.style.display = "none";
            unfilledHeartIcon.style.display = "inline-block";
          }

          // Kattintás eseménykezelő
          heartIcon.addEventListener("click", () => {
            isFilled = !isFilled;
            localStorage.setItem(`heart-${eventId}`, isFilled);

            if (isFilled) {
              filledHeartIcon.style.display = "inline-block";
              unfilledHeartIcon.style.display = "none";
            } else {
              filledHeartIcon.style.display = "none";
              unfilledHeartIcon.style.display = "inline-block";
            }
          });
        }
      });
    });
  }

  setupHeartIcons();
});
