$(function () {
  var minVal = 0;
  var maxVal = 999999;

  $("#slider1").slider({
    min: minVal,
    max: maxVal,
    value: minVal,
    slide: function (event, ui) {
      $("#input1").val(ui.value);
    },
  });

  $("#slider2").slider({
    min: minVal,
    max: maxVal,
    value: maxVal,
    slide: function (event, ui) {
      $("#input2").val(ui.value);
    },
  });

  $("#input1").on("input", function () {
    var value = parseInt($(this).val());
    if (value < minVal) {
      value = minVal;
    } else if (value > maxVal) {
      value = maxVal;
    }
    $("#slider1").slider("value", value);
  });

  $("#input2").on("input", function () {
    var value = parseInt($(this).val());
    if (value < minVal) {
      value = minVal;
    } else if (value > maxVal) {
      value = maxVal;
    }
    $("#slider2").slider("value", value);
  });
});
