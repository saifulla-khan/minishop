// --- CART LOGIC ---

// 1. Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('minishop_cart');
    return cart ? JSON.parse(cart) : [];
}

// 2. Save cart to localStorage and update UI
function saveCart(cart) {
    localStorage.setItem('minishop_cart', JSON.stringify(cart));
    updateCartBadge();
}

// 3. Add a product to the cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    saveCart(cart);
}

// 4. Remove a product from the cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCartPage(); // Refresh cart page if we are on it
}

// 5. Update the cart badge in the header
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// 6. Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});

// --- CART PAGE LOGIC (Runs only on cart.html) ---

function renderCartPage() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return; // Exit if we are not on the cart page

    const cart = getCart();

    // Empty cart state
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <a href="products.html" class="btn">Start Shopping</a>
            </div>
        `;
        return;
    }

    // Build cart items
    let cartHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                <h2>Your Cart</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let subtotal = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return; // Skip if product no longer exists

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <tr>
                <td class="cart-product">
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name}</span>
                </td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <div class="qty-controls">
                        <button onclick="changeQuantity(${product.id}, -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart(${product.id})">✕</button>
                </td>
            </tr>
        `;
    });

    cartHTML += `
                    </tbody>
                </table>
            </div>
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <a href="checkout.html" class="btn btn-full">Proceed to Checkout</a>
            </div>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
}

// 7. Change quantity of an item
function changeQuantity(productId, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    saveCart(cart);
    renderCartPage();
}

// 8. Render the cart page on load
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});