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

// Funkció a válaszok számának frissítésére
function updateAnswerCount(answerBtn, delta) {
  const answerCountElem = answerBtn.querySelector("#answer-count");
  if (answerCountElem) {
    const currentCount = parseInt(answerCountElem.textContent);
    answerCountElem.textContent = currentCount + delta;
  }

  // Keressük meg a fő komment számlálót, és frissítsük azt is
  const parentComment = answerBtn.closest(".comment");
  const parentAnswerCountElem = parentComment.querySelector("#answer-count");
  if (parentAnswerCountElem && parentAnswerCountElem !== answerCountElem) {
    const parentCurrentCount = parseInt(parentAnswerCountElem.textContent);
    parentAnswerCountElem.textContent = parentCurrentCount + delta;
  }

  // Frissítsük az összes komment számát is, mivel egy válasz egy új kommentnek számít
  updateCommentCount(delta);
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
      likeIcon.innerHTML = `</i><i class="fa-regular fa-heart"></i>`;
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
    }
  }
});

// Eseménydelegálás a válasz gombokra
document.body.addEventListener("click", function (event) {
  if (
    event.target.matches(".answer__btn") ||
    event.target.closest(".answer__btn")
  ) {
    const answerBtn = event.target.matches(".answer__btn")
      ? event.target
      : event.target.closest(".answer__btn");
    const answerIcon = answerBtn.querySelector("#answer-icon");
    const answerCount = answerBtn.querySelector("#answer-count");

    let clickedAnswer = answerBtn.dataset.clickedAnswer === "true";
    if (!clickedAnswer) {
      answerBtn.dataset.clickedAnswer = "true";
      answerIcon.innerHTML = `<i class="fa-solid fa-comment-dots" style="color: var(--black);"></i>`;

      // Hozzáadunk egy új válasz input mezőt
      const replyForm = document.createElement("div");
      replyForm.classList.add("reply-form");
      replyForm.innerHTML = `
        <textarea placeholder="Írj egy választ..."></textarea>
        <button class="post-reply-btn">Küldés</button>
      `;
      answerBtn.closest(".comment-header").appendChild(replyForm);

      // Válasz elküldése
      replyForm
        .querySelector(".post-reply-btn")
        .addEventListener("click", function () {
          const replyText = replyForm.querySelector("textarea").value.trim();
          if (replyText) {
            const replyList = document.createElement("div");
            replyList.classList.add("reply-list");

            replyList.innerHTML = `<div class="comment-header-img-username">
            <img src="https://via.placeholder.com/24" alt="Avatar" class="comment-avatar">
            <span class="comment-author answer-line">Vendég Felhasználó</span>
            </div>
            <div class="comment-second-row">
             <p class="reply-text">${replyText}</p>  
              <button class="comment-options-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              <div class="comment-options-menu asnwer">
                <button class="edit-comment"><i class="fa-solid fa-pen"></i>Szerkesztés</button>
                <button class="delete-comment"><i class="fa-solid fa-trash-can"></i>Törlés</button>
              </div>
            </div>
        
        <div class="like-btn-container">
          <button class="like__btn withcomment" data-clicked-like="false">
              <span id="like-icon">
                <i class="fa-regular fa-heart"></i>
              </span>
              <span id="like-count">0</span>
          </button>
          <button class="answer__btn withcomment" data-clicked-like="false">
              <span id="answer-icon">
                <i class="fa-regular fa-comment-dots"></i>
              </span>
              <span id="answer-count">0</span>
          </button>
      </div>
      </div>`;
            answerBtn.closest(".comment-header").appendChild(replyList);
            replyForm.remove(); // Válasz form eltávolítása

            // Frissítsük a válaszok számát
            updateAnswerCount(answerBtn, 1);
          }
        });
    } else {
      answerBtn.dataset.clickedAnswer = "false";
      answerIcon.innerHTML = `<i class="fa-regular fa-comment-dots"></i>`;
      // Itt nem csökkentjük a számlálót, mivel nem távolítunk el válaszokat
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

// Idő formázása emberi olvashatóságúvá
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " éve";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " hónapja";
  interval = seconds / 604800;
  if (interval > 1) return Math.floor(interval) + " hete";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " napja";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " órája";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " perce";
  return "éppen most";
}

// Komment hozzáadása
document.getElementById("postComment").addEventListener("click", function () {
  const commentText = document.getElementById("newCommentText").value.trim();
  if (commentText) {
    const commentsList = document.querySelector(".comments-list");
    const currentTime = new Date();

    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.dataset.timestamp = currentTime; // Időbélyeg hozzáadása
    newComment.innerHTML = `
      <div class="comment-header">
        <div class="comment-header-first-row">
          <div class="comment-header-img-username">
            <img src="https://via.placeholder.com/32" alt="Avatar" class="comment-avatar">
            <span class="comment-author">Vendég Felhasználó</span>
          </div>
          <div class="comment-time">${timeSince(currentTime)}</div>
        </div>
        <div class="comment-second-row">  
          <p class="comment-text">${commentText}</p>
          <button class="comment-options-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          <div class="comment-options-menu">
            <button class="edit-comment"><i class="fa-solid fa-pen"></i>Szerkesztés</button>
            <button class="delete-comment"><i class="fa-solid fa-trash-can"></i>Törlés</button>
          </div>
        </div>
        <div class="like-btn-container">
          <button class="like__btn withcomment" data-clicked-like="false">
              <span id="like-icon">
                <i class="fa-regular fa-heart"></i>
              </span>
              <span id="like-count">0</span>
          </button>
          <button class="answer__btn withcomment" data-clicked-like="false">
              <span id="answer-icon">
                <i class="fa-regular fa-comment-dots"></i>
              </span>
              <span id="answer-count">0</span>
          </button>
      </div>
      </div>
      
    `;

    commentsList.appendChild(newComment);
    document.getElementById("newCommentText").value = "";

    // Frissítsd a kommentek számát
    updateCommentCount(1);
  }
});

// Idő frissítése időközönként
setInterval(() => {
  const comments = document.querySelectorAll(".comment");
  comments.forEach((comment) => {
    const timestamp = new Date(comment.dataset.timestamp);
    const timeElem = comment.querySelector(".comment-time");
    timeElem.textContent = timeSince(timestamp);
  });
}, 60000); // Minden percben frissít

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
