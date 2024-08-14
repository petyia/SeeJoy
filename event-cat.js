document.addEventListener("DOMContentLoaded", function () {
  // --- Naptár Generálás ---
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();
  var selectedDate = null;

  function generateCalendar(year, month) {
    var calendarBody = document.getElementById("calendar-body");
    var monthYear = document.getElementById("month-year");
    calendarBody.innerHTML = "";

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    if (firstDay === 0) {
      firstDay = 6;
    } else {
      firstDay -= 1;
    }

    var date = 1;
    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        var cell = document.createElement("td");
        if (i === 0 && j < firstDay) {
          cell.textContent = "";
        } else if (date > daysInMonth) {
          break;
        } else {
          var cellDate = new Date(year, month, date);
          cell.textContent = date;
          cell.dataset.date = cellDate.toDateString();
          cell.id = `date${cellDate
            .toISOString()
            .split("T")[0]
            .replace(/-/g, "")}`; // Egyedi ID hozzáadása

          if (cellDate.toDateString() === new Date().toDateString()) {
            cell.classList.add("today");
          }

          cell.addEventListener("click", function () {
            var selectedDateString = this.dataset.date;
            selectedDate = new Date(selectedDateString);
            setClickedDate(selectedDate);
            showCardsForDate(selectedDate);
          });

          row.appendChild(cell);
          date++;
        }
      }

      calendarBody.appendChild(row);
    }

    var monthNames = [
      "Január",
      "Február",
      "Március",
      "Április",
      "Május",
      "Június",
      "Július",
      "Augusztus",
      "Szeptember",
      "Október",
      "November",
      "December",
    ];
    monthYear.textContent = monthNames[month] + " " + year;
  }

  function setClickedDate(date) {
    var cells = document.querySelectorAll("#calendar-body td");
    cells.forEach(function (cell) {
      cell.classList.remove("clicked");
      if (cell.dataset.date === date.toDateString()) {
        cell.classList.add("clicked");
      }
    });
  }

  function showCardsForDate(date) {
    var dateId = `eventDateSection${date.getFullYear()}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
    var sections = document.querySelectorAll(".event-date-section");

    sections.forEach(function (section) {
      if (section.id === dateId) {
        section.classList.remove("fading-out");
        section.classList.add("visible");
        section.style.display = "block"; // biztosítjuk a megjelenést
      } else {
        section.classList.remove("visible");
        section.classList.add("fading-out");
        section.style.display = "none"; // biztosítjuk a rejtést
      }
    });
  }

  document.getElementById("prev-month").addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  document.getElementById("next-month").addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  document
    .getElementById("fa-calendar-days-cat")
    .addEventListener("click", function () {
      var calendarDropdown = document.getElementById("calendar-dropdown");
      calendarDropdown.style.display =
        calendarDropdown.style.display === "block" ? "none" : "block";
    });

  generateCalendar(currentYear, currentMonth);

  // --- Mini Dátumok Generálása ---
  const eventMiniDate = document.querySelector(".event-mini-date");

  function generateDates(year) {
    const today = new Date();
    const todayDate = new Date(
      today.toLocaleString("en-US", { timeZone: "Europe/Budapest" })
    );
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 0);

    eventMiniDate.innerHTML = "";

    const eventsLineElem = document.createElement("div");
    eventsLineElem.classList.add("events-line", "small-gap");

    let currentDate = new Date(todayDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const day = currentDate.getDate();
      const weekday = currentDate.toLocaleDateString("hu-HU", {
        weekday: "short",
      });

      const eventsDateElem = document.createElement("div");
      eventsDateElem.classList.add("events-date");
      eventsDateElem.id = `date${dateStr.replace(/-/g, "")}`;

      if (dateStr === todayDate.toISOString().split("T")[0]) {
        eventsDateElem.classList.add("first", "today");
      }

      const upperContainer = document.createElement("div");
      upperContainer.classList.add("events-upper-container");

      const lowerContainer = document.createElement("div");
      lowerContainer.classList.add("events-lower-container");

      const dateElem = document.createElement("div");
      dateElem.classList.add("events-cat-date");
      dateElem.textContent = day;

      const dayElem = document.createElement("h3");
      dayElem.classList.add("event-day-text");
      dayElem.textContent = weekday;
      if (["Szo", "V"].includes(weekday)) {
        dayElem.classList.add("weekend");
      }

      upperContainer.appendChild(dateElem);
      lowerContainer.appendChild(dayElem);

      eventsDateElem.appendChild(upperContainer);
      eventsDateElem.appendChild(lowerContainer);

      eventsLineElem.appendChild(eventsDateElem);

      currentDate.setDate(currentDate.getDate() + 1);
    }

    eventMiniDate.appendChild(eventsLineElem);
  }

  generateDates(2024);

  // --- Események Kattintása ---
  const eventsDates = document.querySelectorAll(".events-date");

  eventsDates.forEach((date) => {
    date.addEventListener("click", function () {
      const isAlreadyClicked = this.classList.contains("clicked");

      eventsDates.forEach((d) => d.classList.remove("clicked"));

      const sections = document.querySelectorAll(".event-date-section");
      sections.forEach((section) => {
        if (section.classList.contains("visible")) {
          section.classList.add("fading-out");

          section.addEventListener("animationend", function handler() {
            section.classList.remove("fading-out", "visible");
            section.style.display = "none";
            section.removeEventListener("animationend", handler);
          });
        }
      });

      if (!isAlreadyClicked) {
        this.classList.add("clicked");

        setTimeout(() => {
          const targetSectionId = `eventDateSection${this.id.substring(4)}`;
          const targetSection = document.getElementById(targetSectionId);

          if (targetSection) {
            targetSection.classList.add("visible");
            targetSection.style.display = "block";
          }
        }, 400);
      }
    });
  });

  // --- Görgetés Kezelése ---
  const catSection = document.querySelector(".event-mini");
  const scrollRightCatButton = document.querySelector(".scroll-right-cat");
  const scrollLeftCatButton = document.querySelector(".scroll-left-cat");
  const leftArrowContainer = document.querySelector(".cat-left-arrow");
  const rightArrowButton = document.getElementById("fa-chevron-right-cat");

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

    leftArrowContainer.style.display = scrollLeft > 0 ? "block" : "none";
    rightArrowButton.style.display =
      scrollLeft < scrollWidth - clientWidth ? "block" : "none";
  }

  scrollRightCatButton.addEventListener("click", () => {
    catSection.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(updateArrowVisibility, 300);
  });

  scrollLeftCatButton.addEventListener("click", () => {
    catSection.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(updateArrowVisibility, 300);
  });

  catSection.addEventListener("scroll", updateArrowVisibility);
  updateArrowVisibility();

  // --- Görgetés Kezelése Másik Szekcióban ---
  const catSectionDate = document.querySelector(".event-mini-date");
  const scrollRightCatButton2 = document.querySelector(".scroll-right-cat2");
  const scrollLeftCatButton2 = document.querySelector(".scroll-left-cat2");
  const leftArrowContainer2 = document.querySelector(".cat-left-arrow2");
  const rightArrowButton2 = document.getElementById("fa-chevron-right-cat2");

  if (
    !catSectionDate ||
    !scrollRightCatButton2 ||
    !scrollLeftCatButton2 ||
    !leftArrowContainer2
  ) {
    console.error("Nem találhatóak az elemek!");
    return;
  }

  function updateArrowVisibilityDate() {
    const scrollLeft = catSectionDate.scrollLeft;
    const scrollWidth = catSectionDate.scrollWidth;
    const clientWidth = catSectionDate.clientWidth;

    leftArrowContainer2.style.display = scrollLeft > 0 ? "block" : "none";
    rightArrowButton2.style.display =
      scrollLeft < scrollWidth - clientWidth ? "block" : "none";
  }

  scrollRightCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(updateArrowVisibilityDate, 300);
  });

  scrollLeftCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(updateArrowVisibilityDate, 300);
  });

  catSectionDate.addEventListener("scroll", updateArrowVisibilityDate);
  updateArrowVisibilityDate();
});

//Térkép
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
