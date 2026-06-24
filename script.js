const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 64rem)");
const productThumbnailsMain = document.querySelector(
  "#product-thumbnails-main",
);
const productImageMain = document.querySelector("#product-image-main");

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
});
