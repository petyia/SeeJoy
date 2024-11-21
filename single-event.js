document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventId"); // Esemény ID lekérése az URL-ből

  if (eventId) {
    console.log(`Esemény ID az URL-ben: ${eventId}`);

    // Előre definiált események adatai
    const eventsData = {
      1: {
        title: "Játszunk együtt a legnépszerűbb társasokkal",
        date: "2024 Október 16. Szerda",
        time: "17:00 - 21:00",
        postedTime: "16 órával ezelőtt",
        price: "Ingyenes",
        organizer: "Vágó András",
        organizerAvatar: "img/story6.webp", // Szervező képe
        taxInfo: "+0% Adók", // Tax információ
        description: `Csatlakozz hozzánk minden vasárnap egy szórakoztató napra, amikor klasszikus és jól ismert társasjátékokat játszunk! Hozd el versenyszellemedet és...`,
        fullDescription:
          "Csatlakozz hozzánk minden vasárnap egy szórakoztató napra, amikor klasszikus és jól ismert társasjátékokat játszunk! Hozd el versenyszellemedet és a stratégia iránti szeretetedet, mert kihívjuk egymást olyan játékokban, mint a Monopoly, a Scrabble és még sok más.",
        address: "Evergreen Park, 50. sugárút és 78. utca",
        images: ["img/event-date4.webp", "img/event-date4_1.webp"],
        video: "vid/tarsas.mp4",
        gallery: [
          {
            img: "img/gallery1 (1).webp",
            caption: "Jenga",
            description: "Játsszunk híres társasjátékokat!",
          },
          {
            img: "img/gallery1 (2).webp",
            caption: "Uno",
            description: "Játsszunk híres társasjátékokat!",
          },
          {
            img: "img/gallery1 (3).webp",
            caption: "Monopoly",
            description: "Játsszunk híres társasjátékokat!",
          },
        ],
      },
      2: {
        title: "Főzés: Hogyan készíts gyümölcskoktélokat",
        date: "2024 Október 20. Vasárnap",
        time: "18:00 - 20:00",
        price: "800 Ft",
        organizer: "Nagy Bogi",
        organizerAvatar: "img/story2.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description:
          "Gyere el, és tanulj meg különböző gyümölcskoktélokat készíteni...",
        fullDescription: `Gyere el, és tanulj meg különböző gyümölcskoktélokat készíteni. Hozd el barátaidat és élvezd a finom italokat, miközben új recepteket tanulsz.`,
        address: "Fruit Party Hall, 24. utca és 10. sugárút",
        images: ["img/cocktail-bg1.webp", "img/cocktail-bg2.webp"],
        video: "vid/cocktails.mp4",
        gallery: [
          {
            img: "img/cocktail3.webp",
            caption: "Mojito",
            description: "Frissítő koktél!",
          },
          {
            img: "img/cocktail2.webp",
            caption: "Számtalan koktél",
            description: "Sok más koktél",
          },
          {
            img: "img/cocktail1.webp",
            caption: "Együtt!",
            description: "Közös szórakozás együtt!",
          },
        ],
      },
      3: {
        title: "Kreatív Self-Care: Egyedi sminkek készítése",
        date: "2024 Október 27. Vasárnap",
        time: "Délelőtt 11:00-től",
        price: "2000 Ft",
        organizer: "Kén Gréti",
        organizerAvatar: "img/story7.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description: `Az esemény lehetőséget ad számodra, hogy felfedezd a sminkkészítés művészetét, miközben kifejezheted saját egyéniségedet. A workshop során megtanulhatod...`,
        fullDescription:
          "Az esemény lehetőséget ad számodra, hogy felfedezd a sminkkészítés művészetét, miközben kifejezheted saját egyéniségedet. A workshop során megtanulhatod, hogyan használhatod kreatívan a különböző sminktermékeket, hogy egyedi és stílusos megjelenést hozz létre. Tapasztalt oktatók vezetésével saját elképzeléseid szerint alkothatsz, miközben a self-care és a kreativitás fontosságát is hangsúlyozzuk. Csatlakozz, és tapasztald meg a sminkkészítés örömét egy inspiráló közösségben!",
        address: "Budapest, Kései utca 12.",
        images: [
          "img/makeup (5).webp",
          "img/makeup (1).webp",
          "img/makeup (3).webp",
        ],
        video: "vid/sminkes.mp4",
        gallery: [
          {
            img: "img/makeup (4).webp",
            caption: "Tapasztalt oktatóval",
            description: "Egyedi sminkek készítése",
          },
          {
            img: "img/makeup (2).webp",
            caption: "Saját egyedi ötleteiddel",
            description: "Egyedi sminkek készítése",
          },
          {
            img: "img/makeup (6).webp",
            caption: "Hatalmas sminkes palettával",
            description: "Egyedi sminkek készítése",
          },
        ],
      },
      4: {
        title: "Hőlékballonozás: 30 perc a levegőben",
        date: "2024 November 01. Péntek",
        time: "17:00 - 17:30",
        price: "7500 Ft",
        organizer: "Nándor Réka",
        organizerAvatar: "img/story5.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description:
          "Felejthetetlen élmények várnak rád, miközben a levegőben szállva csodálhatod meg a tájat. Ez a 30 perces kaland lehetőséget ad arra, hogy új szemszögből láthasd a világot, és...",
        fullDescription: `Felejthetetlen élmények várnak rád, miközben a levegőben szállva csodálhatod meg a tájat. Ez a 30 perces kaland lehetőséget ad arra, hogy új szemszögből láthasd a világot, és átélhesd a hőlékballonozás varázsát. A tapasztalt pilóták biztonságos környezetben kalauzolnak, így te csak élvezheted a lebegést és a panorámát. Csatlakozz hozzánk, és tapasztald meg a szabadság érzését a felhők között!`,
        address: "Érd, Mező utca 26.",
        images: ["img/hobal.webp"],
        video: "vid/holekball.mp4",
        gallery: [
          {
            img: "img/story-event6.webp",
            caption: "Utazás a felhők közé",
            description: "Hőlékballonozás: 30 perc a levegőben",
          },
          {
            img: "img/hobalg (2).webp",
            caption: "Profi szakemberekkel",
            description: "Hőlékballonozás: 30 perc a levegőben",
          },
          {
            img: "img/hobalg (1).webp",
            caption: "Együtt, minden korosztálynak!",
            description: "Hőlékballonozás: 30 perc a levegőben",
          },
        ],
      },
      5: {
        title: "Fotózás: Kezdő fotósoknak modell fotózás",
        date: "2024 Október 17. Csütörtök",
        time: "16:00 - 17:30",
        price: "3000 Ft",
        organizer: "Peter Nyoni",
        organizerAvatar: "img/story12.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description:
          "A tökéletes lehetőség számodra, hogy elsajátítsd a modell fotózás alapjait. Tapasztalt oktatók segítségével megtanulhatod, hogyan dolgozz modellekkel, miközben fejleszted technikai tudásodat a fények, kompozíciók és...",
        fullDescription: `A tökéletes lehetőség számodra, hogy elsajátítsd a modell fotózás alapjait. Tapasztalt oktatók segítségével megtanulhatod, hogyan dolgozz modellekkel, miközben fejleszted technikai tudásodat a fények, kompozíciók és pózok terén. Gyakorlat közben felfedezheted saját stílusodat, és izgalmas fotós pillanatokat örökíthetsz meg. Csatlakozz, és fedezd fel, hogyan alkothatsz magabiztosan a kamerán keresztül!`,
        address: "Budapest, Szabadság utca 98.",
        images: ["img/photog1.webp"],
        video: "vid/photoV.mp4",
        gallery: [
          {
            img: "img/story-event7.webp",
            caption: "Filmes tanulási lehetőség is",
            description: "Fotózás: Kezdő fotósoknak modell fotózás",
          },
          {
            img: "img/upcoming1.webp",
            caption: "Profi szakemberekkel",
            description: "Fotózás: Kezdő fotósoknak modell fotózás",
          },
          {
            img: "img/photoG2.webp",
            caption: "Magabiztos kamerahasználat",
            description: "Fotózás: Kezdő fotósoknak modell fotózás",
          },
        ],
      },
      6: {
        title: "Sörfesztivál: 100+ kézműves sör",
        date: "2024 Október 19. Szombat",
        time: "09:00 - 23:30",
        price: "800 Ft",
        organizer: "Lékó Panka",
        organizerAvatar: "img/story2.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description:
          "Fedezdd fel a legkülönlegesebb ízeket a sörvilágban. Több mint 100 kézműves sör közül válogathatsz, mindegyik saját egyedi karakterrel és aromával, amelyek...",
        fullDescription: `Fedezdd fel a legkülönlegesebb ízeket a sörvilágban. Több mint 100 kézműves sör közül válogathatsz, mindegyik saját egyedi karakterrel és aromával, amelyek garantáltan lenyűgöznek. Fedezd fel a helyi sörfőzdék remekeit, beszélgess a sörmesterekkel, és élvezd a baráti hangulatot egy igazi sörrajongó közösségben. Ez az esemény tökéletes alkalom, hogy új kedvenceket találj és felejthetetlen élményekkel gazdagodj!`,
        address: "Budapest, Otthon tér 1-12.",
        images: ["img/beerB1.webp"],
        video: "vid/beerV.mp4",
        gallery: [
          {
            img: "img/beerG1.webp",
            caption: "Sör minden mennyiségben",
            description: "Sörfesztivál: 100+ kézműves sör",
          },
          {
            img: "img/beerG2.webp",
            caption: "Jó társaság",
            description: "Sörfesztivál: 100+ kézműves sör",
          },
          {
            img: "img/beerG3.webp",
            caption: "Bulizva",
            description: "Sörfesztivál: 100+ kézműves sör",
          },
        ],
      },
      7: {
        title: "Techno Party: Felejthetetlen éjszaka",
        date: "2024 Október 18. Péntek",
        time: "22:00 - 04:00",
        price: "1200 Ft",
        organizer: "Kovács Kinga",
        organizerAvatar: "img/story1.webp", // Szervező képe
        taxInfo: "+27% Adók", // Tax információ
        description:
          "Egy éjszakára magával ragad a lüktető ütemek világa. Merülj el a techno zenében, ahol a legjobb DJ-k pörgetik a lemezeket, és a fények, valamint a hangzás teljesen új dimenzióba repít. Ez a buli lehetőséget ad, hogy kiszakadj a mindennapokból és...",
        fullDescription: `Egy éjszakára magával ragad a lüktető ütemek világa. Merülj el a techno zenében, ahol a legjobb DJ-k pörgetik a lemezeket, és a fények, valamint a hangzás teljesen új dimenzióba repít. Ez a buli lehetőséget ad, hogy kiszakadj a mindennapokból és átadd magad a ritmusnak, miközben új barátokat ismerhetsz meg egy energikus közösségben. Készülj fel egy éjszakára, amit soha nem felejtesz el!`,
        address: "Budapest, Árpád tér 2.",
        images: ["img/event-date3.webp"],
        video: "vid/technoV.mp4",
        gallery: [
          {
            img: "img/th1.webp",
            caption: "#retrocuccok",
            description: "Techno Party: Felejthetetlen éjszaka",
          },
          {
            img: "img/th2.webp",
            caption: "#agyadeldobod",
            description: "Techno Party: Felejthetetlen éjszaka",
          },
          {
            img: "img/th3.webp",
            caption: "#dj",
            description: "Techno Party: Felejthetetlen éjszaka",
          },
        ],
      },
    };

    const event = eventsData[eventId];
    if (event) {
      // Esemény adatok frissítése
      document.querySelector(".event-title").textContent = event.title;
      document.querySelector(".single-story-post-date").textContent =
        event.postedTime;
      document.querySelector(".event-date").textContent = event.date;
      document.querySelector(".event-time").textContent = event.time;
      document.querySelector(".price-range").textContent = event.price;
      document.querySelector(".event-money").textContent = event.price;
      document.querySelector(".event-money-2").textContent = event.taxInfo;
      document.querySelector(".tax-info").textContent = event.taxInfo; // Tax információ frissítése
      // Kiválasztja az összes olyan elemet, amely .organizer-name vagy .name-text osztályú
      const names = document.querySelectorAll(".organizer-name, .name-text");

      // Iterál az összes találaton, és beállítja a textContent értéket
      names.forEach((element) => {
        element.textContent = event.organizer;
      });

      // Dinamikusan beállítjuk az event ID-t a .event-card és .heart-icon elemekre
      const eventCard = document.querySelector(".event-card");
      const heartIcon = document.querySelector(".heart-icon");

      if (eventCard) {
        eventCard.setAttribute("data-event-id", eventId);
      }

      if (heartIcon) {
        heartIcon.setAttribute("data-event-id", eventId);
      }

      // Szervező képének frissítése
      const organizerAvatar = document.querySelector(".organizer-avatar");
      organizerAvatar.style.backgroundImage = `url(${event.organizerAvatar})`;

      document.querySelector(".event-about-text").textContent =
        event.description;
      document.querySelector(".event-address p").textContent = event.address;

      // "Továbbiak" gomb működése
      const aboutText = document.querySelector(".event-about-text");
      const toggleBtn = document.getElementById("toggle-text-btn");
      let isFullText = false;
      toggleBtn.addEventListener("click", function () {
        if (isFullText) {
          aboutText.textContent = event.description;
          toggleBtn.textContent = "Továbbiak";
        } else {
          aboutText.textContent = event.fullDescription;
          toggleBtn.textContent = "Kevesebb";
        }
        isFullText = !isFullText;
      });

      // Slider képek frissítése (képek és videó)
      const slider = document.querySelector(".slider");
      slider.innerHTML = ""; // Töröljük az alapértelmezett tartalmat

      // Képek hozzáadása a sliderhez
      event.images.forEach((imageSrc) => {
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("slide");
        slideDiv.innerHTML = `<img src="${imageSrc}" alt="Esemény kép" />`;
        slider.appendChild(slideDiv);
      });

      // Videó hozzáadása a sliderhez
      const videoSlide = document.createElement("div");
      videoSlide.classList.add("slide");
      videoSlide.innerHTML = `
        <video autoplay muted loop>
          <source src="${event.video}" type="video/mp4" />
          A böngésződ nem támogatja a videót.
        </video>
      `;
      slider.appendChild(videoSlide);

      // Slider pontok (dots) létrehozása (képek + videó)
      const dotsContainer = document.querySelector(".dots-container");
      dotsContainer.innerHTML = ""; // Töröljük az alapértelmezett pontokat
      const totalSlides = event.images.length + 1; // Képek + videó
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => currentSlide(i + 1));
        dotsContainer.appendChild(dot);
      }

      // Slider inicializálása
      let slideIndex = 1;
      showSlides(slideIndex);

      function showSlides(n) {
        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".dot");

        if (n > slides.length) {
          slideIndex = 1;
        }
        if (n < 1) {
          slideIndex = slides.length;
        }

        // Minden képet elrejtünk
        slides.forEach((slide) => (slide.style.display = "none"));

        // Minden pont aktív állapotát töröljük
        dots.forEach((dot) => dot.classList.remove("active"));

        // Az aktuális képet és pontot megjelenítjük
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
      }

      // Funkciók a képek váltásához
      function plusSlides(n) {
        showSlides((slideIndex += n));
      }

      function currentSlide(n) {
        showSlides((slideIndex = n));
      }

      // Húzás funkció a sliderhez
      let startX = 0;
      slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });

      slider.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX) {
          plusSlides(1); // Húzás balra (következő kép)
        } else {
          plusSlides(-1); // Húzás jobbra (előző kép)
        }
      });

      // Pontokra (dots) kattintás
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
      });

      // Videó megnézése gomb működésének hozzáadása
      const watchVideoButton = document.querySelector(".watch-video");
      if (watchVideoButton) {
        watchVideoButton.addEventListener("click", () => {
          currentSlide(totalSlides); // A videó a legutolsó slide
        });
      }

      // Galéria frissítése
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""; // Galéria kiürítése
      event.gallery.forEach((item) => {
        const figure = document.createElement("figure");
        figure.innerHTML = `
          <img src="${item.img}" alt="${item.caption}" />
          <figcaption>
            ${item.caption}
            <small>${item.description}</small>
          </figcaption>
        `;
        gallery.appendChild(figure);
      });
    } else {
      console.error(`Nem található esemény az eventId: ${eventId} alapján.`);
    }
  } else {
    console.error("Nincs esemény ID az URL-ben.");
  }

  // Galéria PopUp funkciók megtartása
  const popup = {
    init: function () {
      const figures = document.querySelectorAll("figure");
      if (figures.length > 0) {
        figures.forEach((figure) => {
          figure.addEventListener("click", function () {
            popup.open(figure);
          });
        });
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
      const gallery = document.querySelector(".gallery");
      gallery.classList.add("pop");

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

  // Változó a menü megnyitásához és bezárásához
  const menuButton = document.querySelector(".edit-profile-icon");
  const menu = document.querySelector(".single-event-options-menu");

  // Gomb kattintásra megnyitjuk vagy bezárjuk a menüt
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Megakadályozza, hogy a kattintás a dokumentumra is átmenjen
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  });

  // Ha a dokumentum más területére kattintanak, bezárja a menüt
  document.addEventListener("click", function (event) {
    if (
      menu.style.display === "block" &&
      !menu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      menu.style.display = "none";
    }
  });
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

// Back navigation
document.querySelector(".go-back-icon").addEventListener("click", function () {
  const pageData = JSON.parse(sessionStorage.getItem("pageData"));

  if (pageData) {
    if (pageData.source === "index") {
      window.location.href = "index.html";
    } else if (pageData.source === "events") {
      window.location.href = "events.html";
    } else if (pageData.source === "tickets") {
      window.location.href = "tickets.html";
    }
  } else {
    history.back();
  }
});
