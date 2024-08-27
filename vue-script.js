const app = new Vue({
  el: "#vue-component",
  data() {
    return {
      mediaList: [
        { url: "img/story-event1.webp", type: "image" },
        { url: "img/story-event2.webp", type: "image" },
        { url: "img/story-event3.webp", type: "image" },
      ],
      current: 0,
      timeline: null, // Add this to store the timeline reference
    };
  },
  mounted() {
    // Create a timeline animation with Anime.js
    this.timeline = anime.timeline({
      autoplay: true,
      duration: 10000,
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

    // Initialize Hammer.js for gesture control
    let hammertime = new Hammer(document.querySelector("#vue-component"));

    // Pause animation on press
    hammertime.on("press", () => {
      this.timeline.pause();
    });

    // Play animation on pressup
    hammertime.on("pressup", () => {
      this.timeline.play();
    });

    // Handle tap gesture for navigation
    hammertime.on("tap", (e) => {
      if (e.center.x > window.innerWidth / 2) {
        if (this.current < this.mediaList.length - 1) {
          this.current += 1;

          this.timeline.pause();
          this.timeline.seek(this.current * 10000);
          this.timeline.play();
        }
      } else {
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
