// For card 1
const card1 = document.getElementById("card1");
const heartIcon1 = card1.querySelector(".heart-icon");
const filledHeartIcon1 = heartIcon1.querySelector(".popular-heart-icon-filled");
const unfilledHeartIcon1 = heartIcon1.querySelector(".popular-heart-icon");
let isFilled1 = false;

filledHeartIcon1.style.display = "none"; // Initially hide the filled icon

heartIcon1.addEventListener("click", () => {
  isFilled1 = !isFilled1;

  if (isFilled1) {
    filledHeartIcon1.style.display = "inline-block";
    unfilledHeartIcon1.style.display = "none";
  } else {
    filledHeartIcon1.style.display = "none";
    unfilledHeartIcon1.style.display = "inline-block";
  }
});

// For card 2
const card2 = document.getElementById("card2");
const heartIcon2 = card2.querySelector(".heart-icon");
const filledHeartIcon2 = heartIcon2.querySelector(".popular-heart-icon-filled");
const unfilledHeartIcon2 = heartIcon2.querySelector(".popular-heart-icon");
let isFilled2 = false;

filledHeartIcon2.style.display = "none"; // Initially hide the filled icon

heartIcon2.addEventListener("click", () => {
  isFilled2 = !isFilled2;

  if (isFilled2) {
    filledHeartIcon2.style.display = "inline-block";
    unfilledHeartIcon2.style.display = "none";
  } else {
    filledHeartIcon2.style.display = "none";
    unfilledHeartIcon2.style.display = "inline-block";
  }
});

// For card 3
const card3 = document.getElementById("card3");
const heartIcon3 = card3.querySelector(".heart-icon");
const filledHeartIcon3 = heartIcon3.querySelector(".popular-heart-icon-filled");
const unfilledHeartIcon3 = heartIcon3.querySelector(".popular-heart-icon");
let isFilled3 = false;

filledHeartIcon3.style.display = "none"; // Initially hide the filled icon

heartIcon3.addEventListener("click", () => {
  isFilled3 = !isFilled3;

  if (isFilled3) {
    filledHeartIcon3.style.display = "inline-block";
    unfilledHeartIcon3.style.display = "none";
  } else {
    filledHeartIcon3.style.display = "none";
    unfilledHeartIcon3.style.display = "inline-block";
  }
});

// For card 4
const card4 = document.getElementById("card4");
const heartIcon4 = card4.querySelector(".heart-icon");
const filledHeartIcon4 = heartIcon4.querySelector(".popular-heart-icon-filled");
const unfilledHeartIcon4 = heartIcon4.querySelector(".popular-heart-icon");
let isFilled4 = false;

filledHeartIcon4.style.display = "none"; // Initially hide the filled icon

heartIcon4.addEventListener("click", () => {
  isFilled4 = !isFilled4;

  if (isFilled4) {
    filledHeartIcon4.style.display = "inline-block";
    unfilledHeartIcon4.style.display = "none";
  } else {
    filledHeartIcon4.style.display = "none";
    unfilledHeartIcon4.style.display = "inline-block";
  }
});
