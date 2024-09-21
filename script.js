// Sticky navigation

// const sectionHeroEl = document.querySelector(".hero-section");

// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);

//     if (ent.isIntersecting === false) {
//       document.body.classList.add("sticky");
//     }

//     if (ent.isIntersecting === true) {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     // In the viewport
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );
// obs.observe(sectionHeroEl);

// document.addEventListener("DOMContentLoaded", function () {
//   // Add an event listener to the radio buttons
//   const radioButtons = document.querySelectorAll(
//     '.nav-item input[type="radio"]'
//   );
//   radioButtons.forEach((radioButton) => {
//     radioButton.addEventListener("change", function () {
//       // Remove the background color from all divs
//       document.querySelectorAll(".nav-item").forEach((div) => {
//         div.style.backgroundColor = "";
//       });

//       // Add the background color to the selected div
//       if (this.checked) {
//         this.parentElement.style.backgroundColor = "#ff5483";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const radioButtons = document.querySelectorAll(
    '.nav-item input[type="radio"]'
  );

  function updateStyles() {
    // Remove existing styles from all nav items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.style.backgroundColor = ""; // Reset background color
      item.querySelector("label").style.color = "black"; // Reset label color
    });

    // Apply styles to the selected nav item
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        const navItem = radioButton.parentElement;
        navItem.style.backgroundColor = "#ff5483"; // Set background color

        // Update pseudo-element content and color
        const label = navItem.querySelector("label");
        label.style.color = "white"; // Set label color
        label.textContent = "\f015"; // Set icon content for the selected item
      }
    });
  }

  // Add event listeners to radio buttons
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", updateStyles);

    // Apply styles initially if the radio button is already checked
    if (radioButton.checked) {
      updateStyles();
    }
  });
});

//Profilkép sub-menu

let subMenu = document.getElementById("subMenu");

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

//Notification sub-menu

let subMenuNoti = document.getElementById("subMenuNoti");

function toggleMenuNoti() {
  subMenuNoti.classList.toggle("open-menu-noti");

  const bellIcon = document.getElementById("bell-icon");

  // Check the current fill attribute value
  if (bellIcon.getAttribute("fill") === "none") {
    // Change the fill attribute to "filled" when it's empty
    bellIcon.setAttribute("fill", "filled");
  } else {
    // Change the fill attribute to "none" when it's filled
    bellIcon.setAttribute("fill", "none");
  }
}

//Notification fill

//Search bar
document.addEventListener("touchstart", function () {}, true);

document.querySelectorAll(".my-category-checked").forEach((button) => {
  button.addEventListener("click", function () {
    // Az aktuális gombhoz tartozó ID
    const idToRemove = this.getAttribute("data-id");

    // Az elem eltávolítása
    const elementToRemove = document.querySelector(
      `.my-category-flex-container#${idToRemove}`
    );
    if (elementToRemove) {
      elementToRemove.remove();
    }

    // Ellenőrzés, hogy maradt-e még .my-category-flex-container a .my-category-container-ben
    const container = document.querySelector(".my-category-container");
    if (
      container &&
      container.querySelectorAll(".my-category-flex-container").length === 0
    ) {
      container.remove();
    }
  });

  document.querySelectorAll(".popular-link").forEach((link) => {
    link.addEventListener("click", function () {
      // Mentjük a 'pageData' kulcs alá az URL-t és az oldal nevét
      sessionStorage.setItem(
        "pageData",
        JSON.stringify({
          url: window.location.href,
          source: "index",
        })
      );
    });
  });
});
