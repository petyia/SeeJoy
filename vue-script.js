const TOTAL_STORIES = 3; // Az összes rendelkezésre álló történet száma

const app = new Vue({
  el: "#vue-component",
  data() {
    return {
      mediaList: [], // Dinamikusan frissítve a single-story.js-ből
      current: 0,
      timeline: null, // Anime.js idővonal referenciája
      autoPlayActive: true, // Autoplay állapotának nyomon követése
    };
  },
  mounted() {
    this.initHammer();
    this.initTimeline(); // Inicializáljuk az idővonalat itt
  },
  methods: {
    // Timeline inicializálása és dinamikus frissítése
    initTimeline() {
      if (this.mediaList.length > 0) {
        this.timeline = anime.timeline({
          autoplay: false,
          duration: 6000,
          easing: "linear",
          loop: false,
          complete: () => {
            // Ha az aktuális történet véget ér, a következőre ugrik
            this.nextMedia();
          },
        });

        // Animációk hozzáadása a navigációs elemekhez
        this.mediaList.forEach((media, index) => {
          const navItem = document.querySelectorAll(
            ".vue-nav .nav-item-single-story"
          )[index];

          if (navItem) {
            this.timeline.add({
              targets: navItem.querySelector(".nav-progress"),
              width: "100%",
              changeBegin: () => {
                this.current = index;
              },
            });
          }
        });
      }
    },

    // Hammer.js swipe funkció beállítása
    initHammer() {
      const container = document.querySelector(
        ".story-card-img-container.single-story"
      );
      const hammertime = new Hammer(container);
      console.log("Hammer.js initialized");

      // Pause timeline when pressing down
      hammertime.on("press", () => {
        if (this.timeline) this.timeline.pause();
        this.autoPlayActive = false; // Autoplay leállítása
      });

      // Resume timeline on press release
      hammertime.on("pressup", () => {
        if (this.timeline) this.timeline.play();
        this.autoPlayActive = true; // Autoplay folytatása
      });

      // Tap event kezelés
      hammertime.on("tap", (e) => {
        console.log("Tap event detected");
        let containerRect = container.getBoundingClientRect();
        let containerCenter = containerRect.left + containerRect.width / 2;

        if (e.center.x > containerCenter) {
          this.nextMedia();
          console.log("Next media");
        } else {
          this.prevMedia();
          console.log("Previous media");
        }
      });
    },

    nextMedia() {
      if (this.current < this.mediaList.length - 1) {
        this.current++;
        this.timeline.seek(this.current * 8000);
        this.timeline.play();
      } else {
        this.nextStory(); // Következő történetre ugrik
      }
    },

    prevMedia() {
      if (this.current > 0) {
        this.current--;
        this.timeline.seek(this.current * 8000);
        this.timeline.play();
      }
    },

    // Történetek közötti váltás
    nextStory() {
      const currentStoryId = parseInt(
        this.$root.$el.getAttribute("data-story-id"),
        10
      );

      if (!isNaN(currentStoryId)) {
        let nextStoryId = currentStoryId + 1;

        // Ha elérjük az utolsó történetet, az elsőhöz ugrik vissza
        if (nextStoryId > TOTAL_STORIES) {
          nextStoryId = 1;
        }

        window.location.href = `single-story.html?storyId=${nextStoryId}`;
      } else {
        console.error("Hibás storyId: ", currentStoryId);
      }
    },
  },
  watch: {
    mediaList(newMediaList) {
      if (newMediaList.length > 0) {
        this.$nextTick(() => {
          this.initTimeline(); // Újraindítjuk az idővonalat
          if (this.autoPlayActive) {
            this.timeline.play(); // Automatikusan elindítjuk az idővonalat
          }
        });
      }
    },
  },
});
