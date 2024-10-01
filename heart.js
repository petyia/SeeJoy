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

// heart.js

// heart.js

// heart.js

// heart.js

// heart.js

// heart.js

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

      if (!eventElement) {
        console.error(`Nem található eseményelem az eventId-vel: ${eventId}`);
        return;
      }

      let dateNumber = "";
      let dateMonth = "";
      let eventTitle = "";
      let eventPrice = "";
      let eventBackground = "";

      // Feltételes logika az URL-ek alapján
      if (
        window.location.pathname.includes("single-event.html") ||
        window.location.pathname === "/single-event" ||
        window.location.pathname === "/single-event.html"
      ) {
        // A teljes dátum lekérése
        const dateElement = eventElement.querySelector(".event-date");

        if (dateElement) {
          const fullDateText = dateElement.textContent.trim(); // Szöveg lekérése és trimmelése
          console.log(`Found date text: ${fullDateText}`); // Ellenőrzés

          // Dátum feldolgozása: nap és hónap kivonása a szövegből
          const dateParts = fullDateText.split(" "); // ["2024", "Szeptember", "23.", "Szombat"]
          if (dateParts.length >= 3) {
            // A nap kivonása (az utolsó szám)
            dateNumber = dateParts[2].replace(".", ""); // "23"

            // A hónap rövidítése ("Szeptember" -> "Szep")
            const monthLookup = {
              Január: "Jan",
              Február: "Feb",
              Március: "Már",
              Április: "Ápr",
              Május: "Máj",
              Június: "Jún",
              Július: "Júl",
              Augusztus: "Aug",
              Szeptember: "Szep",
              Október: "Okt",
              November: "Nov",
              December: "Dec",
            };
            dateMonth = monthLookup[dateParts[1]] || dateParts[1]; // "Szeptember" -> "Szep"
          } else {
            console.error(`Unexpected date format: ${fullDateText}`);
          }
        } else {
          console.error("Nem található .event-date elem.");
        }

        // Az esemény további adatainak lekérdezése
        eventTitle =
          eventElement.querySelector(".event-title")?.textContent.trim() || "";
        eventPrice =
          eventElement.querySelector(".price-range")?.textContent.trim() ||
          "INGYEN";

        // Az első kép megkeresése a sliderben
        const sliderElement = document.querySelector(".slider");
        if (sliderElement) {
          const slideImageElement = sliderElement.querySelector(".slide img");
          if (slideImageElement) {
            eventBackground = slideImageElement.src; // Az <img> src attribútumából kapjuk meg a képet
          } else {
            console.error("Nem található kép a sliderben.");
          }
        } else {
          console.error("Nem található slider elem.");
        }
      }

      // Szív ikon állapotának kezelése és mentése a LocalStorage-be
      if (localStorage.getItem(`heart-${eventId}`) === "true") {
        localStorage.setItem(`heart-${eventId}`, "false");
        this.querySelector(".fa-solid").style.display = "none";
        this.querySelector(".fa-regular").style.display = "inline-block";
      } else {
        localStorage.setItem(`heart-${eventId}`, "true");
        this.querySelector(".fa-solid").style.display = "inline-block";
        this.querySelector(".fa-regular").style.display = "none";
      }

      // Esemény adatok mentése
      localStorage.setItem(`event-${eventId}-background`, eventBackground);
      localStorage.setItem(`event-${eventId}-number`, dateNumber);
      localStorage.setItem(`event-${eventId}-month`, dateMonth);
      localStorage.setItem(`event-${eventId}-title`, eventTitle);
      localStorage.setItem(`event-${eventId}-price`, eventPrice);

      console.log(`Saving event ${eventId} background: ${eventBackground}`);
      console.log(`Saving event ${eventId} title: ${eventTitle}`);
      console.log(`Saving event ${eventId} date (day): ${dateNumber}`);
      console.log(`Saving event ${eventId} month: ${dateMonth}`);
      console.log(`Saving event ${eventId} price: ${eventPrice}`);
    });
  });
});
