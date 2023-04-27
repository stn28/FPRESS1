$(function () {
  const ellipsisBtn = $(".product-item__other");
  function dropRemove() {
    $(".product-other__list--opened").removeClass("product-other__list--opened");
  }
  function dropAdd(e) {
    if (![...$(".product-other__list"), ...$(".product-other__item")].includes(e.target)) {
      if ($(".product-other__list--opened").length) {
        dropRemove();
      }
      $(e.currentTarget).find(".product-other__list").addClass("product-other__list--opened");
    }
  }
  let timeout;
  ellipsisBtn.on("mouseover", (e) => {
    timeout = setTimeout(() => dropAdd(e), 100);
  });

  ellipsisBtn.on("mouseout", (e) => {
    clearTimeout(timeout);
  });

  $(document).on("click", function (e) {
    if (!$(e.target).hasClass("product-other__list")) {
      $(".product-other__list--opened").each(function () {
        $(this).removeClass("product-other__list--opened");
      });
    }
  });
  $(document).on("scroll", dropRemove);
});
