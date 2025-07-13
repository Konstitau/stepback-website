// Dummy-Produkte
const products = [
  {
    id: 1,
    name: "Air Jordan 1",
    image: "images/jordan1.jpg",
    price: 149.99,
    description: "Legendärer Sneaker für dein Game!",
    category: "Sneaker"
  },
  {
    id: 2,
    name: "Wilson Evolution",
    image: "images/ball.jpg",
    price: 39.99,
    description: "Der perfekte Basketball für Indoor-Spiele.",
    category: "Equipment"
  },
  {
    id: 3,
    name: "Stepback Shirt",
    image: "images/shirt.jpg",
    price: 29.99,
    description: "Stylisches Shirt für echte Baller.",
    category: "Apparel"
  },
  {
    id: 4,
    name: "Nike LeBron 20",
    image: "images/lebron20.jpg",
    price: 179.99,
    description: "High Performance Sneaker.",
    category: "Sneaker"
  }
];

let cart = [];

// Produktübersicht anzeigen
function renderProducts(filtered = products) {
  const container = document.getElementById('shop-products');
  container.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-price">${product.price.toFixed(2)} €</div>
      <button class="add-cart-btn" onclick="addToCart(${product.id})">In den Warenkorb</button>
      <button class="add-cart-btn" onclick="showProduct(${product.id})" style="margin-top:8px;background:#222;color:#ffcc00;border:1px solid #ffcc00;">Details</button>
    `;
    container.appendChild(card);
  });
}

// Produktdetails als Modal
function showProduct(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const modal = document.createElement('div');
  modal.className = 'cart-modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="cart-content">
      <button class="cart-close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
      <img src="${product.image}" alt="${product.name}" style="width:100%;max-width:320px;border-radius:16px;">
      <h2>${product.name}</h2>
      <div class="product-price">${product.price.toFixed(2)} €</div>
      <p>${product.description}</p>
      <button class="add-cart-btn" onclick="addToCart(${product.id});document.body.removeChild(this.parentElement.parentElement)">In den Warenkorb</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Warenkorb-Logik
function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

// Warenkorb anzeigen
function showCart() {
  const modal = document.createElement('div');
  modal.className = 'cart-modal';
  modal.style.display = 'flex';
  let html = `<div class="cart-content">
    <button class="cart-close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
    <h2>Warenkorb</h2>
    <div class="cart-items">`;

  if (cart.length === 0) {
    html += `<p>Dein Warenkorb ist leer.</p>`;
  } else {
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      html += `<div class="cart-item-row">
        <span>${product.name} (${item.qty})</span>
        <span>${(product.price * item.qty).toFixed(2)} €</span>
        <button class="remove-cart-btn" onclick="removeFromCart(${item.id});document.body.removeChild(this.parentElement.parentElement.parentElement.parentElement.parentElement);showCart();">Entfernen</button>
      </div>`;
    });
    html += `<div class="cart-total">Gesamt: ${cartTotal().toFixed(2)} €</div>`;
    html += `<button class="add-cart-btn" onclick="alert('Checkout ist nur ein Demo!');">Zur Kasse</button>`;
  }
  html += `</div></div>`;
  modal.innerHTML = html;
  document.body.appendChild(modal);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
}

function cartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product.price * item.qty);
  }, 0);
}

// Filter & Suche
function applyFilter() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-select').value;
  let filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search))
    && (category === "" || p.category === category)
  );
  renderProducts(filtered);
}

// Initial laden
window.onload = function() {
  renderProducts();
  updateCartCount();
}
