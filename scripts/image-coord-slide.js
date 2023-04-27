$(function () {
  const productItems = $(".product-item__image");
  productItems.on("mousemove", function (e) {
    let productImages = parseImages(e);
    const widthPerBlock = e.currentTarget.clientWidth / productImages.length;
    const blockCoords = {};
    const rect = e.currentTarget.getBoundingClientRect(),
      offsetX = e.clientX - rect.left;
    for (let i = 0; i < productImages.length; ++i) {
      blockCoords[i] = [widthPerBlock * i, widthPerBlock * (i + 1)];
    }
    for (let i of Object.entries(blockCoords)) {
      if (offsetX >= i[1][0] && offsetX <= i[1][1]) {
        productImages
          .filter((e) => e != productImages[+i[0]])
          .forEach((e) => {
            e.style.visibility = "hidden";
          });
        productImages.find((e) => e === productImages[+i[0]]).style.visibility = "visible";
      }
    }
  });
  productItems.on("mouseleave", function (e) {
    let productImages = parseImages(e);
    productImages.slice(1).forEach((element) => {
      element.style.visibility = "hidden";
    });
    productImages[0].style.visibility = "visible";
  });

  function parseImages(elem) {
    let productImages = [];
    elem.currentTarget.childNodes.forEach((e) => {
      if (e.tagName === "IMG") {
        productImages.push(e);
      }
    });
    return productImages;
  }
});
