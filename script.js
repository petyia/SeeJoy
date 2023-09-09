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
  // Add an event listener to the radio buttons
  const radioButtons = document.querySelectorAll(
    '.nav-item input[type="radio"]'
  );

  // Function to update background color
  function updateBackgroundColor() {
    // Remove the background color from all divs
    document.querySelectorAll(".nav-item").forEach((div) => {
      div.style.backgroundColor = "";
    });

    // Add the background color to the selected div
    if (this.checked) {
      this.parentElement.style.backgroundColor = "#ff5483";
    }
  }

  // Initially set the background color based on the checked radio button
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", updateBackgroundColor);

    // Check the radio button initially
    if (radioButton.checked) {
      updateBackgroundColor.call(radioButton);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the radio buttons
  const radioButtons = document.querySelectorAll(
    '.nav-item input[type="radio"]'
  );

  // Function to update content and color
  function updateContentAndColor() {
    // Remove the content and change color for all ::before pseudo-elements
    document
      .querySelectorAll(".nav-item label::before")
      .forEach((pseudoElement) => {
        pseudoElement.textContent = ""; // Clear existing content
        pseudoElement.style.color = ""; // Clear existing color
      });

    // Add the content and change color to white for the selected ::before pseudo-element
    if (this.checked) {
      const pseudoElement =
        this.nextElementSibling.querySelector("label::before");
      pseudoElement.textContent = "\f015"; // Set the desired content
      pseudoElement.style.color = "white"; // Set the color to white
    }
  }

  // Initially set the content and color based on the checked radio button
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", updateContentAndColor);

    // Check the radio button initially
    if (radioButton.checked) {
      updateContentAndColor.call(radioButton);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the radio buttons
  const radioButtons = document.querySelectorAll(
    '.nav-item input[type="radio"]'
  );

  // Function to update color
  function updateColor() {
    // Set the color to black for all ::before pseudo-elements by default
    document
      .querySelectorAll(".nav-item label::before")
      .forEach((pseudoElement) => {
        pseudoElement.style.color = "black"; // Default color
      });

    // Add the color to white for the selected ::before pseudo-element
    if (this.checked) {
      const pseudoElement =
        this.nextElementSibling.querySelector("label::before");
      pseudoElement.style.color = "white"; // Set the color to white
    }
  }

  // Initially set the color based on the checked radio button
  radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", updateColor);

    // Check the radio button initially
    if (radioButton.checked) {
      updateColor.call(radioButton);
    }
  });
});
