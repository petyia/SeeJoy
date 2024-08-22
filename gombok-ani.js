document
  .getElementById("fa-calendar-days-cat")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    this.classList.add("button-animation");

    // Eltávolítjuk az animációs class-t 0.4 másodperc múlva, hogy az animáció újra elérhető legyen
    setTimeout(() => this.classList.remove("button-animation"), 400);
  });
