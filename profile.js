// JavaScript to handle follow button click
document
  .querySelector(".follow-button-with-long-class")
  .addEventListener("click", function () {
    const followButton = this;
    if (followButton.classList.contains("active")) {
      followButton.textContent = "+ Követés";
      followButton.classList.remove("active");
    } else {
      followButton.textContent = "✔ Követed";
      followButton.classList.add("active");
    }
  });
