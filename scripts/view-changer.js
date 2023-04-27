$(function () {
  const viewList = $(".view__list");
  const viewTable = $(".view__table");
  const productCards = $(".main-products__item");
  viewList.on("click", function () {
    for (let i = 0; i < productCards.length; i++) productCards[i].style.flex = "1 1 100%";
    $(".view__list img")[0].src = "./images/icons/list-darken.svg";
    $(".view__table img")[0].src = "./images/icons/table.svg";
  });
  viewTable.on("click", function () {
    for (let i = 0; i < productCards.length; i++) productCards[i].style.flex = "0 1 calc(33.333% - 8px)";
    $(".view__table img")[0].src = "./images/icons/table-darken.svg";
    $(".view__list img")[0].src = "./images/icons/list.svg";
  });
  window.onresize = function () {
    if (window.innerWidth <= 460) {
      for (let i = 0; i < productCards.length; i++) productCards[i].style.flex = "1 1 100%";
    } else {
      for (let i = 0; i < productCards.length; i++) productCards[i].style.flex = "0 1 calc(33.333% - 8px)";
    }
  };
});
