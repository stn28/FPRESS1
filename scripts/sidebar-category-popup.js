$(function () {
  $(".sidebar-menu__item").on("click", function (e) {
    if ($(".main__sidebar--active")[0]) {
      e.currentTarget.childNodes.forEach((el) => {
        if (el.tagName === "UL") {
          el.classList.add("sidebar-menu__subcategory-menu--responsible-active");
        }
      });
    }
  });
  $(".subcategory-menu__close").on("mousedown", function (e) {
    $(".sidebar-menu__subcategory-menu--responsible-active").removeClass("sidebar-menu__subcategory-menu--responsible-active");
  });
});
