// document.addEventListener("DOMContentLoaded", () => {
//   function setupHeartIcons() {
//     const heartIcons = document.querySelectorAll(".heart-icon");

//     heartIcons.forEach((heartIcon) => {
//       const eventId = heartIcon.getAttribute("data-event-id");

//       // Ellenőrzés: csak akkor működjön, ha van eventId
//       if (eventId) {
//         const filledHeartIcon = heartIcon.querySelector(".fa-solid");
//         const unfilledHeartIcon = heartIcon.querySelector(".fa-regular");

//         let isFilled = localStorage.getItem(`heart-${eventId}`) === "true";

//         // Alapértelmezett állapot beállítása
//         if (isFilled) {
//           filledHeartIcon.style.display = "inline-block";
//           unfilledHeartIcon.style.display = "none";
//         } else {
//           filledHeartIcon.style.display = "none";
//           unfilledHeartIcon.style.display = "inline-block";
//         }

//         // Kattintás eseménykezelő
//         heartIcon.addEventListener("click", () => {
//           isFilled = !isFilled;
//           localStorage.setItem(`heart-${eventId}`, isFilled);

//           if (isFilled) {
//             filledHeartIcon.style.display = "inline-block";
//             unfilledHeartIcon.style.display = "none";
//           } else {
//             filledHeartIcon.style.display = "none";
//             unfilledHeartIcon.style.display = "inline-block";
//           }
//         });
//       } else {
//         console.warn("Missing data-event-id for heart icon", heartIcon);
//       }
//     });
//   }

//   setupHeartIcons();
// });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    const eventId = heartIcon.getAttribute("data-event-id");

    // Kezdő állapot beállítása a LocalStorage-ból
    if (localStorage.getItem(`heart-${eventId}`) === "true") {
      heartIcon.querySelector(".fa-solid").style.display = "inline-block";
      heartIcon.querySelector(".fa-regular").style.display = "none";
    } else {
      heartIcon.querySelector(".fa-solid").style.display = "none";
      heartIcon.querySelector(".fa-regular").style.display = "inline-block";
    }

    heartIcon.addEventListener("click", function () {
      // Esemény adatok frissítése
      const eventElement = document.querySelector(
        `[data-event-id="${eventId}"]`
      );
      const dateNumber =
        eventElement.querySelector(".popular-number, .upcoming-number")
          ?.textContent || "";
      const dateMonth =
        eventElement.querySelector(".popular-month, .upcoming-month")
          ?.textContent || "";
      const eventTitle = eventElement.querySelector("h3")?.textContent || "";

      // Ellenőrizzük, hogy a szív aktív-e, és frissítsük a LocalStorage-t
      if (localStorage.getItem(`heart-${eventId}`) === "true") {
        localStorage.setItem(`heart-${eventId}`, "false");
        // Szívet átváltani üresre
        this.querySelector(".fa-solid").style.display = "none";
        this.querySelector(".fa-regular").style.display = "inline-block";
      } else {
        localStorage.setItem(`heart-${eventId}`, "true");
        // Szívet átváltani kitöltöttre
        this.querySelector(".fa-solid").style.display = "inline-block";
        this.querySelector(".fa-regular").style.display = "none";
      }

      // Esemény adatok mentése LocalStorage-be
      localStorage.setItem(`event-${eventId}-number`, dateNumber);
      localStorage.setItem(`event-${eventId}-month`, dateMonth);
      localStorage.setItem(`event-${eventId}-title`, eventTitle);
    });
  });
});
