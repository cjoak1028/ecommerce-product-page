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
const quantityInput = document.querySelector("#quantity-input");
const quantityDecrementButton = document.querySelector("#quant-decr-button");
const quantityIncrementButton = document.querySelector("#quant-incr-button");
const cartButton = document.querySelector("#cart-button");
const cartDropdown = document.querySelector("#cart-dropdown");
const addCartForm = document.querySelector("#add-cart-form");
const cartContent = document.querySelector("#cart-content");
const cartDropdownPanel = document.querySelector("#cart-dropdown-panel");

const PRODUCT_ID = 1;
const PRODUCTS = {
  1: {
    id: 1,
    name: "Fall Limited Edition Sneakers",
    price: 125,
    image: "image-product-1-thumbnail.jpg",
  },
};

const CART = [];

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

const renderCart = () => {
  if (CART.length === 0) {
    cartContent.innerHTML = `
        <p class="text-base/6.5 text-grey-500 font-bold text-center my-18">
            Your cart is empty.
        </p>
    `;
    return;
  }

  let cartListItems = "";
  for (let item of CART) {
    let cartProduct = PRODUCTS[item.id];
    let totalPrice = cartProduct.price * item.quantity;
    cartListItems += `
        <li class="flex justify-between items-center">
            <div class="size-12.5 rounded-sm overflow-hidden">
                <img
                    src="./images/${cartProduct.image}"
                    alt=""
                    class="w-full h-full object-cover object-center"
                />
            </div>
            <div class="text-base/6.5 text-grey-500">
                <p>${cartProduct.name}</p>
                <p>
                    $${cartProduct.price}.00 x <span>${item.quantity}</span><span class="text-grey-950 font-bold ml-2">${totalPrice}.00</span>
                </p>
            </div>
            <button class="cart-delete-button cursor-pointer" data-product-id="${item.id}">
                <img src="./images/icon-delete.svg" alt="" />
            </button>
        </li>
    `;
  }
  cartContent.innerHTML = `
    <ul>
        ${cartListItems}
    </ul>

    <button class="h-14 bg-orange-500 rounded-[0.625rem] text-base/6.5 font-bold">
        Checkout
    </button>
  `;
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

productImageMain.addEventListener("click", () => {
  const curImageId = +productImageMain.dataset.id;

  updateLightboxImage(curImageId);
  updateLightboxThumbnailSelected(curImageId);

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

quantityDecrementButton.addEventListener("click", () => {
  const quantity = +quantityInput.value;
  if (quantity > 1) {
    quantityInput.value = quantity - 1;
  }
});

quantityIncrementButton.addEventListener("click", () => {
  const quantity = +quantityInput.value;
  quantityInput.value = quantity + 1;
});

cartButton.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

addCartForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addCartForm);
  const quantity = +formData.get("quantity");

  let cartItem = CART.find((item) => item.id === PRODUCT_ID);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    CART.push({ id: PRODUCT_ID, quantity });
  }

  renderCart();
});

cartContent.addEventListener("click", (e) => {
  let deleteButton = e.target.closest(".cart-delete-button");
  if (!deleteButton) return;

  e.stopPropagation();

  let itemDeleteIndex = CART.findIndex(
    (item) => item.id === deleteButton.dataset["product-id"],
  );
  CART.splice(itemDeleteIndex, 1);

  renderCart();
});

document.addEventListener("click", (e) => {
  if (cartDropdownPanel.contains(e.target)) return;
  if (e.target.closest("#cart-button")) return;

  cartDropdown.classList.add("hidden");
});
