// Változók inicializálása
const commentBtn = document.querySelector(".comment__btn");
const commentsSection = document.getElementById("commentsSection");

// Szerkesztés modális ablak
const editCommentModal = document.getElementById("editCommentModal");
const closeEditModal = document.querySelector(".close-edit-modal");
const saveEditCommentBtn = document.getElementById("saveEditComment");
const editCommentText = document.getElementById("editCommentText");

// Törlés megerősítő modális ablak
const deleteCommentModal = document.getElementById("deleteCommentModal");
const closeDeleteModal = document.querySelector(".close-delete-modal");
const confirmDeleteCommentBtn = document.getElementById("confirmDeleteComment");
const cancelDeleteCommentBtn = document.getElementById("cancelDeleteComment");

let clickedComment = false;
let currentComment = null; // Hozzáadva a szerkesztéshez és törléshez

// Funkció a kommentek számának frissítésére
function updateCommentCount(delta) {
  const commentCountElem = document.querySelector("#comment-count");
  if (commentCountElem) {
    const currentCount = parseInt(commentCountElem.textContent);
    commentCountElem.textContent = currentCount + delta;
  }
}

// Funkció az ikon állapotának frissítésére
function updateCommentIcon(isActive) {
  const commentIcon = commentBtn.querySelector("#comment-icon");
  if (isActive) {
    commentIcon.innerHTML = `<i class="fa-solid fa-comment" style="color: var(--black);"></i>`;
  } else {
    commentIcon.innerHTML = `<i class="fa-regular fa-comment"></i>`;
  }
}

// Komment szekció nyitása és zárása
function toggleCommentsSection() {
  if (!clickedComment) {
    clickedComment = true;
    commentsSection.style.display = "block";
    requestAnimationFrame(() => {
      commentsSection.classList.add("active");
    });
    updateCommentIcon(true);
  } else {
    clickedComment = false;
    commentsSection.classList.remove("active");
    commentsSection.addEventListener(
      "transitionend",
      () => {
        commentsSection.style.display = "none";
      },
      { once: true }
    );
    updateCommentIcon(false);
  }
}

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

// Eseménydelegálás a komment gombokra
document.body.addEventListener("click", function (event) {
  if (
    event.target.matches(".comment__btn") ||
    event.target.closest(".comment__btn")
  ) {
    toggleCommentsSection();
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
          <span class="comment-author">Vendég Felhasználó</span>
          <p class="comment-text">${commentText}</p>
        </div>
      </div>
      <div class="like-btn-container">
        <button class="like__btn withcomment" data-clicked-like="false">
            <span id="like-icon">
              <i class="fa-regular fa-heart"></i>
            </span>
            <span id="like-count">0</span>
        </button>
      </div>
      <button class="comment-options-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
      <div class="comment-options-menu">
        <button class="edit-comment"><i class="fa-solid fa-pen"></i>Szerkesztés</button>
        <button class="delete-comment"><i class="fa-solid fa-trash-can"></i>Törlés</button>
      </div>
    `;

    commentsList.appendChild(newComment);
    document.getElementById("newCommentText").value = "";

    // Frissítsd a kommentek számát
    updateCommentCount(1);
  }
});

// Eseménydelegálás a kommentek opciós gombjaira
document.body.addEventListener("click", function (event) {
  if (
    event.target.matches(".comment-options-btn") ||
    event.target.closest(".comment-options-btn")
  ) {
    const button = event.target.matches(".comment-options-btn")
      ? event.target
      : event.target.closest(".comment-options-btn");
    const optionsMenu = button.nextElementSibling;

    if (optionsMenu.style.display === "block") {
      optionsMenu.style.display = "none";
    } else {
      document.querySelectorAll(".comment-options-menu").forEach((menu) => {
        menu.style.display = "none";
      });
      optionsMenu.style.display = "block";
    }
  } else {
    document.querySelectorAll(".comment-options-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  }
});

// Szerkesztés funkció
document.body.addEventListener("click", function (event) {
  if (event.target.matches(".edit-comment")) {
    const comment = event.target.closest(".comment");
    currentComment = comment;
    const commentTextElem = comment.querySelector(".comment-text");
    editCommentText.value = commentTextElem.textContent;
    editCommentModal.style.display = "block";
  }
});

// Mentés szerkesztés után
saveEditCommentBtn.addEventListener("click", function () {
  if (currentComment) {
    const commentTextElem = currentComment.querySelector(".comment-text");
    commentTextElem.textContent = editCommentText.value;
    editCommentModal.style.display = "none";
  }
});

// Törlés funkció
document.body.addEventListener("click", function (event) {
  if (event.target.matches(".delete-comment")) {
    const comment = event.target.closest(".comment");
    currentComment = comment;
    deleteCommentModal.style.display = "block";
  }
});

// Törlés megerősítése
confirmDeleteCommentBtn.addEventListener("click", function () {
  if (currentComment) {
    currentComment.remove();
    updateCommentCount(-1); // Csökkentjük a kommentek számát
    deleteCommentModal.style.display = "none";
  }
});

// Törlés törlése
cancelDeleteCommentBtn.addEventListener("click", function () {
  deleteCommentModal.style.display = "none";
});

// Zárja be a szerkesztési modális ablakot
closeEditModal.addEventListener("click", function () {
  editCommentModal.style.display = "none";
});

// Zárja be a törlési modális ablakot
closeDeleteModal.addEventListener("click", function () {
  deleteCommentModal.style.display = "none";
});

// Kommentek Bezárása
document.getElementById("closeComments").addEventListener("click", function () {
  commentsSection.classList.remove("active");
  commentsSection.addEventListener(
    "transitionend",
    () => {
      commentsSection.style.display = "none";
    },
    { once: true }
  );
  clickedComment = false;
  updateCommentIcon(false);
});

const textarea = document.querySelector(".comment-form textarea");

function adjustTextareaHeight() {
  textarea.style.height = "auto"; // Alapértelmezett magasság visszaállítása
  textarea.style.height = `${textarea.scrollHeight}px`; // Állítsd be a magasságot a tartalom méretének megfelelően
}

// Figyeljük az input eseményeket a textarea-n
textarea.addEventListener("input", adjustTextareaHeight);

// Alkalmazzuk a magasságot az oldal betöltődésekor is, ha van már előre kitöltött szöveg
window.addEventListener("load", adjustTextareaHeight);
