// script.js

// Get cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  alert(`${name} added to cart.`);
}

// Load and display cart on cart.html
function loadCart() {
  const container = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
    totalDisplay.innerText = 'RS.0.00';
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemHTML = `
      <div class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-gray-600">Price: $${item.price.toFixed(2)}</p>
          <p class="text-gray-600">Quantity: ${item.quantity}</p>
        </div>
        <button onclick="removeItem(${index})" class="text-red-600 hover:underline">Remove</button>
      </div>
    `;
    container.innerHTML += itemHTML;
  });

  totalDisplay.innerText = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCart();

}