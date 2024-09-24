// // JavaScript to handle follow button click
// document
//   .querySelector(".follow-button-with-long-class")
//   .addEventListener("click", function () {
//     const followButton = this;
//     if (followButton.classList.contains("active")) {
//       followButton.innerHTML = '<i class="fa-solid fa-plus"></i> Követés';
//       followButton.classList.remove("active");
//     } else {
//       followButton.innerHTML = '<i class="fa-solid fa-check"></i> Követed';
//       followButton.classList.add("active");
//     }
//   });

// document.addEventListener("DOMContentLoaded", () => {
//   function loadFavorites() {
//     const favoritesContainer = document.querySelector(
//       "#content-3 .event-date-line"
//     );
//     favoritesContainer.innerHTML = "";

//     Object.keys(localStorage).forEach((key) => {
//       if (key.startsWith("heart-") && localStorage.getItem(key) === "true") {
//         const eventId = key.split("-")[1];

//         // Esemény adatok lekérése a LocalStorage-ból
//         const dateNumber =
//           localStorage.getItem(`event-${eventId}-number`) || "";
//         const dateMonth = localStorage.getItem(`event-${eventId}-month`) || "";
//         const eventTitle = localStorage.getItem(`event-${eventId}-title`) || "";
//         const eventPrice =
//           localStorage.getItem(`event-${eventId}-price`) || "INGYEN";
//         const eventBackground =
//           localStorage.getItem(`event-${eventId}-background`) || "";

//         // Esemény kártya létrehozása a profil oldalra
//         const eventCard = document.createElement("div");
//         eventCard.className = "event-date-card profile fade-out";
//         eventCard.setAttribute("data-event-id", eventId);
//         eventCard.innerHTML = `
//           <div class="event-date-lower-img-container profile">
//             <div class="event-date-upper-container-outside profile">
//               <div class="event-date-upper-container">
//                 <div class="event-date-date profile">
//                   <div class="event-date-number">${dateNumber}</div>
//                   <div class="event-date-month">${dateMonth}</div>
//                 </div>
//               </div>
//             </div>
//             <div class="upper-img1-2-container profile" style="background-image: url('${eventBackground}')"></div>
//           </div>
//           <div class="event-date-lower-container-outside profile">
//             <div class="event-text-upper-container profile">
//               <div class="upper-info-container profile">
//                 <h3 class="h3 bigger profile">${eventTitle}</h3>
//               </div>
//               <div class="heart-icon profile" data-event-id="${eventId}">
//                 <i class="fa-solid fa-heart event-date-heart-icon-filled" style="display: inline-block;"></i>
//                 <i class="fa-regular fa-heart event-date-heart-icon" style="display: none;"></i>
//               </div>
//             </div>
//             <div class="event-date-lower-text-container profile">
//               <div class="lower-info-container profile-fav">
//                 <a href="single-event.html">
//                   <div class="event-date-price">${eventPrice}</div>
//                 </a>
//               </div>
//             </div>
//           </div>
//         `;

//         favoritesContainer.appendChild(eventCard);
//       }
//     });

//     // Szív ikon kattintás esemény hozzáadása a kedvencekhez
//     document.querySelectorAll(".heart-icon.profile").forEach((heartIcon) => {
//       heartIcon.addEventListener("click", function () {
//         const eventId = this.getAttribute("data-event-id");

//         // Ha a szív aktív, kivesszük a kedvencek közül
//         if (localStorage.getItem(`heart-${eventId}`) === "true") {
//           localStorage.setItem(`heart-${eventId}`, "false");

//           // Frissítjük a szív ikont
//           this.querySelector(".fa-solid").style.display = "none";
//           this.querySelector(".fa-regular").style.display = "inline-block";

