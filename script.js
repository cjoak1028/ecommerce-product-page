const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const menu = document.querySelector("#menu");
const mediaQuery = window.matchMedia("(min-width: 64rem)");
const productThumbnailsMain = document.querySelector(
  "#product-thumbnails-main",
);
const productImageMain = document.querySelector("#product-image-main");
const mainPrevButton = document.querySelector("#prev-button-main");
const mainNextButton = document.querySelector("#next-button-main");
const lightbox = document.querySelector("#lightbox");
const lightboxCloseButton = document.querySelector("#lightbox-close-button");
const productThumbnailsLightbox = document.querySelector(
  "#product-thumbnails-lightbox",
);
const productImageLightbox = document.querySelector("#product-image-lightbox");
const lightboxPrevButton = document.querySelector("#prev-button-lightbox");
const lightboxNextButton = document.querySelector("#next-button-lightbox");

const openMenu = () => {
  document.body.classList.add("overflow-hidden");
  menu.classList.remove("hidden");
};

const closeMenu = () => {
  document.body.classList.remove("overflow-hidden");
  menu.classList.add("hidden");
};

const updateMainImage = (id) => {
  productImageMain.src = `./images/image-product-${id}.jpg`;
  productImageMain.alt = `Product image ${id}`;
  productImageMain.dataset.id = id;
};

const updateLightboxImage = (id) => {
  productImageLightbox.src = `./images/image-product-${id}.jpg`;
  productImageLightbox.alt = `Product image ${id}`;
  productImageLightbox.dataset.id = id;
};

const updateMainThumbnailSelected = (id) => {
  productThumbnailsMain.querySelector(`[value="${id}"]`).checked = true;
};

const updateLightboxThumbnailSelected = (id) => {
  productThumbnailsLightbox.querySelector(`[value="${id}"]`).checked = true;
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
  const selectedImageId = e.target.value;
  updateMainImage(selectedImageId);
  updateLightboxImage(selectedImageId);
  updateLightboxThumbnailSelected(selectedImageId);
});

mainPrevButton.addEventListener("click", () => {
  const curImageId = +productImageMain.dataset.id;
  let prevImageId = curImageId - 1;

  if (prevImageId < 1) {
    prevImageId = 4;
  }

  updateMainImage(prevImageId);
  updateLightboxImage(prevImageId);

  updateMainThumbnailSelected(prevImageId);
  updateLightboxThumbnailSelected(prevImageId);
});

mainNextButton.addEventListener("click", () => {
  const curImageId = +productImageMain.dataset.id;
  let nextImageId = curImageId + 1;

  if (nextImageId > 4) {
    nextImageId = 1;
  }

  updateMainImage(nextImageId);
  updateLightboxImage(nextImageId);

  updateMainThumbnailSelected(nextImageId);
  updateLightboxThumbnailSelected(nextImageId);
});

// TODO: ENSURE LIGHTBOX HAS SAME IMAGE AS MAIN WHEN OPEN
productImageMain.addEventListener("click", () => {
  lightbox.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
});

lightboxCloseButton.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
});

document.addEventListener("click", (e) => {
  if (e.target.matches("#lightbox-content")) {
    lightbox.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
});

productThumbnailsLightbox.addEventListener("change", (e) => {
  updateLightboxImage(e.target.value);
});

lightboxPrevButton.addEventListener("click", () => {
  const curImageId = +productImageLightbox.dataset.id;
  let prevImageId = curImageId - 1;

  if (prevImageId < 1) {
    prevImageId = 4;
  }

  updateLightboxImage(prevImageId);
  updateLightboxThumbnailSelected(prevImageId);
});

lightboxNextButton.addEventListener("click", () => {
  const curImageId = +productImageLightbox.dataset.id;
  let nextImageId = curImageId + 1;

  if (nextImageId > 4) {
    nextImageId = 1;
  }

  updateLightboxImage(nextImageId);
  updateLightboxThumbnailSelected(nextImageId);
});
