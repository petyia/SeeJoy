document.addEventListener("DOMContentLoaded", () => {
  function setupHeartIcons() {
    // Különböző szív ikon osztályok
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

    // Keresd meg az összes szív ikont a dokumentumban
    const heartIcons = document.querySelectorAll(".heart-icon");

    heartIcons.forEach((heartIcon) => {
      heartIconClasses.forEach(({ filled, unfilled }) => {
        const filledHeartIcon = heartIcon.querySelector(filled);
        const unfilledHeartIcon = heartIcon.querySelector(unfilled);

        if (filledHeartIcon || unfilledHeartIcon) {
          let isFilled = false;

          // Kezdetben rejtjük a kitöltött ikont
          if (filledHeartIcon) filledHeartIcon.style.display = "none";

          // Adjuk hozzá a kattintás eseménykezelőt
          heartIcon.addEventListener("click", () => {
            isFilled = !isFilled;

            if (isFilled) {
              if (filledHeartIcon)
                filledHeartIcon.style.display = "inline-block";
              if (unfilledHeartIcon) unfilledHeartIcon.style.display = "none";
            } else {
              if (filledHeartIcon) filledHeartIcon.style.display = "none";
              if (unfilledHeartIcon)
                unfilledHeartIcon.style.display = "inline-block";
            }
          });
        }
      });
    });
  }

  // Állítsuk be a szív ikonokat
  setupHeartIcons();
});
