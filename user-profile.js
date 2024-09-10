// JavaScript to handle follow button click
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

// Add event listener for the "go-back" button
document.querySelector(".go-back-icon").addEventListener("click", function () {
  history.back(); // This will also navigate back to the previous page
});
