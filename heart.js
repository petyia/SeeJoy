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
        window.location.pathname.includes("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname === "/index"
      ) {
        // Az index.html oldal lekérdezései
        const dateElementNumber = eventElement.querySelector(
          ".popular-number, .upcoming-number"
        );
        const dateElementMonth = eventElement.querySelector(
          ".popular-month, .upcoming-month"
        );
        if (dateElementNumber && dateElementMonth) {
          dateNumber = dateElementNumber.textContent.trim(); // Dátum napja
          dateMonth = dateElementMonth.textContent.trim().slice(0, 3); // Hónap rövidítése ("Január" -> "Jan")
        }

        eventTitle =
          eventElement.querySelector(".h3")?.textContent.trim() || "";
        eventPrice =
          eventElement
            .querySelector(".popular-price, .upcoming-price")
            ?.textContent.trim() || "INGYEN";

        const backgroundImage =
          window.getComputedStyle(eventElement).backgroundImage;
        eventBackground = backgroundImage.slice(5, -2); // A "url(" és ")" eltávolítása
      } else if (
        window.location.pathname.includes("events.html") ||
        window.location.pathname === "/events" ||
        window.location.pathname === "/events.html"
      ) {
        // Az events.html oldal lekérdezései
        const dateElementNumber =
          eventElement.querySelector(".event-date-number");
        const dateElementMonth =
          eventElement.querySelector(".event-date-month");
        if (dateElementNumber && dateElementMonth) {
          dateNumber = dateElementNumber.textContent.trim(); // Dátum napja
          dateMonth = dateElementMonth.textContent.trim().slice(0, 3); // Hónap rövidítése ("Szeptember" -> "Szep")
        }

        eventTitle =
          eventElement.querySelector(".h3.bigger")?.textContent.trim() || "";
        eventPrice =
          eventElement.querySelector(".event-date-price")?.textContent.trim() ||
          "INGYEN";

        const eventBackgroundElement = eventElement.querySelector(
          '[class^="upper-img"][class$="-container"]'
        );
        if (eventBackgroundElement) {
          const backgroundImage = window.getComputedStyle(
            eventBackgroundElement
          ).backgroundImage;
          eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása
        }
      } else if (
        window.location.pathname.includes("tickets.html") ||
        window.location.pathname === "/tickets" ||
        window.location.pathname === "/tickets.html"
      ) {
        // Az tickets.html oldal lekérdezései
        const dateElementNumber =
          eventElement.querySelector(".event-date-number");
        const dateElementMonth =
          eventElement.querySelector(".event-date-month");
        if (dateElementNumber && dateElementMonth) {
          dateNumber = dateElementNumber.textContent.trim(); // Dátum napja
          dateMonth = dateElementMonth.textContent.trim().slice(0, 3); // Hónap rövidítése ("Szeptember" -> "Szep")
        }

        eventTitle =
          eventElement.querySelector(".h3.bigger")?.textContent.trim() || "";
        eventPrice =
          eventElement.querySelector(".event-date-price")?.textContent.trim() ||
          "INGYEN";

        const eventBackgroundElement = eventElement.querySelector(
          '[class^="upper-img"][class$="-container"]'
        );
        if (eventBackgroundElement) {
          const backgroundImage = window.getComputedStyle(
            eventBackgroundElement
          ).backgroundImage;
          eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása
        }
      } else if (
        window.location.pathname.includes("profile.html") ||
        window.location.pathname === "/profile" ||
        window.location.pathname === "/profile.html"
      ) {
        // Az events.html oldal lekérdezései
        const dateElementNumber =
          eventElement.querySelector(".event-date-number");
        const dateElementMonth =
          eventElement.querySelector(".event-date-month");
        if (dateElementNumber && dateElementMonth) {
          dateNumber = dateElementNumber.textContent.trim(); // Dátum napja
          dateMonth = dateElementMonth.textContent.trim().slice(0, 3); // Hónap rövidítése ("Szeptember" -> "Szep")
        }

        eventTitle =
          eventElement.querySelector(".h3.bigger")?.textContent.trim() || "";
        eventPrice =
          eventElement.querySelector(".event-date-price")?.textContent.trim() ||
          "INGYEN";

        const eventBackgroundElement = eventElement.querySelector(
          '[class^="upper-img"][class$="-container profile"]'
        );
        if (eventBackgroundElement) {
          const backgroundImage = window.getComputedStyle(
            eventBackgroundElement
          ).backgroundImage;
          eventBackground = backgroundImage.slice(5, -2); // "url(" és ")" levágása
        }
      } else if (
        window.location.pathname.includes("single-event.html") ||
        window.location.pathname === "/single-event" ||
        window.location.pathname === "/single-event.html"
      ) {
        // A single-event.html oldal lekérdezései
        const dateElement = eventElement.querySelector(".event-date");

        if (dateElement) {
          const fullDateText = dateElement.textContent.trim(); // Szöveg lekérése és trimmelése
          console.log(`Found date text: ${fullDateText}`); // Ellenőrzés

          // Dátum feldolgozása: nap és hónap kivonása a szövegből
          const dateParts = fullDateText.split(" "); // ["2024", "Szeptember", "23.", "Szombat"]
          if (dateParts.length >= 3) {
            dateNumber = dateParts[2].replace(".", ""); // "23"
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

        eventTitle =
          eventElement.querySelector(".event-title")?.textContent.trim() || "";
        eventPrice =
          eventElement.querySelector(".price-range")?.textContent.trim() ||
          "INGYEN";

        const sliderElement = document.querySelector(".slider");
        if (sliderElement) {
          const slideImageElement = sliderElement.querySelector(".slide img");
          if (slideImageElement) {
            eventBackground = slideImageElement.src;
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
