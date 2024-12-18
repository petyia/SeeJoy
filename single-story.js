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

// Törlés megerősítő modális ablak kommentnél
const muteStoryModal = document.getElementById("muteStoryModal");
const closeMuteModal = document.querySelector(".close-mute-modal");
const confirmMuteStoryBtn = document.getElementById("confirmMuteStory");
const cancelMuteStoryBtn = document.getElementById("cancelMuteStory");

let clickedComment = false;
let currentComment = null; // Hozzáadva a szerkesztéshez és törléshez

// Új változók inicializálása
const commentToggleBtn = document.querySelector("#openComments"); // Komment gomb
const commentsContainer = document.getElementById("commentsSection"); // Komment szekció
const eventsFirstRowElement = document.querySelector(
  ".events-first-row.single-story.phone-absolute-s-st.phone-block"
); // Elrejteni kívánt elem

// URL paraméterek lekérdezése
const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get("storyId"); // Story ID-t kiolvassuk az URL-ből

if (storyId) {
  // Előre definiált események adatai
  const storiesData = {
    1: {
      title: "Játszunk együtt a legnépszerűbb társasokkal!",
      date: "2024 Október 16.",
      time: "17:00-től",
      price: "Ingyen",
      organizer: "Vágó András",
      organizerAvatar: "img/story6.webp", // Szervező képe
      mediaList: [
        { url: "img/story-event1.webp", type: "image" },
        { url: "img/e-d1-2.webp", type: "image" },
        { url: "vid/tarsas.mp4", type: "video" },
      ],
      eventId: 1,
    },
    2: {
      title: "Főzés: Hogyan készíts gyümölcskoktélokat",
      date: "2024 Október 20.",
      time: "18:00-től",
      price: "800 Ft",
      organizer: "Nagy Bogi",
      organizerAvatar: "img/story2.webp", // Szervező képe
      mediaList: [
        { url: "img/cocktail-bg1.webp", type: "image" },
        { url: "img/cocktail-bg2.webp", type: "image" },
        { url: "vid/cocktails.mp4", type: "video" },
      ],
      eventId: 2,
    },
    3: {
      title: "Kreatív Self-Care: Egyedi sminkek készítése",
      date: "2024 Október 27.",
      time: "Délelőtt 11:00-től",
      price: "2000 Ft",
      organizer: "Kén Gréti",
      organizerAvatar: "img/story7.webp", // Szervező képe
      mediaList: [
        { url: "vid/sminkes.mp4", type: "video" },
        { url: "img/makeup (5).webp", type: "image" },
        { url: "img/makeup (3).webp", type: "image" },
        { url: "img/makeup (1).webp", type: "image" },
      ],
      eventId: 3,
    },
  };

  const story = storiesData[storyId];
  if (story) {
    // DOM elemek frissítése a történet részleteivel
    document.querySelector(".h3").textContent = story.title;
    document.querySelector(".popular-hour").textContent = story.date;
    document.querySelector(".story-price").textContent = story.price;
    document.querySelector(".name-text").textContent = story.organizer;

    // Szervező neve beállítása
    document.querySelector(".unfollow-story .organizer-name").textContent =
      story.organizer;
    document.querySelector(".mute-story .organizer-name").textContent =
      story.organizer;

    const eventLink = document.querySelector(".event-link");
    eventLink.href = `single-event.html?eventId=${story.eventId}`;

    // Szervező képének frissítése
    const organizerAvatar = document.querySelector(".stories-card");
    organizerAvatar.style.backgroundImage = `url(${story.organizerAvatar})`;

    // Dinamikus média átadása a Vue.js-nek
    if (app) {
      app.mediaList = story.mediaList; // Itt állítjuk be a médiaelemeket
      app.initTimeline(); // Inicializáljuk az idővonalat
    }

    // Frissítjük a data-story-id attribútumot a következő történethez
    const vueComponent = document.getElementById("vue-component");
    if (vueComponent) {
      vueComponent.setAttribute("data-story-id", storyId);
    }
  } else {
    console.error("Történet nem található az ID alapján: ", storyId);
  }
} else {
  console.error("Nincs történet ID az URL-ben.");
}

// Komment szekció nyitása és zárása
function toggleCommentsContainer() {
  if (commentsContainer.classList.contains("active")) {
    // Ha aktív, elindítjuk az animációt a lezáráshoz
    commentsContainer.classList.remove("active");

    commentsContainer.addEventListener(
      "transitionend",
      () => {
        commentsContainer.style.display = "none"; // Az animáció végeztével eltűnik
      },
      { once: true }
    );

    handleScreenResize(); // Ellenőrizzük az elrejtendő elemeket
  } else {
    // Először megjelenítjük a szekciót
    commentsContainer.style.display = "block"; // Megjelenítjük

    // Késleltetéssel indítjuk az animációt, hogy a transition működjön
    requestAnimationFrame(() => {
      commentsContainer.classList.add("active");
      handleScreenResize(); // Ellenőrizzük az elrejtendő elemeket
    });
  }
}

// Funkció a képernyőméret ellenőrzésére és az elem elrejtésére
function handleScreenResize() {
  const screenWidth = window.innerWidth;
  const commentSectionVisible = commentsContainer.classList.contains("active");

  if (screenWidth <= 780 && commentSectionVisible) {
    // Ha 480px vagy kisebb a képernyőméret és a komment szekció aktív, elrejtjük az events-first-row-t
    eventsFirstRowElement.style.display = "none";
  } else {
    // Ha nagyobb a képernyőméret, vagy a komment szekció nem aktív, visszaállítjuk az eredeti állapotot
    eventsFirstRowElement.style.display = "";
  }
}

// Gomb esemény hozzáadása
commentToggleBtn.addEventListener("click", toggleCommentsContainer);

// A képernyőméret változásának figyelése
window.addEventListener("resize", handleScreenResize);

// Komment szekció bezárása a "close" gombbal
const closeCommentsBtn = document.getElementById("closeComments");
closeCommentsBtn.addEventListener("click", toggleCommentsContainer);
//-------------------------------------------------------------------------------
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
                 <img src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" class="profile-img smaller comment-avatar">
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
      <div class="comment-header">
        <div class="comment-header-first-row">
          <div class="comment-header-img-username">
            <img src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80" class="profile-img smaller comment-avatar">
            <span class="comment-author">Szabó Lilla</span>
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
    if (timeElem) {
      timeElem.textContent = timeSince(timestamp);
    }
  });
}, 60000); // Minden percben frissít

// Változó a menü megnyitásához és bezárásához
const menuButton = document.querySelector(".edit-profile-icon");
const menu = document.querySelector(".story-options-menu");

// Gomb kattintásra megnyitjuk vagy bezárjuk a menüt
menuButton.addEventListener("click", function (event) {
  event.stopPropagation(); // Megakadályozza, hogy a kattintás a dokumentumra is átmenjen
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
});

// Ha a dokumentum más területére kattintanak, bezárja a menüt
document.addEventListener("click", function (event) {
  if (
    menu.style.display === "block" &&
    !menu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    menu.style.display = "none";
  }
});

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

  // Történet némítása funkció
  if (event.target.matches(".mute-story")) {
    const comment = event.target.closest(".story-option-menu");
    currentComment = comment;
    muteStoryModal.style.display = "block";
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

// Add event listener for the "go-back" button
document.querySelector(".go-back-icon").addEventListener("click", function () {
  history.back(); // This will also navigate back to the previous page
});
