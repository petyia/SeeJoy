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

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
//     const eventId = heartIcon.getAttribute("data-event-id");

//     // Kezdő állapot beállítása a LocalStorage-ból
//     if (localStorage.getItem(`heart-${eventId}`) === "true") {
//       heartIcon.querySelector(".fa-solid").style.display = "inline-block";
//       heartIcon.querySelector(".fa-regular").style.display = "none";
//     } else {
//       heartIcon.querySelector(".fa-solid").style.display = "none";
//       heartIcon.querySelector(".fa-regular").style.display = "inline-block";
//     }

//     heartIcon.addEventListener("click", function () {
//       // Esemény adatok frissítése
//       const eventElement = document.querySelector(
//         `[data-event-id="${eventId}"]`
//       );
//       const dateNumber =
//         eventElement.querySelector(
//           ".popular-number, .upcoming-number, .event-date-number"
//         )?.textContent || "";
//       const dateMonth =
//         eventElement.querySelector(
//           ".popular-month, .upcoming-month, .event-date-month"
//         )?.textContent || "";
//       const eventTitle =
//         eventElement.querySelector(".h3, h3.bigger")?.textContent || "";
//       const eventPrice =
//         eventElement.querySelector(
//           ".popular-price, .upcoming-price, .event-date-price"
//         )?.textContent || "INGYEN";

//       // Háttérkép URL feldolgozása (csak a valódi elérési út)
//       const backgroundImage =
//         window.getComputedStyle(eventElement).backgroundImage;
//       const eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása

//       // Ellenőrizzük, hogy a szív aktív-e, és frissítsük a LocalStorage-t
//       if (localStorage.getItem(`heart-${eventId}`) === "true") {
//         localStorage.setItem(`heart-${eventId}`, "false");
//         // Szívet átváltani üresre
//         this.querySelector(".fa-solid").style.display = "none";
//         this.querySelector(".fa-regular").style.display = "inline-block";
//       } else {
//         localStorage.setItem(`heart-${eventId}`, "true");
//         // Szívet átváltani kitöltöttre
//         this.querySelector(".fa-solid").style.display = "inline-block";
//         this.querySelector(".fa-regular").style.display = "none";
//       }

//       // Esemény adatok mentése LocalStorage-be
//       localStorage.setItem(`event-${eventId}-number`, dateNumber);
//       localStorage.setItem(`event-${eventId}-month`, dateMonth);
//       localStorage.setItem(`event-${eventId}-title`, eventTitle);
//       localStorage.setItem(`event-${eventId}-price`, eventPrice);
//       localStorage.setItem(`event-${eventId}-background`, eventBackground);
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    const eventId = heartIcon.getAttribute("data-event-id");

    // Set initial state from LocalStorage
    if (localStorage.getItem(`heart-${eventId}`) === "true") {
      heartIcon.querySelector(".fa-solid").style.display = "inline-block";
      heartIcon.querySelector(".fa-regular").style.display = "none";
    } else {
      heartIcon.querySelector(".fa-solid").style.display = "none";
      heartIcon.querySelector(".fa-regular").style.display = "inline-block";
    }

    heartIcon.addEventListener("click", function () {
      const eventElement = document.querySelector(
        `[data-event-id="${eventId}"]`
      );

      // Check if eventElement exists
      if (!eventElement) {
        console.error(`Event element not found with eventId: ${eventId}`);
        return;
      }

      const dateNumber =
        eventElement.querySelector(
          ".popular-number, .upcoming-number, .event-date-number"
        )?.textContent || "";
      const dateMonth =
        eventElement.querySelector(
          ".popular-month, .upcoming-month, .event-date-month"
        )?.textContent || "";
      const eventTitle =
        eventElement.querySelector(".h3, h3.bigger")?.textContent || "";
      const eventPrice =
        eventElement.querySelector(
          ".popular-price, .upcoming-price, .event-date-price"
        )?.textContent || "INGYEN";

      let eventBackground = "";

      // Handle background image retrieval
      const path = window.location.pathname;

      // Check for index.html or events.html in the path
      if (path.includes("index.html")) {
        const backgroundImage =
          window.getComputedStyle(eventElement).backgroundImage;
        if (backgroundImage && backgroundImage.startsWith("url(")) {
          eventBackground = backgroundImage.slice(5, -2); // Remove "url(" and ")"
        } else {
          console.warn("No background image found on index.html!");
        }
      } else if (path.includes("events.html")) {
        const eventBackgroundElement = eventElement.querySelector(
          '[class^="upper-img"][class$="-container"]'
        );
        if (eventBackgroundElement) {
          const backgroundImage = window.getComputedStyle(
            eventBackgroundElement
          ).backgroundImage;
          if (backgroundImage && backgroundImage.startsWith("url(")) {
            eventBackground = backgroundImage.slice(5, -2);
          } else {
            console.warn("No background image found on events.html!");
          }
        } else {
          console.error(
            "No element found for background image on events.html!"
          );
        }
      } else {
        console.error("Current URL does not match any expected paths.");
      }

      console.log(`Event background before saving: ${eventBackground}`);

      // Toggle heart icon and save state to LocalStorage
      if (localStorage.getItem(`heart-${eventId}`) === "true") {
        localStorage.setItem(`heart-${eventId}`, "false");
        this.querySelector(".fa-solid").style.display = "none";
        this.querySelector(".fa-regular").style.display = "inline-block";
      } else {
        localStorage.setItem(`heart-${eventId}`, "true");
        this.querySelector(".fa-solid").style.display = "inline-block";
        this.querySelector(".fa-regular").style.display = "none";
      }

      // Save event data to LocalStorage
      const relativeUrl = eventBackground.replace(
        /https?:\/\/seeejoooy\.netlify\.app\//, // Adjust this regex as necessary
        "./"
      );

      localStorage.setItem(`event-${eventId}-background`, relativeUrl);
      localStorage.setItem(`event-${eventId}-number`, dateNumber);
      localStorage.setItem(`event-${eventId}-month`, dateMonth);
      localStorage.setItem(`event-${eventId}-title`, eventTitle);
      localStorage.setItem(`event-${eventId}-price`, eventPrice);

      console.log(`Saving event ${eventId} background: ${eventBackground}`);
    });
  });
});
