// Product Database
// Replace these with your actual products once manufactured
const products = [
    {
        id: 1,
        name: "Men's Vitality Complex",
        category: "men",
        price: 44.99,
        description: "Comprehensive support for testosterone, energy, and stamina. Includes zinc, magnesium, D3, and ashwagandha.",
        features: ["Testosterone Support", "Energy & Stamina", "Stress Reduction"],
        image: "mens-vitality.jpg"
    },
    {
        id: 2,
        name: "Women's Balance Formula",
        category: "women",
        price: 44.99,
        description: "Hormonal balance support with DIM, evening primrose, and methylated B vitamins.",
        features: ["Hormonal Balance", "Mood Support", "Healthy Metabolism"],
        image: "womens-balance.jpg"
    },
    {
        id: 3,
        name: "Prenatal Complete",
        category: "family",
        price: 39.99,
        description: "Methylated folate, iron, DHA, and essential nutrients for preconception and pregnancy.",
        features: ["Methylated Folate", "DHA Support", "Gentle on Stomach"],
        image: "prenatal.jpg"
    },
    {
        id: 4,
        name: "Cognitive Edge",
        category: "brain",
        price: 49.99,
        description: "Supports memory, focus, and mental clarity with lion's mane, bacopa, and phosphatidylserine.",
        features: ["Memory Support", "Focus & Clarity", "Long-term Brain Health"],
        image: "cognitive.jpg"
    },
    {
        id: 5,
        name: "Testosterone Boost",
        category: "men",
        price: 54.99,
        description: "Premium blend of Tongkat Ali, Fadogia Agrestis, and boron for natural testosterone optimization.",
        features: ["Natural Ingredients", "Libido Support", "Strength & Vitality"],
        image: "testosterone.jpg"
    },
    {
        id: 6,
        name: "Estrogen Support Complex",
        category: "women",
        price: 44.99,
        description: "DIM, calcium-d-glucarate, and cruciferous extract for healthy estrogen metabolism.",
        features: ["Hormonal Balance", "Menopause Support", "Liver Detox Pathways"],
        image: "estrogen.jpg"
    },
    {
        id: 7,
        name: "Neonatal DHA Drops",
        category: "family",
        price: 29.99,
        description: "Pure, algae-derived DHA for infant brain and eye development.",
        features: ["Plant-Based", "No Artificial Flavors", "Easy Absorption"],
        image: "neonatal.jpg"
    },
    {
        id: 8,
        name: "Master Multivitamin",
        category: "all",
        price: 34.99,
        description: "Complete foundational nutrition with methylated vitamins and chelated minerals.",
        features: ["Methylated B12 & Folate", "Chelated Minerals", "One Daily"],
        image: "multivitamin.jpg"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    saveCart();
    alert(`${product.name} added to cart!`);
}

// Render featured products on homepage
function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('assets/images/${product.image}'); background-size: cover;">
                ${!product.image ? '💊' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Render products on products page
function renderProducts(category = null) {
    const container = document.getElementById('allProducts');
    if (!container) return;
    
    let filtered = products;
    if (category && category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('assets/images/${product.image}'); background-size: cover;">
                ${!product.image ? '💊' : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <a href="product-detail.html?id=${product.id}" class="btn-primary" style="display: block; text-align: center; margin-bottom: 0.5rem;">View Details</a>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Render single product detail
function renderProductDetail() {
    const container = document.getElementById('productDetail');
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        container.innerHTML = '<p>Product not found.</p>';
        return;
    }
    
    container.innerHTML = `
        <div class="detail-grid">
            <div class="detail-image">
                ${!product.image ? '💊' : ''}
            </div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <div class="detail-price">$${product.price}</div>
                <p class="detail-description">${product.description}</p>
                <div class="ingredients">
                    <h3>Key Features</h3>
                    <ul>
                        ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                </div>
                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <input type="number" id="quantity" value="1" min="1" max="10">
                </div>
                <button class="add-to-cart btn-large" onclick="addToCart(${product.id}, document.getElementById('quantity').value)">Add to Cart</button>
            </div>
        </div>
    `;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
    renderProducts();
    renderProductDetail();
    updateCartDisplay();
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thanks for subscribing! We'll send updates to ${email}`);
            newsletterForm.reset();
        });
    }
    
    // Category filtering on products page
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category && window.location.pathname.includes('products.html')) {
        renderProducts(category);
    }
});

// Expose functions globally
window.addToCart = addToCart;
