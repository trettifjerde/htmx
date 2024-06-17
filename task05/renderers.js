import PRODUCTS from './products.js';
import { getPage } from "../utils/helpers.js";

const layout = getPage('task05', 'layout.html');

export function renderPage(title, main) {
    return layout.replace('%%TITLE%%', title).replace('%%MAIN%%', main);
}

export function renderProducts() {
    return PRODUCTS.map(
        (product) => `
        <article class="product">
          <a href="/products/${product.id}">
            <img src="/task05/images/${product.image}" alt="${product.title}" />
            <div class="product-content">
              <h3>${product.title}</h3>
              <p class="product-price">$${product.price}</p>
            </div>
          </a>
        </article>
      `
    ).join('')
}

export function renderIndexPage() {
    const main = `<main id="shop">
        <h2>Elegant Clothing For Everyone</h2>

        <ul id="products">
            ${renderProducts()}
        </ul>
    </main>`;

    return renderPage('Elegant Clothing Shop', main);
}

export function renderProductPage(product) {
    const main = `<main id="product">
        <header>
            <img src="/task05/images/${product.image}" alt="${product.title}">
            <div>
                <h1>${product.title}</h1>
                <p id="product-price">$${product.price}</p>
                <form method="post" action="/cart">
                    <button>Add to Cart</button>
                </form>
            </div>
        </header>
        <p id="product-description">${product.description}</p>
    </main>`;

    return renderPage(product.title, main);
}