// Változók inicializálása
const commentBtn = document.querySelector(".comment__btn");
const commentsSection = document.getElementById("commentsSection");

// Szerkesztés modális ablak kommentnél
const editCommentModal = document.getElementById("editCommentModal");
const closeEditModal = document.querySelector(".close-edit-modal");
const saveEditCommentBtn = document.getElementById("saveEditComment");
const editCommentText = document.getElementById("editCommentText");

// Törlés megerősítő modális ablak kommentnél
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
    const currentCount = parseInt(commentCountElem.textContent, 10);
    commentCountElem.textContent = currentCount + delta;
  }
}

// Funkció a válaszok számának frissítésére
function updateAnswerCount(answerBtn, delta) {
  const answerCountElem = answerBtn.querySelector("#answer-count");
  if (answerCountElem) {
    const currentCount = parseInt(answerCountElem.textContent, 10);
    answerCountElem.textContent = currentCount + delta;
  }

  // Keressük meg a fő komment számlálót, és frissítsük azt is
  const parentComment = answerBtn.closest(".comment");
  if (parentComment) {
    const parentAnswerCountElem = parentComment.querySelector("#answer-count");
    if (parentAnswerCountElem && parentAnswerCountElem !== answerCountElem) {
      const parentCurrentCount = parseInt(
        parentAnswerCountElem.textContent,
        10
      );
      parentAnswerCountElem.textContent = parentCurrentCount + delta;
    }
  }

  // Frissítsük az összes komment számát is, mivel egy válasz egy új kommentnek számít
  updateCommentCount(delta);
}

// Funkció az ikon állapotának frissítésére
function updateCommentIcon(isActive) {
  const commentIcon = commentBtn.querySelector("#comment-icon");
  if (commentIcon) {
    if (isActive) {
      commentIcon.innerHTML = `<i class="fa-solid fa-comment" style="color: var(--black);"></i>`;
    } else {
      commentIcon.innerHTML = `<i class="fa-regular fa-comment"></i>`;
    }
  }
}

// Komment szekció nyitása és zárása
function toggleCommentsSection() {
  if (!clickedComment) {
    clickedComment = true;
    commentsSection.style.display = "flex";
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

    if (likeIcon && likeCount) {
      let clickedLike = likeBtn.dataset.clickedLike === "true";
      if (!clickedLike) {
        likeBtn.dataset.clickedLike = "true";
        likeIcon.innerHTML = `<i class="fa-solid fa-heart" style="color: var(--primary);"></i>`;
        likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
      } else {
        likeBtn.dataset.clickedLike = "false";
        likeIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
      }
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

    if (answerIcon && answerCount) {
      let clickedAnswer = answerBtn.dataset.clickedAnswer === "true";
      if (!clickedAnswer) {
        answerBtn.dataset.clickedAnswer = "true";
        answerIcon.innerHTML = `<i class="fa-solid fa-comment-dots" style="color: var(--black);"></i>`;

        // Hozzáadunk egy új válasz input mezőt
        const replyForm = document.createElement("div");
        replyForm.classList.add("reply-form");
        replyForm.innerHTML = `
          <textarea placeholder="Írj egy választ..."></textarea>
          <div class="emoji-panel">
            <button id="newEmojiAnswer" class="----chat-input-tool---">
              <i class="fa-regular fa-face-smile"></i>
            </button>
          </div>
          <button class="post-reply-btn"><i class="fa-solid fa-paper-plane"></i></button>
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

              replyList.innerHTML = `
                <div class="comment-header-img-username">
                  <img src="https://via.placeholder.com/24" alt="Avatar" class="comment-avatar">
                  <span class="comment-author answer-line">Szabó Lilla</span>
                </div>
                <div class="comment-second-row">
                  <p class="reply-text">${replyText}</p>
                  <button class="comment-options-btn"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                  <div class="comment-options-menu answer">
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

              // Válasz ikon visszaállítása
              answerBtn.dataset.clickedAnswer = "false";
              answerIcon.innerHTML = `<i class="fa-regular fa-comment-dots"></i>`;
            }
          });
      } else {
        answerBtn.dataset.clickedAnswer = "false";
        answerIcon.innerHTML = `<i class="fa-regular fa-comment-dots"></i>`;

        // Töröljük a válasz formot, ha létezik
        const existingReplyForm = answerBtn
          .closest(".comment-header")
          .querySelector(".reply-form");
        if (existingReplyForm) {
          existingReplyForm.remove();
        }
      }
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
      <div class="comment-header-column">
        <div class="comment-header-column-row-message">
          <div class="comment-header-img-username">
          <img src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" class="comment-avatar profile-img messages" alt="Avatar">
          </div>
        </div>
        <div class="comment-header-column-2"> 
          <div class="comment-header-column-2-1"> 
            <span class="comment-author">Szabó Lilla</span>
            <div class="comment-time">${timeSince(currentTime)}</div>
          </div>
         <div class="comment-second-row">  
          <p class="comment-text">${commentText}</p>
         </div>
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
    if (timeElem) {
      timeElem.textContent = timeSince(timestamp);
    }
  });
}, 60000); // Minden percben frissít

