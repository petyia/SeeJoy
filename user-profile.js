// Követés gomb eseménykezelő
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

// Vissza gomb eseménykezelő
document.querySelector(".go-back-icon").addEventListener("click", function () {
  history.back();
});

// URL paraméterek feldolgozása
const urlParams = new URLSearchParams(window.location.search);
const userProfileId = urlParams.get("userProfileId");

// Előre definiált események adatai
const userProfileData = {
  1: {
    title: "Játszunk együtt a legnépszerűbb társasokkal!",
    date: "2024 Október 3.",
    time: "17:00-től",
    price: "Ingyen",
    organizer: "Vágó András",
    organizerUserName: "@vagiandri",
    organizerAvatar: "img/story6.webp",
    organizerEventsNumber: "1",
    organizerFollowingNumber: "12",
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
    organizerAvatar: "img/story2.webp",
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
    organizerEventsNumber: "2",
    organizerFollowingNumber: "35",
    organizerAvatar: "img/story7.webp",
    mediaList: [
      { url: "vid/sminkes.mp4", type: "video" },
      { url: "img/makeup (5).webp", type: "image" },
      { url: "img/makeup (3).webp", type: "image" },
      { url: "img/makeup (1).webp", type: "image" },
    ],
  },
};

// Profil adatok betöltése
if (userProfileId) {
  const userProfile = userProfileData[userProfileId];
  if (userProfile) {
    // Profil kép
    document.querySelector(".user-profile-img").src =
      userProfile.organizerAvatar;

    // Felhasználó adatai
    document.querySelector(".name-text").textContent = userProfile.organizer;
    document.querySelector(".user-name").textContent =
      userProfile.organizerUserName;

    // Statisztikák
    document.querySelector(".numbers-profile").textContent =
      userProfile.organizerEventsNumber || "0";
    document.querySelector(".numbers-profile2").textContent =
      userProfile.organizerFollowingNumber || "0";

    // Egyéb szükséges DOM műveletek...
  } else {
    console.error("A megadott ID-hez nem található adat.");
    alert("A keresett profil nem található.");
  }
} else {
  console.error("Nincs megadott ID az URL-ben.");
  alert("Hiba történt, próbálja újra később.");
}
