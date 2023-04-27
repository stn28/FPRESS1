$(document).on("click", function (e) {
  const sideBarBtn = $(".responsive-local-menu");
  const sideBar = $(".main__sidebar");
  if (e.target === $(".burger")[0] || e.target.parentNode === $(".burger")[0]) {
    $("body").toggleClass("overflow-h");
    $(".header__menu").toggleClass("header__menu--active");
    $(".burger").toggleClass("burger--close");
    $(".burger__line").each(function () {
      $(this).toggleClass("burger__line--white");
    });
  } else if (e.target === sideBarBtn[0]) {
    sideBar.addClass("main__sidebar--active")[0].scrollTop = 0;
    $("body").addClass("overflow-h");
    $(".main-overlay__backdrop").toggleClass("main-overlay__backdrop--showing");
  } else if (
    sideBar[0] !== e.target &&
    sideBar.has(e.target).length === 0 &&
    e.target !== $(".header__menu--active")[0] &&
    !$(".header__menu--active")[0]?.contains(e.target)
  ) {
    sideBar.removeClass("main__sidebar--active");
    $("body").removeClass("overflow-h");
    $(".main-overlay__backdrop").removeClass("main-overlay__backdrop--showing");
  }
});
