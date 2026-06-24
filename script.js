const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 64rem)");
const productThumbnailsMain = document.querySelector(
  "#product-thumbnails-main",
);
const productImageMain = document.querySelector("#product-image-main");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

const openMenu = () => {
  document.body.classList.add("overflow-hidden");
  menu.classList.remove("hidden");
};

const closeMenu = () => {
  document.body.classList.remove("overflow-hidden");
  menu.classList.add("hidden");
};

menuOpenButton.addEventListener("click", () => {
  openMenu();
});

menuCloseButton.addEventListener("click", () => {
  closeMenu();
});

mediaQuery.addEventListener("change", (e) => {
  if (e.matches) {
    closeMenu();
  }
});

menu.addEventListener("click", (e) => {
  if (e.target.matches("#menu")) {
    closeMenu();
  }
});

productThumbnailsMain.addEventListener("change", (e) => {
  productImageMain.src = `./images/image-product-${e.target.value}.jpg`;
  productImageMain.alt = `Product image ${e.target.value}`;
  productImageMain.dataset.id = e.target.value;
});

prevButton.addEventListener("click", () => {
  const curImageId = +productImageMain.dataset.id;
  let prevImageId = curImageId - 1;
  if (prevImageId < 1) {
    prevImageId = 4;
  }
  productImageMain.src = `./images/image-product-${prevImageId}.jpg`;
  productImageMain.alt = `Product image ${prevImageId}`;
  productImageMain.dataset.id = prevImageId;

  const thumbnailOption = productThumbnailsMain.querySelector(
    `#thumbnail-option-${prevImageId}`,
  );
  thumbnailOption.checked = true;
});

nextButton.addEventListener("click", () => {
  const curImageId = +productImageMain.dataset.id;
  let nextImageId = curImageId + 1;
  if (nextImageId > 4) {
    nextImageId = 1;
  }
  productImageMain.src = `./images/image-product-${nextImageId}.jpg`;
  productImageMain.alt = `Product image ${nextImageId}`;
  productImageMain.dataset.id = nextImageId;

  const thumbnailOption = productThumbnailsMain.querySelector(
    `#thumbnail-option-${nextImageId}`,
  );
  thumbnailOption.checked = true;
});
