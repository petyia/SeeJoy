const likeBtn = document.querySelector(".like__btn");
let likeIcon = document.querySelector("#like-icon"),
  likeCount = document.querySelector("#like-count");

let clickedLike = false;

likeBtn.addEventListener("click", () => {
  if (!clickedLike) {
    clickedLike = true;
    likeIcon.innerHTML = `<i class="fa-solid fa-heart"style="color: var(--primary);"></i>`;
    likeCount.textContent++;
  } else {
    clickedLike = false;
    likeIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    likeCount.textContent--;
  }
});

const commentBtn = document.querySelector(".comment__btn");
let commentIcon = document.querySelector("#comment-icon"),
  commentCount = document.querySelector("#comment-count");

let clickedComment = false;

commentBtn.addEventListener("click", () => {
  if (!clickedComment) {
    clickedComment = true;
    commentIcon.innerHTML = `<i class="fa-solid fa-comments" style="color: var(--black);"></i>`;
  } else {
    clickedComment = false;
    commentIcon.innerHTML = `<i class="fa-regular fa-comments"></i>`;
  }
});

const shareBtn = document.querySelector(".share__btn");
let shareIcon = document.querySelector("#share-icon"),
  shareCount = document.querySelector("#share-count");

let clickedShare = false;

shareBtn.addEventListener("click", () => {
  if (!clickedShare) {
    clickedShare = true;
  } else {
    clickedShare = false;
  }
});
