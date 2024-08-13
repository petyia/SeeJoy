document.addEventListener("DOMContentLoaded", function () {
  const eventMiniDate = document.querySelector(".event-mini-date");

  function generateDates(year) {
    // Get today's date in Budapest time zone
    const today = new Date();
    const todayDate = new Date(
      today.toLocaleString("en-US", { timeZone: "Europe/Budapest" })
    );
    const startDate = new Date(year, 0, 1); // January 1 of the given year
    const endDate = new Date(year + 1, 0, 0); // December 31 of the given year

    // Clear existing dates
    eventMiniDate.innerHTML = "";

    // Create a single events-line element to contain all events-date
    const eventsLineElem = document.createElement("div");
    eventsLineElem.classList.add("events-line");
    eventsLineElem.classList.add("small-gap");

    // Initialize currentDate to today
    let currentDate = new Date(todayDate); // Make a copy of todayDate

    // Generate dates starting from today
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
      const day = currentDate.getDate();
      const weekday = currentDate.toLocaleDateString("hu-HU", {
        weekday: "short",
      });

      // Create event date element
      const eventsDateElem = document.createElement("div");
      eventsDateElem.classList.add("events-date");
      eventsDateElem.id = `date${dateStr.replace(/-/g, "")}`;

      // Add 'first' and 'today' classes only for today's date
      if (
        currentDate.toISOString().split("T")[0] ===
        todayDate.toISOString().split("T")[0]
      ) {
        eventsDateElem.classList.add("first", "today");
      }

      // Create upper and lower container divs
      const upperContainer = document.createElement("div");
      upperContainer.classList.add("events-upper-container");

      const lowerContainer = document.createElement("div");
      lowerContainer.classList.add("events-lower-container");

      // Create date and day elements
      const dateElem = document.createElement("div");
      dateElem.classList.add("events-cat-date");
      dateElem.textContent = day;

      const dayElem = document.createElement("h3");
      dayElem.classList.add("event-day-text");
      dayElem.textContent = weekday;
      if (["Szo", "V"].includes(weekday)) {
        dayElem.classList.add("weekend");
      }

      // Append elements to containers
      upperContainer.appendChild(dateElem);
      lowerContainer.appendChild(dayElem);

      // Append containers to event date element
      eventsDateElem.appendChild(upperContainer);
      eventsDateElem.appendChild(lowerContainer);

      // Append event date element to events line element
      eventsLineElem.appendChild(eventsDateElem);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Append events line element to event mini date container
    eventMiniDate.appendChild(eventsLineElem);
  }

  generateDates(2024);
});

//1 - Típusok
document.addEventListener("DOMContentLoaded", function () {
  const catSection = document.querySelector(".event-mini");
  const scrollRightCatButton = document.querySelector(".scroll-right-cat");
  const scrollLeftCatButton = document.querySelector(".scroll-left-cat");
  const leftArrowContainer = document.querySelector(".cat-left-arrow");
  const rightArrowButton = document.getElementById("fa-chevron-right-cat");

  // Ellenőrizzük, hogy az elemek léteznek-e
  if (
    !catSection ||
    !scrollRightCatButton ||
    !scrollLeftCatButton ||
    !leftArrowContainer
  ) {
    console.error("Nem találhatóak az elemek!");
    return;
  }

  function updateArrowVisibility() {
    const scrollLeft = catSection.scrollLeft;
    const scrollWidth = catSection.scrollWidth;
    const clientWidth = catSection.clientWidth;

    // Bal nyíl láthatóságának frissítése
    if (scrollLeft > 0) {
      leftArrowContainer.style.display = "block";
    } else {
      leftArrowContainer.style.display = "none";
    }

    // Jobb nyíl láthatóságának frissítése
    if (scrollLeft < scrollWidth - clientWidth) {
      rightArrowButton.style.display = "block";
    } else {
      rightArrowButton.style.display = "none";
    }
  }

  // Görgetés jobbra
  scrollRightCatButton.addEventListener("click", () => {
    catSection.scrollBy({
      left: 300,
      behavior: "smooth",
    });
    // Frissítjük a nyíl gombok láthatóságát a görgetés után
    setTimeout(updateArrowVisibility, 300); // Várunk egy kicsit, hogy a görgetés befejeződjön
  });

  // Görgetés balra
  scrollLeftCatButton.addEventListener("click", () => {
    catSection.scrollBy({
      left: -300,
      behavior: "smooth",
    });
    // Frissítjük a nyíl gombok láthatóságát a görgetés után
    setTimeout(updateArrowVisibility, 300); // Várunk egy kicsit, hogy a görgetés befejeződjön
  });

  // Eseményfigyelő a scroll eseményhez a dinamikus frissítéshez
  catSection.addEventListener("scroll", updateArrowVisibility);

  // Frissítjük a nyíl gombok láthatóságát kezdetben
  updateArrowVisibility();
});

