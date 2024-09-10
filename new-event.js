document.addEventListener("DOMContentLoaded", function () {
  const mainUploadArea = document.getElementById("main-upload");
  const thumbnailBoxes = document.querySelectorAll(".thumbnail-box");

  // Simuláció a fájl feltöltési funkcióra
  mainUploadArea.addEventListener("click", function () {
    alert("Main image upload clicked!");
    // Itt lehet egy file input elemet megjeleníteni, vagy fájl kezelést hozzáadni
  });

  thumbnailBoxes.forEach(function (box) {
    box.addEventListener("click", function () {
      alert("Thumbnail upload clicked!");
      // Ugyanígy lehet thumbnail feltöltés funkciókat is kezelni
    });
  });
});

// Add event listener for the "close" icon
document
  .querySelector(".new-close-icon")
  .addEventListener("click", function () {
    history.back(); // This will navigate back to the previous page
  });

// Add event listener for the "back" button
document.querySelector(".back-button").addEventListener("click", function () {
  history.back(); // This will also navigate back to the previous page
});
