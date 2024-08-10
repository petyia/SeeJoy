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

//Clicked
document.addEventListener("DOMContentLoaded", function () {
  const eventsDates = document.querySelectorAll(".events-date");

  eventsDates.forEach((date) => {
    date.addEventListener("click", function () {
      // Eltávolítja a 'clicked' osztályt az összes 'events-date' elemből
      eventsDates.forEach((d) => d.classList.remove("clicked"));

      // Hozzáadja a 'clicked' osztályt a kattintott elemhez
      this.classList.add("clicked");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const catSectionDate = document.querySelector(".event-mini-date");
  const scrollRightCatButton2 = document.querySelector(".scroll-right-cat2");
  const scrollLeftCatButton2 = document.querySelector(".scroll-left-cat2");
  const leftArrowContainer2 = document.querySelector(".cat-left-arrow2");
  const rightArrowButton2 = document.getElementById("fa-chevron-right-cat2");
  const eventDateSection = document.querySelector(".event-date-section");

  if (
    !catSectionDate ||
    !scrollRightCatButton2 ||
    !scrollLeftCatButton2 ||
    !leftArrowContainer2 ||
    !rightArrowButton2 ||
    !eventDateSection
  ) {
    console.error("Nem találhatóak az elemek!");
    return;
  }

  function updateArrowVisibility() {
    const scrollLeft = catSectionDate.scrollLeft;
    const scrollWidth = catSectionDate.scrollWidth;
    const clientWidth = catSectionDate.clientWidth;

    leftArrowContainer2.style.display = scrollLeft > 0 ? "block" : "none";
    rightArrowButton2.style.display =
      scrollLeft < scrollWidth - clientWidth ? "block" : "none";
  }

  scrollRightCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(updateArrowVisibility, 300);
  });

  scrollLeftCatButton2.addEventListener("click", () => {
    catSectionDate.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(updateArrowVisibility, 300);
  });

  catSectionDate.addEventListener("scroll", updateArrowVisibility);
  updateArrowVisibility();

  // Az events-date elemek kattintásának kezelése
  const eventsDates = document.querySelectorAll(".events-date");

  eventsDates.forEach((date) => {
    date.addEventListener("click", function () {
      // Eltávolítjuk a 'clicked' osztályt az összes 'events-date' elemből
      eventsDates.forEach((d) => d.classList.remove("clicked"));

      // Hozzáadjuk a 'clicked' osztályt a kattintott elemhez
      this.classList.add("clicked");

      // Ellenőrizzük, hogy a kattintott elem ID-ja megfelel-e
      if (this.id === "date20240811") {
        // Megjelenítjük az upcoming-section-t animáltan
        eventDateSection.classList.add("visible");
      } else {
        // Elrejthetjük az upcoming-section-t, ha más elemre kattintanak
        eventDateSection.classList.remove("visible");
      }
    });
  });
});
