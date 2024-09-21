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

document.addEventListener("DOMContentLoaded", () => {
  function loadFavorites() {
    const favoritesContainer = document.querySelector(
      "#content-3 .event-date-line"
    );
    favoritesContainer.innerHTML = "";

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("heart-") && localStorage.getItem(key) === "true") {
        const eventId = key.split("-")[1];

        // Esemény adatok lekérése a LocalStorage-ból
        const dateNumber =
          localStorage.getItem(`event-${eventId}-number`) || "";
        const dateMonth = localStorage.getItem(`event-${eventId}-month`) || "";
        const eventTitle = localStorage.getItem(`event-${eventId}-title`) || "";

        // Esemény kártya létrehozása a profil oldalra
        const eventCard = document.createElement("div");
        eventCard.className = "event-date-card profile";
        eventCard.setAttribute("data-event-id", eventId);
        eventCard.innerHTML = `
          <div class="event-date-lower-img-container profile">
            <div class="event-date-upper-container-outside profile">
              <div class="event-date-upper-container">
                <div class="event-date-date profile">
                  <div class="event-date-number">${dateNumber}</div>
                  <div class="event-date-month">${dateMonth}</div>
                </div>
              </div>
            </div>
            <div class="upper-img1-2-container profile"></div>
          </div>
          <div class="event-date-lower-container-outside profile">
            <div class="event-text-upper-container profile">
              <div class="upper-info-container profile">
                <h3 class="h3 bigger profile">${eventTitle}</h3>
              </div>
              <div class="heart-icon profile">
                <i class="fa-solid fa-heart event-date-heart-icon-filled" style="display: inline-block;"></i>
                <i class="fa-regular fa-heart event-date-heart-icon" style="display: none;"></i>
              </div>
            </div>
            <div class="event-date-lower-text-container profile">
              <div class="lower-info-container profile">
                <a href="single-event.html"><div class="event-date-price">INGYEN</div></a>
              </div>
            </div>
          </div>
        `;

        favoritesContainer.appendChild(eventCard);
      }
    });
  }

  // Add event listener for the "go-back" button
  document
    .querySelector(".go-back-icon")
    .addEventListener("click", function () {
      history.back(); // This will also navigate back to the previous page
    });

  loadFavorites();
});
