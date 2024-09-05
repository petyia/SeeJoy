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
});

//Slider
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show the current slide and activate the corresponding dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

// Swipe functionality
let startX = 0;

const slider = document.querySelector(".slider");
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX > endX) {
    plusSlides(1); // Swipe left
  } else {
    plusSlides(-1); // Swipe right
  }
});
