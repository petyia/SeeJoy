// Adatok tárolása az egyes beszélgetésekhez
const conversations = {
  "Feledékeny Hanna": [
    {
      timestamp: "2024-09-13T13:00:00",
      author: "Feledékeny Hanna",
      text: "Mikor volt a találkozónk?",
      avatar:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png",
    },
  ],
  "Miguel Cohen": [
    {
      timestamp: "2024-09-13T12:00:00",
      author: "Miguel Cohen",
      text: "Érdekel egy új program amit most kezdtem el szervezni?",
      avatar:
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png",
    },
  ],
  "Titkos Csoport": [],
  "Társasjátékos barátok": [
    {
      timestamp: "2024-09-12T12:00:00",
      author: "Kovács Vera",
      text: "Sziasztok, játszunk ma este?",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      timestamp: "2024-09-12T16:00:00",
      author: "Vágó András",
      text: "Igen, én benne vagyok!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ],
  "Jordan Smith": [],
  "Jared Jackson": [],
  "Henry Clark": [],
  "Jason Mraz": [],
  "Chiwa Lauren": [],
  "Caroline Orange": [],
  "Lina Ashma": [],
};

// Aktuális beszélgetés, amit épp nézel
let currentConversation = null;

// Frissítjük az utolsó üzenetet a 'msg-message' span-ben
function updateLastMessage(userName) {
  const messages = conversations[userName];
  const lastMessage =
    messages.length > 0
      ? messages[messages.length - 1].text
      : "Nincsenek üzenetek";

  // Keresd meg a megfelelő 'msg' elemet a felhasználó neve alapján
  document.querySelectorAll(".msg").forEach((msgElement) => {
    const msgUserName = msgElement.querySelector(".msg-username").innerText;

    // Ha a felhasználónév egyezik, frissítsük az üzenetet
    if (msgUserName === userName) {
      const messageElement = msgElement.querySelector(".msg-message");
      messageElement.innerText = lastMessage;
    }
  });
}

// A beszélgetés tabok közötti váltás kezelése
document.querySelectorAll(".msg").forEach((item) => {
  item.addEventListener("click", function () {
    // Előző active class eltávolítása minden elemről
    document.querySelectorAll(".msg").forEach((msg) => {
      msg.classList.remove("active1");
    });

    // Kiválasztott elemre active class hozzáadása
    this.classList.add("active1");

    // Chat ablak tartalom frissítése
    const chatAreaTitle = document.querySelector(".chat-area-title");
    const userName = this.querySelector(".msg-username").innerText;
    const profileImage = this.querySelector(".msg-profile").src; // Profilkép linkje

    // Mentjük az aktuális beszélgetést
    currentConversation = userName;

    // Cím frissítése
    chatAreaTitle.innerText = userName;

    // Profilkép frissítése, ha "Társasjátékos barátok" az aktuális beszélgetés
    const chatAreaGroup = document.querySelector(".chat-area-group");
    if (userName === "Társasjátékos barátok") {
      // Frissítjük a képeket a "Társasjátékos barátok" beszélgetéshez
      chatAreaGroup.innerHTML = `
        <img class="chat-area-profile" src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
        <img class="chat-area-profile" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
        <span>7</span>
      `;
    } else {
      // Alap profilkép frissítése más beszélgetésekhez
      chatAreaGroup.innerHTML = `
        <img class="chat-area-profile" src="${profileImage}" alt="${userName}" />
        <span>1</span>
      `;
    }

    // A megfelelő beszélgetés kommentjeinek betöltése
    const commentsList = document.querySelector(".comments-list");
    commentsList.innerHTML = ""; // Üres a chat terület alapból
    const conversationComments = conversations[userName] || [];

    // Beszélgetés előzményeinek megjelenítése
    conversationComments.forEach((comment) => {
      const newComment = document.createElement("div");
      newComment.classList.add("comment");
      newComment.dataset.timestamp = comment.timestamp;
      newComment.innerHTML = `
        <div class="comment-header-column">
          <div class="comment-header-column-row-message">
            <div class="comment-header-img-username">
              <img src="${
                comment.avatar
              }" class="comment-avatar profile-img messages" alt="Avatar">
            </div>
          </div>
          <div class="comment-header-column-2"> 
            <div class="comment-header-column-2-1"> 
              <span class="comment-author">${comment.author}</span>
              <div class="comment-time">${timeSince(
                new Date(comment.timestamp)
              )}</div>
            </div>
           <div class="comment-second-row">  
            <p class="comment-text">${comment.text}</p>
           </div>
          </div>
        </div>
      `;
      commentsList.appendChild(newComment);
    });

    // Frissítjük az utolsó üzenetet
    updateLastMessage(userName);
  });
});

// Komment hozzáadása az aktuális beszélgetéshez
document.getElementById("postComment").addEventListener("click", function () {
  const commentText = document.getElementById("newCommentText").value.trim();
  if (commentText && currentConversation) {
    const currentTime = new Date();

    // Az új komment adatai
    const newComment = {
      timestamp: currentTime.toISOString(),
      author: "Szabó Lilla", // Kommentelő neve
      text: commentText,
      avatar: "https://images.unsplash.com/photo-1600353068440-6361ef3a86e8", // Példa avatar URL
    };

    // Hozzáadjuk a kommentet az aktuális beszélgetéshez
    conversations[currentConversation].push(newComment);

    // Komment megjelenítése
    const commentsList = document.querySelector(".comments-list");
    const commentElem = document.createElement("div");
    commentElem.classList.add("comment");
    commentElem.dataset.timestamp = currentTime;
    commentElem.innerHTML = `
      <div class="comment-header-column">
        <div class="comment-header-column-row-message">
          <div class="comment-header-img-username">
            <img src="${
              newComment.avatar
            }" class="comment-avatar profile-img messages" alt="Avatar">
          </div>
        </div>
        <div class="comment-header-column-2"> 
          <div class="comment-header-column-2-1"> 
            <span class="comment-author">${newComment.author}</span>
            <div class="comment-time">${timeSince(currentTime)}</div>
          </div>
         <div class="comment-second-row">  
          <p class="comment-text">${newComment.text}</p>
         </div>
        </div>
      </div>
    `;
    commentsList.appendChild(commentElem);

    // Tisztítsuk meg a beviteli mezőt
    document.getElementById("newCommentText").value = "";

    // Frissítjük az utolsó üzenetet a beszélgetés előzmény menüjében
    updateLastMessage(currentConversation);
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

// Kattintás kezelése a 'msg' elemre (beszélgetés kiválasztás)
document.querySelectorAll(".msg").forEach((item) => {
  item.addEventListener("click", function () {
    // Csak mobil nézetben futtatjuk
    if (window.innerWidth <= 780) {
      document.querySelector(".conversation-area").classList.add("hidden"); // Elrejtjük a beszélgetés listát
      document.querySelector(".chat-area").classList.add("active-chat"); // Megjelenítjük a chat-et
    }

    // Itt jöhet a többi chat betöltés (pl. profilkép és beszélgetés betöltése)
    const chatAreaTitle = document.querySelector(".chat-area-title");
    const userName = this.querySelector(".msg-username").innerText;
    chatAreaTitle.innerText = userName;
  });
});

// Bezárás kezelése a 'new-close-icon' gombra kattintva
document
  .querySelector(".new-close-icon")
  .addEventListener("click", function () {
    // Csak mobil nézetben futtatjuk
    if (window.innerWidth <= 780) {
      document.querySelector(".chat-area").classList.remove("active-chat"); // Elrejtjük a chat-et
      document.querySelector(".conversation-area").classList.remove("hidden"); // Megjelenítjük a beszélgetés listát
    }
  });

// Kattintás kezelése a 'msg' elemre (beszélgetés kiválasztás)
document.querySelectorAll(".msg").forEach((item) => {
  item.addEventListener("click", function () {
    // Csak mobil nézetben futtatjuk
    if (window.innerWidth <= 780) {
      document.querySelector(".conversation-area").classList.add("hidden"); // Elrejtjük a beszélgetés listát
      document.querySelector(".chat-area").classList.add("active-chat"); // Megjelenítjük a chat-et
      document.querySelector(".phone.single-event").classList.add("hidden"); // Elrejtjük a phone elemet
      document.querySelector(".app").classList.remove("default-height"); // Eltávolítjuk a 88vh-t
      document.querySelector(".app").style.height = "100vh"; // Teljes magasságúvá tesszük
    }

    // Itt jöhet a többi chat betöltés (pl. profilkép és beszélgetés betöltése)
    const chatAreaTitle = document.querySelector(".chat-area-title");
    const userName = this.querySelector(".msg-username").innerText;
    chatAreaTitle.innerText = userName;
  });
});

// Bezárás kezelése a 'new-close-icon' gombra kattintva
document
  .querySelector(".new-close-icon")
  .addEventListener("click", function () {
    // Csak mobil nézetben futtatjuk
    if (window.innerWidth <= 780) {
      document.querySelector(".chat-area").classList.remove("active-chat"); // Elrejtjük a chat-et
      document.querySelector(".conversation-area").classList.remove("hidden"); // Megjelenítjük a beszélgetés listát
      document.querySelector(".phone").classList.remove("hidden"); // Visszahozzuk a phone elemet
      document.querySelector(".app").classList.add("default-height"); // 88vh-t alkalmazunk
      document.querySelector(".app").style.height = "90vh"; // Magasság visszaállítása
    }
  });
