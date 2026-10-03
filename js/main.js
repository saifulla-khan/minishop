document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Cart Badge into Header
    const cartLink = document.querySelector('nav a[href="cart.html"]');
    if (cartLink) {
        cartLink.innerHTML = `Cart 🛒 <span id="cart-count" class="cart-badge">0</span>`;
    }

    // 2. Check if we are on the Home page
    const homeProductGrid = document.getElementById('home-product-grid');
    if (homeProductGrid) {
        const featuredProducts = products.slice(0, 3);
        featuredProducts.forEach(product => {
            homeProductGrid.innerHTML += createProductCard(product);
        });
    }

    // 3. Check if we are on the Products page
    const allProductsGrid = document.getElementById('all-products-grid');
    if (allProductsGrid) {
        initProductsPage();
    }

    // 4. Check if we are on the Contact page (THIS WAS MISSING)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Replace the form with a nice success message
            const formContainer = contactForm.parentElement;
            formContainer.innerHTML = `
                <div class="order-success" style="padding: 40px 20px;">
                    <div class="success-icon">✅</div>
                    <h2>Message Sent!</h2>
                    <p>Thank you for reaching out. We will get back to you soon.</p>
                </div>
            `;
        });
    }
});

// --- PRODUCTS PAGE LOGIC ---
function initProductsPage() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort-select');
    const grid = document.getElementById('all-products-grid');

    // Populate the category dropdown dynamically from data.js
    const categories = ['All', ...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat === 'All' ? 'All Categories' : cat;
        categoryFilter.appendChild(option);
    });

    // Initial render
    renderFilteredProducts();

    // Attach event listeners
    searchInput.addEventListener('input', renderFilteredProducts);
    categoryFilter.addEventListener('change', renderFilteredProducts);
    sortSelect.addEventListener('change', renderFilteredProducts);

    function renderFilteredProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortBy = sortSelect.value;

        // 1. Filter
        let filtered = products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                                  p.description.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'All' || p.category === category;
            return matchesSearch && matchesCategory;
        });

        // 2. Sort
        if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
        else if (sortBy === 'name-az') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (sortBy === 'name-za') filtered.sort((a, b) => b.name.localeCompare(a.name));

        // 3. Render
        if (filtered.length === 0) {
            grid.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
        } else {
            grid.innerHTML = filtered.map(createProductCard).join('');
        }
    }
}

// --- UTILITY FUNCTION (used by Home & Products pages) ---
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="btn btn-small">View Product</a>
            </div>
        </div>
    `;
}