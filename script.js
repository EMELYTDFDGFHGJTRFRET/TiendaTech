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

    const storeId = "a543e0bf-0f66-47bd-a157-0c4b6aa228e1"; // Reemplaza con el tuyo
    const token = "Bearer EQK4qW2ZUDkvg5_-aqJL3pvWs5t_FzMQkazU9a9wgiXAOC9uyNWlL91_veOBSjCt1jXPVkkL9-CECCWF6DZsxnA3WOFnUTt6JWTFBvbVpIAcw1MR4SE6zvcw9r7OwEv6T9P3GgLY6b1vz2ymtyNvTSfw2pOp-cTxe51lNEa36s7GEXTYr3UjrAW1CGwRHiqYJAIclWkMbcBr3yhO2PRzH4oqaQoMMzY7olSiiToE8QtaGVt5S1pQSmc34MG-d2RnRrj5TJVS7VJy9CPnrV_S3RdoctKZumcAJGCfbEpbMGWA1FnUizblLNOT7dq6QjG3DQhiTxqQHi2nbAoEFGCJ2HWI3oM"; // Reemplaza con el tuyo

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
