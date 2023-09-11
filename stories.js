// const storiesLine = document.getElementById("stories-line");
// let isDragging = false;
// let startPositionX = 0;
// let scrollLeft = 0;

// storiesLine.addEventListener("mousedown", (e) => {
//   isDragging = true;
//   startPositionX = e.clientX;
//   scrollLeft = storiesLine.scrollLeft;

//   storiesLine.style.cursor = "grabbing";
//   storiesLine.style.userSelect = "none";
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isDragging) return;

//   const deltaX = e.clientX - startPositionX;
//   storiesLine.scrollLeft = scrollLeft - deltaX;
// });

// document.addEventListener("mouseup", () => {
//   isDragging = false;
//   storiesLine.style.cursor = "grab";
//   storiesLine.style.userSelect = "auto";
// });

// document.addEventListener("mouseleave", () => {
//   if (isDragging) {
//     isDragging = false;
//     storiesLine.style.cursor = "grab";
//     storiesLine.style.userSelect = "auto";
//   }
// });
