import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

// save product to cart
function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

// render product details dynamically
function renderProductDetails(product) {
  const element = document.querySelector(".product-detail");

  element.innerHTML = `
    <h3>${product.Brand}</h3>

    <h2 class="divider">${product.Name}</h2>

    <img
      class="divider"
      src="${product.Image}"
      alt="${product.Name}"
    />

    <p class="product-card__price">$${product.FinalPrice}</p>

    <p class="product__color">${product.Color}</p>

    <p class="product__description">
      ${product.Description}
    </p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}

// initialize the page
async function init() {
  const product = await dataSource.findProductById(productId);

  renderProductDetails(product);

  document
    .getElementById("addToCart")
    .addEventListener("click", () => addProductToCart(product));
}

init();
