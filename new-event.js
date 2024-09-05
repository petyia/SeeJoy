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
