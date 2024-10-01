document.addEventListener("DOMContentLoaded", function () {
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();

  // --- Ide illesztheted be a kódot a dátum frissítéshez ---
  const monthNames = [
    "Jan",
    "Feb",
    "Már",
    "Ápr",
    "Máj",
    "Jún",
    "Júl",
    "Aug",
    "Szep",
    "Okt",
    "Nov",
    "Dec",
  ];

  document.querySelectorAll(".event-date-section").forEach((section) => {
    const id = section.id;
    const yearMonthDay = id.replace("eventDateSection", ""); // pl.: 20241001

    if (yearMonthDay.length === 8) {
      const year = yearMonthDay.substring(0, 4); // 2024
      const month = parseInt(yearMonthDay.substring(4, 6), 10); // 10 (október)
      const day = yearMonthDay.substring(6, 8); // 01

      const monthName = monthNames[month - 1]; // Okt (10. hónap)

      section.querySelectorAll(".event-date-card").forEach((card) => {
        const dayElement = card.querySelector(".event-date-number");
        const monthElement = card.querySelector(".event-date-month");

        if (dayElement) {
          dayElement.textContent = day; // Beállítjuk a napot
        }

        if (monthElement) {
          monthElement.textContent = monthName; // Beállítjuk a hónapot rövidítve
        }
      });
    }
  });

  // Generálja a naptárat
  function generateCalendar(year, month) {
    var calendarBody = document.getElementById("calendar-body");
    var monthYear = document.getElementById("month-year");
    calendarBody.innerHTML = "";

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    var totalDays = daysInMonth + (firstDay === 0 ? 6 : firstDay - 1);
    var startDay = firstDay === 0 ? 6 : firstDay - 1;
    var date = 1;

    var rowsNeeded = Math.ceil(totalDays / 7);

    for (var i = 0; i < rowsNeeded; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        var cell = document.createElement("td");

        if (i === 0 && j < startDay) {
          var previousMonthDate = new Date(
            year,
            month - 1,
            lastDayOfPreviousMonth - startDay + j + 1
          );
          cell.textContent = previousMonthDate.getDate();
          cell.dataset.date = previousMonthDate.toDateString();
          cell.classList.add("inactive");
        } else if (date > daysInMonth) {
          var nextMonthDate = new Date(year, month + 1, date - daysInMonth);
          cell.textContent = nextMonthDate.getDate();
          cell.dataset.date = nextMonthDate.toDateString();
          cell.classList.add("inactive");
          date++;
        } else {
          var cellDate = new Date(year, month, date);
          cell.textContent = date;
          cell.dataset.date = cellDate.toDateString();

          if (cellDate.toDateString() === new Date().toDateString()) {
            cell.classList.add("today");
          }

          cell.addEventListener("click", function () {
            var selectedDateString = this.dataset.date;
            var selectedDate = new Date(selectedDateString);
            setClickedDate(selectedDate);
            setMiniClickedDate(selectedDate);
            showCardsForDate(selectedDate);
            closeCalendar(); // Automatikusan bezárja a naptárat kattintás után
          });

          date++;
        }

        row.appendChild(cell);
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

    // Hozzáadjuk a clicked osztályt a mai naphoz és automatikusan megjelenítjük az eseményeket
    var today = new Date();
    if (today.getFullYear() === year && today.getMonth() === month) {
      setClickedDate(today);
      showCardsForDate(today);
    }
  }

  // Frissíti a naptárat clicked osztállyal
  function setClickedDate(date) {
    var cells = document.querySelectorAll("#calendar-body td");
    cells.forEach(function (cell) {
      cell.classList.remove("clicked");
      if (cell.dataset.date === date.toDateString()) {
        cell.classList.add("clicked");
      }
    });
  }

  // Frissíti az events-date clicked osztállyal
  function setMiniClickedDate(date) {
    var eventDates = document.querySelectorAll(".events-date");
    var dateId = `date${date.getFullYear()}${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}${("0" + date.getDate()).slice(-2)}`;

    eventDates.forEach(function (eventDate) {
      eventDate.classList.remove("clicked");
      if (eventDate.id === dateId) {
        eventDate.classList.add("clicked");
      }
    });
  }

  // Megjeleníti a megfelelő eseményt
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
        section.style.display = "block";
      } else {
        section.classList.remove("visible");
        section.classList.add("fading-out");
        section.style.display = "none";
      }
    });
  }

  // Az events-date kattintása esetén szinkronizáljuk a naptárral
  function handleMiniDateClick() {
    var eventsDates = document.querySelectorAll(".events-date");

    eventsDates.forEach(function (dateElem) {
      dateElem.addEventListener("click", function () {
        var isAlreadyClicked = this.classList.contains("clicked");
        if (!isAlreadyClicked) {
          eventsDates.forEach((d) => d.classList.remove("clicked"));
          this.classList.add("clicked");
          var targetDate = new Date(
            this.id.substring(4, 8) +
              "-" +
              this.id.substring(8, 10) +
              "-" +
              this.id.substring(10)
          );
          setClickedDate(targetDate); // Frissítjük a naptárt
          showCardsForDate(targetDate);
        }
      });
    });
  }

  // Naptár nyitása/zárása gombnyomásra
  document
    .getElementById("fa-calendar-days-cat")
    .addEventListener("click", function () {
      var calendarDropdown = document.getElementById("calendar-dropdown");
      calendarDropdown.style.display =
        calendarDropdown.style.display === "block" ? "none" : "block";
    });

  // Naptár automatikus bezárása
  function closeCalendar() {
    var calendarDropdown = document.getElementById("calendar-dropdown");
    calendarDropdown.style.display = "none"; // Bezárja a naptárat
  }

  // Hónap váltás
  document.getElementById("prev-month").addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
    handleMiniDateClick(); // Frissítjük a mini naptárt is
  });

  document.getElementById("next-month").addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
    handleMiniDateClick(); // Frissítjük a mini naptárt is
  });

  // Naptár generálása és mini dátumok kezelése
  generateCalendar(currentYear, currentMonth);
  handleMiniDateClick();

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
        eventsDateElem.classList.add("first", "today", "clicked"); // Always clicked if today
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

  // --- Események kattintása és szinkronizálása ---
  handleMiniDateClick();

  // --- Görgetés Kezelése az első nyílhoz ---
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
      scrollLeft + clientWidth < scrollWidth ? "block" : "none";
  }

  scrollRightCatButton.addEventListener("click", () => {
    catSection.scrollBy({ left: 300, behavior: "smooth" });
  });

  scrollLeftCatButton.addEventListener("click", () => {
    catSection.scrollBy({ left: -300, behavior: "smooth" });
  });

  catSection.addEventListener("scroll", updateArrowVisibility);
  window.addEventListener("resize", updateArrowVisibility);
  updateArrowVisibility();

  // --- Görgetés Kezelése a második nyílhoz ---
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
    console.error("Nem találhatóak az elemek a második görgetéshez!");
    return;
  }

  function updateArrowVisibilityDate() {
    const scrollLeft = catSectionDate.scrollLeft;
    const scrollWidth = catSectionDate.scrollWidth;
    const clientWidth = catSectionDate.clientWidth;

    leftArrowContainer2.style.display = scrollLeft > 0 ? "block" : "none";

    rightArrowButton2.style.display =
      scrollLeft + clientWidth < scrollWidth ? "block" : "none";
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
  window.addEventListener("resize", updateArrowVisibilityDate);
  updateArrowVisibilityDate();

  catSectionDate.addEventListener("touchmove", updateArrowVisibilityDate);

  document.querySelectorAll(".popular-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Mentjük a 'pageData' kulcs alá az URL-t és az oldal nevét
      sessionStorage.setItem(
        "pageData",
        JSON.stringify({
          url: window.location.href,
          source: "events",
        })
      );
    });
  });

  const monthNamesLine = [
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

  const dateDisplay = document.querySelector(".date-year-month");
  const miniDateContainer = document.querySelector(".event-mini-date");

  // A dátum frissítése a hónap alapján
  function updateMonthYearDisplay(dateId) {
    const year = dateId.substring(4, 8); // Év kinyerése
    const month = parseInt(dateId.substring(8, 10), 10); // Hónap kinyerése
    const monthName = monthNamesLine[month - 1]; // Hónap név kinyerése
    dateDisplay.textContent = `${monthName}, ${year}`; // Frissítés
  }

  // Ellenőrizzük, hogy melyik az első látható dátum a mini naptárban
  function checkVisibleDates() {
    const dates = document.querySelectorAll(".events-date");
    let firstVisibleDate = null;

    dates.forEach((date) => {
      const rect = date.getBoundingClientRect();
      // Ellenőrizzük, hogy az elem látható-e a naptár container belsejében
      if (
        rect.left >= miniDateContainer.getBoundingClientRect().left &&
        rect.right <= window.innerWidth
      ) {
        if (
          !firstVisibleDate ||
          rect.left < firstVisibleDate.getBoundingClientRect().left
        ) {
          firstVisibleDate = date;
        }
      }
    });

    if (firstVisibleDate) {
      const dateId = firstVisibleDate.id;
      updateMonthYearDisplay(dateId);
    }
  }

  // Görgetés esemény figyelése a mini naptárban
  miniDateContainer.addEventListener("scroll", function () {
    checkVisibleDates();
  });

  // Nyilak kattintásának kezelése
  document
    .querySelector(".scroll-right-cat2")
    .addEventListener("click", function () {
      setTimeout(checkVisibleDates, 300); // Kis késleltetéssel frissítjük a látható elemeket
    });

  document
    .querySelector(".scroll-left-cat2")
    .addEventListener("click", function () {
      setTimeout(checkVisibleDates, 300); // Kis késleltetéssel frissítjük a látható elemeket
    });

  // Betöltéskor beállítjuk az aktuális dátumot
  checkVisibleDates();
});
