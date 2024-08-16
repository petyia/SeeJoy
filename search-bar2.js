// document.addEventListener("DOMContentLoaded", function () {
//   function checkScreenWidth() {
//     var existingHeaderProfile = document.querySelector("#head3");
//     if (window.innerWidth <= 693) {
//       // Ellenőrzi, hogy az új div létezik-e már
//       if (!existingHeaderProfile) {
//         // Új div elem létrehozása
//         var headerProfileDiv = document.createElement("div");
//         headerProfileDiv.className = "header-profile"; // Frissített osztálynév
//         headerProfileDiv.id = "head3";

//         // Új form elem létrehozása
//         var form = document.createElement("form");
//         form.className = "search-bar2";
//         form.action = "";

//         // Új input elem létrehozása
//         var input = document.createElement("input");
//         input.type = "search";
//         input.name = "search";
//         input.pattern = ".*\\S.*"; // Megfelel az HTML5 validációs mintának
//         input.required = true;

//         // Új button elem létrehozása
//         var button = document.createElement("button");
//         button.className = "search-btn";
//         button.type = "submit";

//         // Új span elem létrehozása
//         var span = document.createElement("span");
//         span.textContent = "Search";

//         // Az elemek összeállítása
//         button.appendChild(span);
//         form.appendChild(input);
//         form.appendChild(button);

//         // Az új form elem beszúrása az új div-be
//         headerProfileDiv.appendChild(form);

//         // Az új div beszúrása a header-right-end div alá
//         var headerRightEnd = document.querySelector(".header-right-end");
//         if (headerRightEnd) {
//           headerRightEnd.appendChild(headerProfileDiv);
//         }
//       }
//     } else {
//       // Ha a képernyő szélessége nagyobb, eltávolítja az elemet, ha létezik
//       if (existingHeaderProfile) {
//         existingHeaderProfile.remove();
//       }
//     }
//   }

//   // Az eseménykezelők regisztrálása
//   checkScreenWidth();
//   window.addEventListener("resize", checkScreenWidth);
// });
