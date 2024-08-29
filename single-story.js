// Eseménydelegálás a like gombokra
document.body.addEventListener("click", function (event) {
  if (
    event.target.matches(".like__btn") ||
    event.target.closest(".like__btn")
  ) {
    const likeBtn = event.target.matches(".like__btn")
      ? event.target
      : event.target.closest(".like__btn");
    const likeIcon = likeBtn.querySelector("#like-icon");
    const likeCount = likeBtn.querySelector("#like-count");

    let clickedLike = likeBtn.dataset.clickedLike === "true";
    if (!clickedLike) {
      likeBtn.dataset.clickedLike = "true";
      likeIcon.innerHTML = `<i class="fa-solid fa-heart" style="color: var(--primary);"></i>`;
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
    } else {
      likeBtn.dataset.clickedLike = "false";
      likeIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
  }
});

// Komment hozzáadása
document.getElementById("postComment").addEventListener("click", function () {
  const commentText = document.getElementById("newCommentText").value.trim();
  if (commentText) {
    const commentsList = document.querySelector(".comments-list");

    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `
      <div class="comment-header">
        <img src="https://via.placeholder.com/40" alt="Avatar" class="comment-avatar">
        <div class="comment-texts">
          <span class="comment-author">New User</span>
          <p class="comment-text">${commentText}</p>
        </div>
      </div>
      <div class="like-btn-container">
        <button class="like__btn" data-clicked-like="false">
            <span id="like-icon">
              <i class="fa-regular fa-heart"></i>
            </span>
            <span id="like-count">0</span>
        </button>
      </div>
    `;

    commentsList.appendChild(newComment);
    document.getElementById("newCommentText").value = "";
  }
});

// Komment szekció kezelése
const commentBtn = document.querySelector(".comment__btn");
const commentsSection = document.getElementById("commentsSection");
let clickedComment = false;

commentBtn.addEventListener("click", () => {
  if (!clickedComment) {
    clickedComment = true;
    commentsSection.classList.add("active");
  } else {
    clickedComment = false;
    commentsSection.classList.remove("active");
  }
});

document.getElementById("closeComments").addEventListener("click", function () {
  commentsSection.classList.remove("active");
  clickedComment = false; // Resetelni a gomb állapotát
});
