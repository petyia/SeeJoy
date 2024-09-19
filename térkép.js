document.addEventListener("DOMContentLoaded", function () {
  const mapButtons = [
    document.getElementById("map-button"),
    document.getElementById("map-button-alt"),
    document.getElementById("map-button-alt-2"),
    document.getElementById("map-button-alt-3"),
  ];
  const mapContainer = document.getElementById("map");
  let mapLoaded = false;
  let map;

  // Funkció a térkép betöltéséhez
  function loadMap() {
    if (!mapLoaded) {
      mapContainer.style.display = "block";

      setTimeout(() => {
        map = L.map(mapContainer).setView([47.4979, 19.0402], 12); // Budapest coordinates

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        mapLoaded = true;
      }, 100); // 100 ms delay
    } else {
      // Toggle map visibility
      if (mapContainer.style.display === "none") {
        mapContainer.style.display = "block";
        map.invalidateSize();
      } else {
        mapContainer.style.display = "none";
      }
    }
  }

  // Eseménykezelők mindkét gombhoz
  mapButtons.forEach((button) => {
    button.addEventListener("click", loadMap);
  });
});
