// document.addEventListener("DOMContentLoaded", function () {
//   const eventMiniDate = document.querySelector(".event-mini-date");

//   function generateDates(year) {
//     const today = new Date();
//     const startDate = new Date(year, 0, 1); // January 1 of the given year
//     const endDate = new Date(year + 1, 0, 0); // December 31 of the given year

//     let currentDate = startDate;

//     // Move the start date to today if today is after startDate
//     if (today > startDate) {
//       currentDate = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate()
//       );
//     }

//     while (currentDate <= endDate) {
//       const dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
//       const day = currentDate.getDate();
//       const weekday = currentDate.toLocaleDateString("hu-HU", {
//         weekday: "short",
//       });

//       // Create event line element
//       const eventsLineElem = document.createElement("div");
//       eventsLineElem.classList.add("events-line");
//       eventsLineElem.id = `date${dateStr.replace(/-/g, "")}`;

//       // Create event date element
//       const eventsDateElem = document.createElement("div");
//       eventsDateElem.classList.add("events-date");
//       if (currentDate.toDateString() === today.toDateString()) {
//         eventsDateElem.classList.add("first", "today");
//       }

//       // Create upper and lower container divs
//       const upperContainer = document.createElement("div");
//       upperContainer.classList.add("events-upper-container");

//       const lowerContainer = document.createElement("div");
//       lowerContainer.classList.add("events-lower-container");

//       // Create date and day elements
//       const dateElem = document.createElement("div");
//       dateElem.classList.add("events-cat-date");
//       dateElem.textContent = day;

//       const dayElem = document.createElement("h3");
//       dayElem.classList.add("event-day-text");
//       dayElem.textContent = weekday;
//       if (["Szo", "Vas"].includes(weekday)) {
//         dayElem.classList.add("weekend");
//       }

//       // Append elements to containers
//       upperContainer.appendChild(dateElem);
//       lowerContainer.appendChild(dayElem);

//       // Append containers to event date element
//       eventsDateElem.appendChild(upperContainer);
//       eventsDateElem.appendChild(lowerContainer);

//       // Append event date element to event line element
//       eventsLineElem.appendChild(eventsDateElem);

//       // Append event line element to event mini date container
//       eventMiniDate.appendChild(eventsLineElem);

//       currentDate.setDate(currentDate.getDate() + 1); // Move to next day
//     }
//   }

//   generateDates(2024);
// });
