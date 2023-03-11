"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger"),
    menu = document.querySelector(".header__menu"),
    burgerLines = document.querySelectorAll(".burger__line");

  burgerBtn.addEventListener("click", function () {
    document.body.classList.toggle("overflow-h");
    menu.classList.toggle("header__menu--active");
    burgerBtn.classList.toggle("burger--close");
    burgerLines.forEach((e) => e.classList.toggle("burger__line--white"));
  });
});
