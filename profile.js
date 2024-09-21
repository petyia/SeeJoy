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
    favoritesContainer.innerHTML = ""; // Ürítsd ki a konténert a duplikáció elkerülése érdekében
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith("heart-") && localStorage.getItem(key) === "true") {
        const eventId = key.split("-")[1];

        // Ellenőrizd, hogy a kedvenc esemény már meg van-e jelenítve
        if (favoritesContainer.querySelector(`[data-event-id="${eventId}"]`)) {
          return; // Ha már létezik, lépj ki a funkcióból
        }

        // A kedvenc esemény adatai (ezeket dinamikusan kellene beállítani)
        const dateNumber = "26"; // Esemény dátuma
        const dateMonth = "Szep"; // Esemény hónapja
        const eventTitle = "Játszunk együtt a legnépszerűbb társasokkal"; // Esemény neve

        const eventCard = document.createElement("div");
        eventCard.className = "event-date-card profile";
        eventCard.setAttribute("data-event-id", eventId); // Egyedi azonosító beállítása
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
                <div class="my-event-lower-info-container">
                  <a href="#">
                    <div class="my-event-line" id="stories-line">
                      <div class="story-container">
                        <div class="my-event-card-medium smaller my-event2-7"></div>
                      </div>
                      <div class="story-container">
                        <div class="my-event-card-medium smaller my-event2-3"></div>
                      </div>
                      <div class="story-container">
                        <div class="my-event-card-medium smaller my-event3">
                          <span id="my-event-plus-number-medium">+9</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
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
