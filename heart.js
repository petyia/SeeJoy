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

    // Kezdő állapot beállítása a LocalStorage-ból
    if (localStorage.getItem(`heart-${eventId}`) === "true") {
      heartIcon.querySelector(".fa-solid").style.display = "inline-block";
      heartIcon.querySelector(".fa-regular").style.display = "none";
    } else {
      heartIcon.querySelector(".fa-solid").style.display = "none";
      heartIcon.querySelector(".fa-regular").style.display = "inline-block";
    }

    heartIcon.addEventListener("click", function () {
      const eventId = heartIcon.getAttribute("data-event-id");

      // Esemény adatainak lekérése
      const eventElement = document.querySelector(
        `[data-event-id="${eventId}"]`
      );

      // Ellenőrizni kell, hogy az eventElement létezik-e
      if (!eventElement) {
        console.error(`Nem található eseményelem az eventId-vel: ${eventId}`);
        return; // Ha nem található, akkor kilépünk
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

      // Háttérkép lekérése
      let eventBackground = "";

      // Az index.html oldal háttérképei a kártya elem CSS hátterében vannak
      if (window.location.pathname.includes("index.html")) {
        const backgroundImage =
          window.getComputedStyle(eventElement).backgroundImage;
        eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása
      }
      // Az events.html oldal háttérképei külön div-ekben vannak
      else if (window.location.pathname.includes("events.html")) {
        const eventBackgroundElement = eventElement.querySelector(
          '[class^="upper-img"][class$="-container"]'
        );
        if (eventBackgroundElement) {
          const backgroundImage = window.getComputedStyle(
            eventBackgroundElement
          ).backgroundImage;
          eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása
        }
      }

      // Debugging: ellenőrizd a háttérkép URL-jét
      console.log(`Event background before saving: ${eventBackground}`);

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
      if (window.location.hostname === "localhost") {
        localStorage.setItem(`event-${eventId}-background`, eventBackground);
      } else {
        const relativeUrl = eventBackground.replace(
          "http://127.0.0.1:5500/",
          "./"
        );
        localStorage.setItem(`event-${eventId}-background`, relativeUrl);
      }

      localStorage.setItem(`event-${eventId}-number`, dateNumber);
      localStorage.setItem(`event-${eventId}-month`, dateMonth);
      localStorage.setItem(`event-${eventId}-title`, eventTitle);
      localStorage.setItem(`event-${eventId}-price`, eventPrice);

      // Debugging: mentett háttérkép URL
      console.log(`Saving event ${eventId} background: ${eventBackground}`);
    });
  });
});
