// Placeholder: Add any dynamic behavior here if needed later.
document.querySelectorAll(".popular-link").forEach((link) => {
  link.addEventListener("click", function () {
    // Mentjük a 'pageData' kulcs alá az URL-t és az oldal nevét
    sessionStorage.setItem(
      "pageData",
      JSON.stringify({
        url: window.location.href,
        source: "tickets",
      })
    );
  });
});
