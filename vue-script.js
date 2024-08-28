const app = new Vue({
  el: "#vue-component",
  data() {
    return {
      mediaList: [
        { url: "img/story-event6.webp", type: "image" },
        { url: "img/e-d1-1.webp", type: "image" },
        { url: "img/pop4.webp", type: "image" },
      ],
      current: 0,
      timeline: null, // Add this to store the timeline reference
    };
  },
  mounted() {
    // Create a timeline animation with Anime.js
    this.timeline = anime.timeline({
      autoplay: true,
      duration: 8000,
      easing: "linear",
      loop: true,
    });

    // Add animations for each navigation item
    this.mediaList.forEach((media, index) => {
      this.timeline.add({
        targets: document
          .querySelectorAll(".vue-nav .nav-item-single-story")
          [index].querySelector(".nav-progress"),
        width: "100%",
        changeBegin: () => {
          this.current = index;
        },
      });
    });

    // Initialize Hammer.js for gesture control on the specific container
    let container = document.querySelector(
      ".story-card-img-container.single-story"
    );
    let hammertime = new Hammer(container);

    // Pause animation on press
    hammertime.on("press", () => {
      this.timeline.pause();
    });

    // Play animation on pressup
    hammertime.on("pressup", () => {
      this.timeline.play();
    });

    // Handle tap gesture for navigation within the container
    hammertime.on("tap", (e) => {
      let containerRect = container.getBoundingClientRect();
      let containerCenter = containerRect.left + containerRect.width / 2;

      if (e.center.x > containerCenter) {
        // User tapped on the right side of the container
        if (this.current < this.mediaList.length - 1) {
          this.current += 1;

          this.timeline.pause();
          this.timeline.seek(this.current * 10000);
          this.timeline.play();
        }
      } else {
        // User tapped on the left side of the container
        if (this.current > 0) {
          this.current -= 1;

          this.timeline.pause();
          this.timeline.seek(this.current * 10000);
          this.timeline.play();
        }
      }
    });
  },
});