// Globalis változók

let currentReply = null;

// Eseménydelegálás a kommentek és válaszok opciós gombjaira
document.body.addEventListener("click", function (event) {
  // Komment opciós menü megjelenítése
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

  // Szerkesztés funkció a válaszoknál
  if (event.target.matches(".edit-reply")) {
    const reply = event.target.closest(".reply-list");
    currentReply = reply;
    const replyTextElem = reply.querySelector(".reply-text");
    editCommentText.value = replyTextElem.textContent;
    editCommentModal.style.display = "block";
  }

  // Szerkesztés funkció a kommenteknél
  if (event.target.matches(".edit-comment")) {
    const comment = event.target.closest(".comment");
    currentComment = comment;
    const commentTextElem = comment.querySelector(".comment-text");
    editCommentText.value = commentTextElem.textContent;
    editCommentModal.style.display = "block";
  }

  // Komment törlés funkció
  if (event.target.matches(".delete-comment")) {
    const comment = event.target.closest(".comment");
    currentComment = comment;
    deleteCommentModal.style.display = "block";
  }

  // Reply törlés funkció
  if (event.target.matches(".delete-reply")) {
    const reply = event.target.closest(".reply-list");
    if (reply) {
      currentReply = reply;
      deleteCommentModal.style.display = "block";
    }
  }
});

// Mentés szerkesztés után
saveEditCommentBtn.addEventListener("click", function () {
  if (currentReply) {
    const replyTextElem = currentReply.querySelector(".reply-text");
    const newReplyText = editCommentText.value.trim();

    if (replyTextElem && newReplyText) {
      replyTextElem.textContent = newReplyText;
      editCommentModal.style.display = "none";
      currentReply = null; // Reset currentReply
    } else {
      alert("A válasz szövege nem lehet üres!");
    }
  }

  if (currentComment) {
    const commentTextElem = currentComment.querySelector(".comment-text");
    const newCommentText = editCommentText.value.trim();

    if (commentTextElem && newCommentText) {
      commentTextElem.textContent = newCommentText;
      editCommentModal.style.display = "none";
      currentComment = null; // Reset currentComment
    } else {
      alert("A komment szövege nem lehet üres!");
    }
  }
});

// Törlés megerősítése
confirmDeleteCommentBtn.addEventListener("click", function () {
  if (currentReply) {
    // Törlés reply-k esetén
    const parentComment = currentReply.closest(".comment");
    if (parentComment) {
      const parentAnswerCountElem =
        parentComment.querySelector("#answer-count");
      if (parentAnswerCountElem) {
        const parentCurrentCount = parseInt(
          parentAnswerCountElem.textContent,
          10
        );
        parentAnswerCountElem.textContent = parentCurrentCount - 1;
      }
    }

    currentReply.remove();
    updateCommentCount(-1); // Csökkentjük a kommentek számát
    deleteCommentModal.style.display = "none";
    currentReply = null; // Reset currentReply
  }

  if (currentComment) {
    // Törlés kommentek esetén
    currentComment
      .querySelectorAll(".reply-list")
      .forEach((reply) => reply.remove()); // Törli a hozzátartozó reply-kat
    currentComment.remove();
    updateCommentCount(-1); // Csökkentjük a kommentek számát
    deleteCommentModal.style.display = "none";
    currentComment = null; // Reset currentComment
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
  if (textarea) {
    textarea.style.height = "auto"; // Alapértelmezett magasság visszaállítása
    textarea.style.height = `${textarea.scrollHeight}px`; // Állítsd be a magasságot a tartalom méretének megfelelően
  }
}

// Figyeljük az input eseményeket a textarea-n
if (textarea) {
  textarea.addEventListener("input", adjustTextareaHeight);

  // Alkalmazzuk a magasságot az oldal betöltődésekor is, ha van már előre kitöltött szöveg
  window.addEventListener("load", adjustTextareaHeight);
}

// Emojipanel megjelenítése
document.getElementById("newEmoji").addEventListener("click", function (e) {
  e.stopPropagation();
  document
    .querySelector(".intercom-composer-popover")
    .classList.toggle("active");
});

// Emojipanel elrejtése, ha kívülre kattintunk
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".emoji-panel") &&
    !e.target.closest(".intercom-composer-popover")
  ) {
    document
      .querySelector(".intercom-composer-popover")
      .classList.remove("active");
  }
});

// Emoji hozzáadása a szövegmezőhöz
document
  .querySelectorAll(".intercom-emoji-picker-emoji")
  .forEach(function (emoji) {
    emoji.addEventListener("click", function () {
      document.getElementById("newCommentText").value += this.innerHTML;
    });
  });

// Keresés az emoji között
document
  .querySelector(".intercom-composer-popover-input")
  .addEventListener("input", function () {
    const query = this.value.toLowerCase();
    document
      .querySelectorAll(".intercom-emoji-picker-emoji")
      .forEach(function (emoji) {
        const title = emoji.getAttribute("title").toLowerCase();
        emoji.style.display = title.includes(query) ? "inline-table" : "none";
      });
  });
