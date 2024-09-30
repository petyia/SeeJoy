// JavaScript: Térképkezelés és helyszín keresés
document.addEventListener("DOMContentLoaded", function () {
  const mapButtons = [
    document.getElementById("map-button"),
    document.getElementById("map-button-alt"),
    document.getElementById("map-button-alt-2"),
    document.getElementById("map-button-alt-3"),
  ];
  const mapContainer = document.getElementById("map");
  const searchInput = document.getElementById("location-search");
  const searchSubmit = document.getElementById("search2-submit");

  let mapLoaded = false;
  let map;

  // Funkció a térkép betöltéséhez és helyzet megadásához
  function loadMap(latitude = 47.4979, longitude = 19.0402) {
    // Alapértelmezett: Budapest koordináták
    if (!mapLoaded) {
      mapContainer.style.display = "block";

      setTimeout(() => {
        map = L.map(mapContainer).setView([latitude, longitude], 12);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapLoaded = true;
      }, 100); // 100 ms késleltetés
    } else {
      // Térkép újratöltése
      if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        map.setView([latitude, longitude], 12);
        map.invalidateSize();
      } else {
        mapContainer.style.display = "none";
      }
    }
  }

  // Eseménykezelők mindkét gombhoz, Budapest koordinátákra visz
  mapButtons.forEach((button) => {
    button.addEventListener("click", function () {
      loadMap(47.4979, 19.0402); // Budapest koordináták
    });
  });

  searchSubmit.addEventListener("click", function () {
    const location = searchInput.value; // Beírt keresési helyszín lekérése
    if (location) {
      // API hívás a helyszín kereséséhez az OpenStreetMap Nominatim segítségével
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0]; // Kinyerjük a koordinátákat
            loadMap(parseFloat(lat), parseFloat(lon)); // Térkép középpontja a koordináták szerint
          } else {
            alert("Helyszín nem található."); // Ha nincs találat
          }
        })
        .catch((err) => {
          console.error("Hiba történt a keresés során:", err); // Hibakezelés
        });
    }
  });
});
