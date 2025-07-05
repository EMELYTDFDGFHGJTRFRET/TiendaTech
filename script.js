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
];

const container = document.getElementById("product-list");
const cartList = document.getElementById("cart");
const cartCount = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const ivaEl = document.getElementById("iva");
const totalEl = document.getElementById("total");

let cart = [];

products.forEach((product, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button class="agregar-btn" onclick="addToCart(${index})">Agregar</button>
  `;
  container.appendChild(card);
});

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let subtotal = 0;

  cart.forEach((product, i) => {
    subtotal += product.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price.toFixed(2)}
      <button onclick="removeFromCart(${i})"
        style="margin-left: 10px; background: transparent; border: none; color: red; cursor: pointer;">🗑️</button>
    `;
    cartList.appendChild(li);
  });

  const iva = subtotal * 0.12;
  const total = subtotal + iva;

  cartCount.textContent = cart.length;
  subtotalEl.textContent = subtotal.toFixed(2);
  ivaEl.textContent = iva.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// ✅ Integración con PayPhone
document.getElementById("payButton").addEventListener("click", () => {
  const totalValue = parseFloat(document.getElementById("total").textContent);
  if (totalValue === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  // ⚠️ Reemplaza con tus datos reales
  const storeId = "FSR3zhzLSUeG8YmtsCjSBw";
  const token = "xhiblYy2WUWzBonsmeCP6A";

  const transactionData = {
    amount: Math.round(totalValue * 100),
    amountWithoutTax: Math.round((totalValue / 1.12) * 100),
    tax: Math.round(totalValue * 0.12 * 100),
    clientTransactionId: Date.now().toString(),
    phoneNumber: "",
    email: "prueba@tiendatech.com",
    storeId: storeId,
    reference: "Compra en TiendaTech"
  };

  fetch("https://pay.payphonetodoesposible.com/api/button", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(transactionData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("✅ Link de pago generado:", data);
      if (data.transactionId && data.paymentURL) {
        const payphone = new PayphoneCheckout();
        payphone.openUrl(data.paymentURL);
      } else {
        alert("Error generando link de pago. Verifica credenciales o Store ID.");
      }
    })
    .catch(error => {
      console.error("❌ Error al crear la transacción:", error);
      alert("Error al iniciar el pago. Revisa consola.");
    });
});
