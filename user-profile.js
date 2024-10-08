// JavaScript to handle follow button click
document
  .querySelector(".follow-button-with-long-class")
  .addEventListener("click", function () {
    const followButton = this;
    if (followButton.classList.contains("active")) {
      followButton.innerHTML = '<i class="fa-solid fa-plus"></i> Követés';
      followButton.classList.remove("active");
    } else {
      followButton.innerHTML = '<i class="fa-solid fa-check"></i> Követed';
      followButton.classList.add("active");
    }
  });

// Add event listener for the "go-back" button
document.querySelector(".go-back-icon").addEventListener("click", function () {
  history.back(); // This will also navigate back to the previous page
});

// URL paraméterek lekérdezése
const urlParams = new URLSearchParams(window.location.search);
const userProfileId = urlParams.get("userProfileId"); // userProfile ID-t kiolvassuk az URL-ből

if (userProfileId) {
  // Előre definiált események adatai
  const userProfileData = {
    1: {
      title: "Játszunk együtt a legnépszerűbb társasokkal!",
      date: "2024 Október 3.",
      time: "17:00-től",
      price: "Ingyen",
      organizer: "Vágó András",
      organizerUserName: "@vagiandri",
      organizerAvatar: "img/story6.webp", // Szervező képe
      mediaList: [
        { url: "img/story-event1.webp", type: "image" },
        { url: "img/e-d1-2.webp", type: "image" },
        { url: "vid/tarsas.mp4", type: "video" },
      ],
    },
    2: {
      title: "Főzés: Hogyan készíts gyümölcskoktélokat",
      date: "2024 Október 08.",
      time: "18:00-től",
      price: "800 Ft",
      organizer: "Nagy Bogi",
      organizerUserName: "@nagybogi",
      organizerEventsNumber: "1",
      organizerFollowingNumber: "22",
      organizerAvatar: "img/story2.webp", // Szervező képe
      mediaList: [
        { url: "img/cocktail-bg1.webp", type: "image" },
        { url: "img/cocktail-bg2.webp", type: "image" },
        { url: "vid/cocktails.mp4", type: "video" },
      ],
    },
    3: {
      title: "Kreatív Self-Care: Egyedi sminkek készítése",
      date: "2024 Október 13. Vasárnap",
      time: "Délelőtt 11:00-től",
      price: "2000 Ft",
      organizer: "Kén Gréti",
      organizerUserName: "@k.greti",
      organizerAvatar: "img/story7.webp", // Szervező képe
      mediaList: [
        { url: "vid/sminkes.mp4", type: "video" },
        { url: "img/makeup (5).webp", type: "image" },
        { url: "img/makeup (3).webp", type: "image" },
        { url: "img/makeup (1).webp", type: "image" },
      ],
    },
  };

  const userProfile = userProfileData[userProfileId];
  if (userProfile) {
    // DOM elemek frissítése a történet részleteivel
    document.querySelector(".name-text").textContent = userProfile.organizer;
    document.querySelector(".numbers-profile").textContent =
      userProfile.organizerEventsNumber;
    document.querySelector(".numbers-profile2").textContent =
      userProfile.organizerFollowingNumber;
    document.querySelector(".user-name").textContent =
      userProfile.organizerUserName;

    // Szervező képének frissítése
    const organizerAvatar = document.querySelector(".user-profile-img");
    organizerAvatar.src = userProfile.organizerAvatar; // Kép forrásának beállítása
  } else {
    console.error("Történet nem található.");
  }
} else {
  console.error("Nincs történet ID az URL-ben.");
}
