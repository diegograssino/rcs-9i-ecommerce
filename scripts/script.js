// 1- Seleccionar los elementos con los que voy a trabajar
const catalogue =
  document.getElementById('catalogue');

const cart = document.getElementById('cart');

const clear = document
  .getElementById('clear')
  .addEventListener('click', () => clearCart());

// 2- Inicializabamos todo lo que haga falta.
let cartProducts =
  JSON.parse(
    localStorage.getItem('cartProducts')
  ) || [];

let productsFiltered = PRODUCTS;

const search = document.getElementById('search');

// 3- Trabajabamos con la lógica necesaria

const renderCatalogue = () => {
  // Lo que haga falta mostrar en pantalla
  catalogue.innerHTML = '';

  productsFiltered.forEach(product => {
    // El codigo que se va a ejecutar para cada uno de los productos individuales

    // Primer paso para inyectar: Creo el elemento HTML que contenga el codigo.
    const card = document.createElement('div');
    // Segundo le agrego sus clases
    card.className = 'col';
    // Tercero, inyecto con template literals o backticks
    card.innerHTML = `<div class="card h-100">
						<div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.manufacturer}</p>
          </div>
          <div
            class="card-footer bg-white border-0"
          >
            $${product.cost_in_credits}
          </div>
          <div class="card-footer bg-white">
            <button id="buy${product.id}" class="btn btn-success">
              Buy
            </button>
						<button class="px-2" id="minus${product.id}">-</button>
						<span class="px-2" id="quantity${product.id}">1</span>
						<button class="px-2" id="plus${product.id}">+</button>
          </div>
					</div>`;
    // Cuarto, debo hacer un appendChild
    catalogue.appendChild(card);

    // Vamos a seleccionar nuestros botones/ span para ir trabajando con ellos
    const button = document
      .getElementById('buy' + product.id)
      .addEventListener('click', () =>
        buy(product, parseInt(quantity.innerText))
      );
    const quantity = document.getElementById(
      'quantity' + product.id
    );

    // operador ternario
    // Es un IF ELSE "enmascarado" o escrito de una forma mas simple
    // condicion ? true : false
    const minusButton = document
      .getElementById('minus' + product.id)
      .addEventListener('click', () =>
        quantity.innerText > 1
          ? (quantity.innerText =
              parseInt(quantity.innerText) - 1)
          : 1
      );

    const plusButton = document
      .getElementById('plus' + product.id)
      .addEventListener(
        'click',
        () =>
          (quantity.innerText =
            parseInt(quantity.innerText) + 1)
      );
  });
};

const renderCart = () => {
  // Esta funcion va a renderizar el carrito
  // Debo borrar mi carrito para que la UI coincida con los datos del array
  cart.innerHTML = '';

  cartProducts.forEach(cartProduct => {
    const card = document.createElement('div');

    card.className = 'col';
    card.innerHTML = `<div class="card h-100">
						<div class="card-body">
            <h5 class="card-title">${cartProduct.name}</h5>
            <p class="card-text">${cartProduct.manufacturer}</p>
          </div>
          <div
            class="card-footer bg-white border-0"
          >
            $${cartProduct.cost_in_credits}
          </div>
					<div
            class="card-footer bg-white border-0"
          >
            x ${cartProduct.q} 
          </div>
          <div class="card-footer bg-white">
            <button id="delete${cartProduct.id}" class="btn btn-danger">
              Delete
            </button>
          </div>
		</div>`;
    // Cuarto, debo hacer un appendChild
    cart.appendChild(card);
    // Vamos a seleccionar nuestros botones para ir trabajando con ellos
    const button = document
      .getElementById('delete' + cartProduct.id)
      .addEventListener('click', () =>
        del(cartProduct)
      );
  });

  // Trabajo con el total de productos
  let counter = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    const q = cartProducts[i].q;
    counter += q;
  }
  totalProducts.innerText = counter;

  // Trabajo con el total en $ del carrito
  let total = 0;
  console.log(cartProducts);
  for (let i = 0; i < cartProducts.length; i++) {
    const t =
      cartProducts[i].cost_in_credits *
      cartProducts[i].q;
    total += t;
  }
  totalPrice.innerText = total;
};

const buy = (p, q) => {
  // Revisar si el el producto existe o no en el carrito para poder controlar los duplicados
  const productExists = cartProducts.some(
    cartProduct => cartProduct.id === p.id
  );

  if (productExists) {
    const index = cartProducts.indexOf(p);
    // cartProducts[index].q = cartProducts[index].q + q
    cartProducts[index].q += q;
    // Paralelamente a agregar al array, agrego al localstorage
    localStorage.setItem(
      'cartProducts',
      JSON.stringify(cartProducts)
    );
  } else {
    p.q = q;
    cartProducts.push(p);
    // Paralelamente a agregar al array, agrego al localstorage
    localStorage.setItem(
      'cartProducts',
      JSON.stringify(cartProducts)
    );
  }
  // Actualizo los datos en el array (datos)
  renderCart();
  // Actualizo la UI, lo que se ve en pantalla
};

const del = p => {
  const index = cartProducts.indexOf(p);
  cartProducts.splice(index, 1);
  // Paralelamente a agregar al array, agrego al localstorage
  localStorage.setItem(
    'cartProducts',
    JSON.stringify(cartProducts)
  );
  // Actualizo la UI, lo que se ve en pantalla
  renderCart();
};

const clearCart = () => {
  cartProducts = [];
  // Paralelamente a agregar al array, agrego al localstorage
  localStorage.setItem(
    'cartProducts',
    JSON.stringify(cartProducts)
  );
  renderCart();
};

const searchFilter = () => {
  productsFiltered = PRODUCTS.filter(p =>
    p.name
      .toUpperCase()
      .includes(search.value.toUpperCase())
  );
  renderCatalogue();
};

// 4- Limpiar algunos valores en caso de ser necesario

// 5 - Ejecutar al inicio las funciones que hagan falta

renderCatalogue();
renderCart();
