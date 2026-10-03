document.addEventListener('DOMContentLoaded', () => {
    const checkoutContainer = document.getElementById('checkout-container');
    if (!checkoutContainer) return; // Exit if not on checkout page

    const cart = getCart(); // from cart.js

    // If cart is empty, show a message and stop
    if (cart.length === 0) {
        checkoutContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>You need to add items to your cart before checking out.</p>
                <a href="products.html" class="btn">Go Shopping</a>
            </div>
        `;
        return;
    }

    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) subtotal += product.price * item.quantity;
    });

    // Build the checkout page HTML
    checkoutContainer.innerHTML = `
        <h1>Checkout</h1>
        <div class="checkout-layout">
            <!-- Left: Shipping Form -->
            <div class="checkout-form">
                <h2>Shipping Details</h2>
                <form id="order-form">
                    <div class="form-group">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" required placeholder="john@example.com">
                    </div>
                    <div class="form-group">
                        <label for="address">Shipping Address</label>
                        <input type="text" id="address" required placeholder="123 Main St, City, Country">
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" required placeholder="+1 234 567 890">
                    </div>
                    <button type="submit" class="btn btn-full">Place Order</button>
                </form>
            </div>

            <!-- Right: Order Summary -->
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
            </div>
        </div>
    `;

    // Handle form submission
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page from refreshing

        // Clear the cart
        localStorage.removeItem('minishop_cart');
        updateCartBadge(); // from cart.js, resets badge to 0

        // Show success message
        checkoutContainer.innerHTML = `
            <div class="order-success">
                <div class="success-icon">✅</div>
                <h1>Order Placed Successfully!</h1>
                <p>Thank you for shopping with MiniShop. Your order is on its way.</p>
                <a href="index.html" class="btn">Back to Home</a>
            </div>
        `;
    });
});