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

  function removeFromCart(index) {
    cart.splice(index, 1);
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

  // Vaciar carrito
  document.getElementById("clearCart").addEventListener("click", () => {
    cart = [];
    updateCart();
    document.getElementById("pp-button").innerHTML = ""; // Limpiar la cajita si había
  });

  // ✅ Usar PayPhone Payment Box
  document.getElementById("payButton").addEventListener("click", () => {
    const totalValue = parseFloat(totalEl.textContent);
    if (totalValue === 0) {
      alert("El carrito está vacío. Agrega productos antes de pagar.");
      return;
    }

    const storeId = "48IqeOCuZUWzPg3KOog4hQ"; // Reemplaza con el tuyo
    const token = "Bearer Tt27k2ai8_99gH6ipBkOMonVeHbKDz1ZLp74LTOReNVT9WLOgkv7ibSJ5WqRo5_x3i2CW-C8IH6EnkD8Yn2qQ_lfSVfcAizbI6jvrY9RnbwVDxt69End5bQUXenCsP9lwjzy6micyCWF15rXRXVWbvGc8cR-2dI-4xa15A43nkE6OrWEb-otxw_wJTgUYPPKaDPlkfG2skES8D8GOT3zXbYaz5WbwDOewMLSekVpFHQ9kcR6opK3s59tcou5zs8Ne_38ZGtoBpwYo49JG8IAlHOufqAjAVAG1aFFQcMg-ibuPyR3GiB5-aOOEjmoQvUetHZddGwWls5yoIWWFN91wPRUcqs"; // Reemplaza con el tuyo

    const transactionData = {
      amount: Math.round(totalValue * 100),
      amountWithoutTax: Math.round((totalValue / 1.12) * 100),
      tax: Math.round((totalValue * 0.12) * 100),
      clientTransactionId: Date.now().toString(),
      storeId,
      reference: "Compra en TiendaTech",
      currency: "USD",
      email: "cliente@tiendatech.com",
      returnUrl: "https://tiendatech.onrender.com/confirmacion.html"
    };

    const payButton = new PPaymentButtonBox({
      token,
      ...transactionData
    });

    payButton.render("pp-button"); // Muestra la cajita en el div correspondiente
  });
