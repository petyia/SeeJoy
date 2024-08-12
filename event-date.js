// document.addEventListener("DOMContentLoaded", () => {
//   function setupHeartIcons() {
//     // Keresd meg az összes szív ikont a dokumentumban
//     const heartIcons = document.querySelectorAll(".heart-icon");

//     heartIcons.forEach((heartIcon) => {
//       const filledHeartIcon = heartIcon.querySelector(
//         ".event-date-heart-icon-filled"
//       );
//       const unfilledHeartIcon = heartIcon.querySelector(
//         ".event-date-heart-icon"
//       );

//       let isFilled = false;

//       // Kezdetben rejtjük a kitöltött ikont
//       if (filledHeartIcon) filledHeartIcon.style.display = "none";

//       // Adjuk hozzá a kattintás eseménykezelőt
//       heartIcon.addEventListener("click", () => {
//         isFilled = !isFilled;

//         if (isFilled) {
//           if (filledHeartIcon) filledHeartIcon.style.display = "inline-block";
//           if (unfilledHeartIcon) unfilledHeartIcon.style.display = "none";
//         } else {
//           if (filledHeartIcon) filledHeartIcon.style.display = "none";
//           if (unfilledHeartIcon)
//             unfilledHeartIcon.style.display = "inline-block";
//         }
//       });
//     });
//   }

//   // Állítsuk be a szív ikonokat
//   setupHeartIcons();
// });