//           // Esemény kártya eltávolítása előtt fade-out animáció
//           const eventCard = document.querySelector(
//             `.event-date-card.profile[data-event-id="${eventId}"]`
//           );
//           if (eventCard) {
//             eventCard.classList.add("remove"); // Animáció indítása
//             setTimeout(() => {
//               eventCard.remove(); // Késleltetett eltávolítás
//             }, 400); // 400ms az animáció ideje
//           }
//         }
//       });
//     });
//   }

//   // Add event listener for the "go-back" button
//   document
//     .querySelector(".go-back-icon")
//     .addEventListener("click", function () {
//       history.back();
//     });

//   loadFavorites();
// });

document.addEventListener("DOMContentLoaded", () => {
  function loadFavorites() {
    const favoritesContainer = document.querySelector(
      "#content-3 .event-date-line"
    );
    favoritesContainer.innerHTML = ""; // Clear the container

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("heart-") && localStorage.getItem(key) === "true") {
        const eventId = key.split("-")[1];

        // Retrieve event data from LocalStorage
        const dateNumber =
          localStorage.getItem(`event-${eventId}-number`) || "";
        const dateMonth = localStorage.getItem(`event-${eventId}-month`) || "";
        const eventTitle = localStorage.getItem(`event-${eventId}-title`) || "";
        const eventPrice =
          localStorage.getItem(`event-${eventId}-price`) || "INGYEN";
        const eventBackground =
          localStorage.getItem(`event-${eventId}-background`) || "";

        // Create event card for the profile page
        const eventCard = document.createElement("div");
        eventCard.className = "event-date-card profile fade-out";
        eventCard.setAttribute("data-event-id", eventId);
        eventCard.innerHTML = `
          <a href="single-event.html?eventId=${eventId}" class="event-link">
            <div class="event-date-lower-img-container profile">
              <div class="event-date-upper-container-outside profile">
                <div class="event-date-upper-container">
                  <div class="event-date-date profile">
                    <div class="event-date-number">${dateNumber}</div>
                    <div class="event-date-month">${dateMonth}</div>
                  </div>
                </div>
              </div>
              <div class="upper-img1-2-container profile" style="background-image: url('${eventBackground}')"></div>
            </div>
            <div class="event-date-lower-container-outside profile">
              <div class="event-text-upper-container profile">
                <div class="upper-info-container profile">
                  <h3 class="h3 bigger profile">${eventTitle}</h3>
                </div>
                <div class="heart-icon profile" data-event-id="${eventId}">
                  <i class="fa-solid fa-heart event-date-heart-icon-filled" style="display: inline-block;"></i>
                  <i class="fa-regular fa-heart event-date-heart-icon" style="display: none;"></i>
                </div>
              </div>
              <div class="event-date-lower-text-container profile">
                <div class="lower-info-container profile-fav">
                  <div class="event-date-price">${eventPrice}</div>
                </div>
              </div>
            </div>
          </a>
        `;

        favoritesContainer.appendChild(eventCard);
      }
    });

    // Add click event for heart icons in favorites
    document.querySelectorAll(".heart-icon.profile").forEach((heartIcon) => {
      heartIcon.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent the click from activating the link
        e.preventDefault(); // Prevent the default event as well

        const eventId = this.getAttribute("data-event-id");

        // If the heart is active, remove from favorites
        if (localStorage.getItem(`heart-${eventId}`) === "true") {
          localStorage.setItem(`heart-${eventId}`, "false");

          // Update the heart icon
          this.querySelector(".fa-solid").style.display = "none";
          this.querySelector(".fa-regular").style.display = "inline-block";

          // Remove the event card with fade-out animation
          const eventCard = document.querySelector(
            `.event-date-card.profile[data-event-id="${eventId}"]`
          );
          if (eventCard) {
            eventCard.classList.add("remove"); // Start animation
            setTimeout(() => {
              eventCard.remove(); // Delay removal
            }, 400); // Duration of the animation
          }
        }
      });
    });
  }

  // Add event listener for the "go-back" button
  document
    .querySelector(".go-back-icon")
    .addEventListener("click", function () {
      history.back();
    });

  loadFavorites(); // Load favorites on page load
});
