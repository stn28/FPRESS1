$(function () {
  const slider = $("#slider-range").slider({
    range: true,
    min: 0,
    max: 999999,
    values: [0, 999999], // Default value on page
    slide: function (event, ui) {
      $(".sidebar-scale__input:not(.sidebar-scale__input--last)").val(ui.values[0]);
      $(".sidebar-scale__input--last").val(ui.values[1]);
    },
  });
  $(".sidebar-scale__input:not(.sidebar-scale__input--last)").val($("#slider-range").slider("values", 0));
  $(".sidebar-scale__input--last").val($("#slider-range").slider("values", 1));

  const priceInputUnder = $(".sidebar-scale__input").first();
  const priceInputAfter = $(".sidebar-scale__input").last();

  priceInputUnder.on("input", function (e) {
    if ($(this).val() <= priceInputAfter.val()) $("#slider-range").slider("option", "values", [$(this).val(), priceInputAfter.val()]);
  });

  priceInputAfter.on("input", function (e) {
    if ($(this).val() >= priceInputUnder.val()) $("#slider-range").slider("option", "values", [$(this).val(), priceInputUnder.val()]);
  });
});
