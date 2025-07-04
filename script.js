
const products = [
  {
    name: "Laptop Lenovo i5",
    price: 599.99,
    image: "img/laptop.jpg"
  },
  {
    name: "Audífonos Inalámbricos",
    price: 89.99,
    image: "img/audifonos.jpg"
  },
  {
    name: "Smartwatch Huawei",
    price: 129.49,
    image: "img/Smartwatch_Huawei.png"
  },
  {
    name: "Mouse Gamer RGB",
    price: 35.00,
    image: "img/mouse.jpg"
  },
  {
    name: "Teclado Mecánico",
    price: 49.90,
    image: "img/teclado.jpg"
  },
  {
    name: "Cámara Gamer HD",
    price: 79.99,
    image: "img/camara_gamer.png"
  },
  {
    name: "Micrófono RGB",
    price: 59.90,
    image: "img/microfono_gamer.png"
  },
  {
    name: "Impresora Epson",
    price: 300,
    image: "img/impresora_epson.png"
  },
]
const container = document.getElementById("product-list");
const cartList = document.getElementById("cart");
const cartCount = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const ivaEl = document.getElementById("iva");
const totalEl = document.getElementById("total");

let cart = [];

products.forEach((product, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>$${product.price.toFixed(2)}</p>
    <button onclick="addToCart(${index})">Agregar al carrito</button>
  `;

  container.appendChild(card);
});

function addToCart(index) {
  cart.push(products[index]);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, i) => {
    subtotal += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
      <button onclick="removeFromCart(${i})" style="margin-left:10px; color:red;">🗑️</button>`;
    cartList.appendChild(li);
  });

  const iva = subtotal * 0.12;
  const total = subtotal + iva;

  cartCount.textContent = cart.length;
  subtotalEl.textContent = subtotal.toFixed(2);
  ivaEl.textContent = iva.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

document.getElementById("payButton").addEventListener("click", () => {
  alert("Aquí se iniciaría la integración con PayPhone (modo prueba).");
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
});