//2 - Dátumok
document.addEventListener("DOMContentLoaded", function () {
  const catSectionDate = document.querySelector(".event-mini-date");
  const scrollRightCatButton2 = document.querySelector(".scroll-right-cat2");
  const scrollLeftCatButton2 = document.querySelector(".scroll-left-cat2");
  const leftArrowContainer2 = document.querySelector(".cat-left-arrow2");
  const rightArrowButton2 = document.getElementById("fa-chevron-right-cat2");

  // Ellenőrizzük, hogy az elemek léteznek-e
  if (
    !catSectionDate ||
    !scrollRightCatButton2 ||
    !scrollLeftCatButton2 ||
    !leftArrowContainer2
  ) {
    console.error("Nem találhatóak az elemek!");
    return;
  }

  function updateArrowVisibility() {
    const scrollLeft = catSectionDate.scrollLeft;
    const scrollWidth = catSectionDate.scrollWidth;
    const clientWidth = catSectionDate.clientWidth;

    // Bal nyíl láthatóságának frissítése
    if (scrollLeft > 0) {
      leftArrowContainer2.style.display = "block";
    } else {
      leftArrowContainer2.style.display = "none";
    }

    // Jobb nyíl láthatóságának frissítése
    if (scrollLeft < scrollWidth - clientWidth) {
      rightArrowButton2.style.display = "block";
    } else {
      rightArrowButton2.style.display = "none";
    }
  }

  // Görgetés jobbra
  scrollRightCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({
      left: 300,
      behavior: "smooth",
    });
    // Frissítjük a nyíl gombok láthatóságát a görgetés után
    setTimeout(updateArrowVisibility, 300); // Várunk egy kicsit, hogy a görgetés befejeződjön
  });

  // Görgetés balra
  scrollLeftCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({
      left: -300,
      behavior: "smooth",
    });
    // Frissítjük a nyíl gombok láthatóságát a görgetés után
    setTimeout(updateArrowVisibility, 300); // Várunk egy kicsit, hogy a görgetés befejeződjön
  });

  // Eseményfigyelő a scroll eseményhez a dinamikus frissítéshez
  catSectionDate.addEventListener("scroll", updateArrowVisibility);

  // Frissítjük a nyíl gombok láthatóságát kezdetben
  updateArrowVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
  const eventsDates = document.querySelectorAll(".events-date");

  eventsDates.forEach((date) => {
    date.addEventListener("click", function () {
      // Ellenőrizzük, hogy a kattintott elem már rendelkezik-e 'clicked' osztállyal
      const isAlreadyClicked = this.classList.contains("clicked");

      // Eltávolítjuk a 'clicked' osztályt az összes 'events-date' elemből
      eventsDates.forEach((d) => d.classList.remove("clicked"));

      // Az összes esemény szakasz fade-out animálása
      const sections = document.querySelectorAll(".event-date-section");
      sections.forEach((section) => {
        if (section.classList.contains("visible")) {
          section.classList.add("fading-out");

          section.addEventListener("animationend", function handler() {
            section.classList.remove("fading-out");
            section.classList.remove("visible");
            section.style.display = "none"; // Rejtjük a szekciót, miután az animáció befejeződött
            section.removeEventListener("animationend", handler);
          });
        }
      });

      if (!isAlreadyClicked) {
        // Ha az elem még nincs 'clicked' állapotban, hozzáadjuk
        this.classList.add("clicked");

        // Késleltetve megjelenítjük a kattintott dátumhoz tartozó szakaszt
        setTimeout(() => {
          const targetSectionId = `eventDateSection${this.id.substring(4)}`;
          const targetSection = document.getElementById(targetSectionId);

          if (targetSection) {
            targetSection.classList.add("visible");
            targetSection.style.display = "block"; // biztosítjuk a megjelenést
          }
        }, 400); // Késleltetés az animáció időtartamának megfelelően (csökkentve)
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mapButton = document.getElementById("map-button");
  const mapContainer = document.getElementById("map");
  let mapLoaded = false;
  let map;

  mapButton.addEventListener("click", function () {
    if (!mapLoaded) {
      // Show the map container
      mapContainer.style.display = "block";

      // Initialize the map with a slight delay
      setTimeout(() => {
        // Initialize the map
        map = L.map(mapContainer).setView([47.4979, 19.0402], 12); // Budapest coordinates

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapLoaded = true;
      }, 100); // 100 ms delay to ensure the container is visible
    } else {
      // Toggle map visibility
      if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        map.invalidateSize(); // Adjust map size
      } else {
        mapContainer.style.display = "none";
      }
    }
  });
});
