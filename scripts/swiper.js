const swiper = new Swiper(".swiper", {
  allowTouchMove: false,
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  speed: 95,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
