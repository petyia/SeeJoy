document.addEventListener("DOMContentLoaded", function () {
  const aboutText = document.getElementById("about-text");
  const toggleBtn = document.getElementById("toggle-text-btn");

  const fullText = `Csatlakozz hozzánk minden vasárnap egy szórakoztató napra,
                amikor klasszikus és jól ismert társasjátékokat játszunk! Hozd
                el versenyszellemedet és a stratégia iránti szeretetedet, mert
                kihívjuk egymást olyan játékokban, mint a Monopoly, a Scrabble
                és még sok más. Ez egy remek lehetőség arra, hogy új emberekkel
                találkozz, fejleszd társasjáték-tudásodat, és élvezd a
                barátságos versengést! Hozhatsz saját társasjátékokat és
                rágcsálnivalókat is.`;

  const shortText = `Csatlakozz hozzánk minden vasárnap egy szórakoztató napra,
                amikor klasszikus és jól ismert társasjátékokat játszunk! Hozd
                el versenyszellemedet és a stratégia iránti szeretetedet, mert
                kihívjuk egymást olyan játékokban, mint a Monopoly...`;

  let isFullText = false;

  // Alapértelmezett szöveg (rövid)
  aboutText.textContent = shortText;

  toggleBtn.addEventListener("click", function () {
    if (isFullText) {
      aboutText.textContent = shortText;
      toggleBtn.textContent = "Továbbiak";
    } else {
      aboutText.textContent = fullText;
      toggleBtn.textContent = "Kevesebb";
    }
    isFullText = !isFullText;
  });

  // //Slider
  // let slideIndex = 1;
  // let slides = document.querySelectorAll(".slide");
  // let dots = document.querySelectorAll(".dot");

  // if (slides.length > 0 && dots.length > 0) {
  //   showSlides(slideIndex);

  //   // Next/previous controls
  //   function plusSlides(n) {
  //     showSlides((slideIndex += n));
  //   }

  //   // Thumbnail image controls
  //   function currentSlide(n) {
  //     showSlides((slideIndex = n));
  //   }

  //   function showSlides(n) {
  //     if (n > slides.length) {
  //       slideIndex = 1;
  //     }
  //     if (n < 1) {
  //       slideIndex = slides.length;
  //     }

  //     // Hide all slides
  //     slides.forEach((slide) => {
  //       slide.style.display = "none";
  //     });

  //     // Remove active class from all dots
  //     dots.forEach((dot) => {
  //       dot.classList.remove("active");
  //     });

  //     // Show the current slide and activate the corresponding dot
  //     slides[slideIndex - 1].style.display = "block";
  //     dots[slideIndex - 1].classList.add("active");
  //   }

  //   // Add event listeners for the dots
  //   dots.forEach((dot, index) => {
  //     dot.addEventListener("click", () => {
  //       currentSlide(index + 1);
  //     });
  //   });

  //   // Swipe functionality
  //   let startX = 0;
  //   const slider = document.querySelector(".slider");

  //   if (slider) {
  //     slider.addEventListener("touchstart", (e) => {
  //       startX = e.touches[0].clientX;
  //     });

  //     slider.addEventListener("touchend", (e) => {
  //       let endX = e.changedTouches[0].clientX;
  //       if (startX > endX) {
  //         plusSlides(1); // Swipe left
  //       } else {
  //         plusSlides(-1); // Swipe right
  //       }
  //     });
  //   }
  // } else {
  //   console.error("Slider elements not found");
  // }

  //Galéria PopUp
  const popup = {
    init: function () {
      const figures = document.querySelectorAll("figure");
      if (figures.length > 0) {
        figures.forEach((figure) => {
          figure.addEventListener("click", function () {
            popup.open(figure);
          });
        });
      } else {
        console.error("No figure elements found in the gallery for popup.");
      }

      document.addEventListener("click", function (event) {
        if (event.target.closest(".popup img")) {
          return false; // Ha az img-re kattintanak, ne zárjuk be
        }
        if (event.target.closest(".popup")) {
          popup.close();
        }
      });
    },
    open: function (figure) {
      document.querySelector(".gallery").classList.add("pop");
      const popupEl = document.createElement("div");
      popupEl.classList.add("popup");
      document.body.appendChild(popupEl);

      const clonedFigure = figure.cloneNode(true);
      popupEl.appendChild(clonedFigure);

      const bg = document.createElement("div");
      bg.classList.add("bg");
      popupEl.appendChild(bg);

      const close = document.createElement("div");
      close.classList.add("close");
      close.innerHTML = '<svg><use xlink:href="#close"></use></svg>';
      clonedFigure.appendChild(close);

      const shadow = document.createElement("div");
      shadow.classList.add("shadow");
      clonedFigure.appendChild(shadow);

      const src = clonedFigure.querySelector("img").getAttribute("src");
      shadow.style.backgroundImage = `url(${src})`;
      bg.style.backgroundImage = `url(${src})`;

      setTimeout(function () {
        popupEl.classList.add("pop");
      }, 10);
    },
    close: function () {
      const gallery = document.querySelector(".gallery");
      const popup = document.querySelector(".popup");

      if (popup) {
        gallery.classList.remove("pop");
        popup.classList.remove("pop");
        setTimeout(function () {
          popup.remove();
        }, 100);
      }
    },
  };

  popup.init();
});

// JavaScript to handle follow button click
document.querySelector(".follow-button").addEventListener("click", function () {
  const followButton = this;
  if (followButton.classList.contains("active")) {
    followButton.innerHTML = "Követés";
    followButton.classList.remove("active");
  } else {
    followButton.innerHTML = "Követed";
    followButton.classList.add("active");
  }
});

document.querySelector(".go-back-icon").addEventListener("click", function () {
  // Lekérjük a tárolt oldalinformációkat
  const pageData = JSON.parse(sessionStorage.getItem("pageData"));

  if (pageData) {
    // Ellenőrizzük, honnan jött a felhasználó, és az alapján navigálunk vissza
    if (pageData.source === "index") {
      window.location.href = "index.html"; // Vissza az index oldalra
    } else if (pageData.source === "events") {
      window.location.href = "events.html"; // Vissza az events oldalra
    }
  } else {
    history.back(); // Ha nincs elmentett adat, akkor normál visszalépés
  }
});
