document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the product ID from the URL (e.g., product.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // 2. Find the product in the data.js array
    const product = products.find(p => p.id === productId);

    // 3. Get the container
    const container = document.getElementById('product-detail-container');

    // 4. If no product found (or no ID in URL), show error message
    if (!product) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>The product you are looking for does not exist or has been removed.</p>
                <a href="products.html" class="btn">Back to Products</a>
            </div>
        `;
        return;
    }

    // 5. Build the product details HTML
    container.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <span class="product-category">${product.category}</span>
                <h1>${product.name}</h1>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn" id="add-to-cart-btn" data-id="${product.id}">
                        Add to Cart 🛒
                    </button>
                    <a href="products.html" class="btn btn-outline">Back to Products</a>
                </div>
            </div>
        </div>
    `;

    // We will add the "Add to Cart" button functionality in Stage 5
       // We will add the "Add to Cart" button functionality in Stage 5
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product.id);
        alert(`Added ${product.name} to cart!`);
    });
});