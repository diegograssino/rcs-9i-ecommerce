const PRODUCTS = [
  {
    id: 'product1',
    name: 'CR90 corvette',
    manufacturer:
      'Corellian Engineering Corporation',
    cost_in_credits: 350,
  },
  {
    id: 'product2',
    name: 'Star Destroyer',
    manufacturer: 'Kuat Drive Yards',
    cost_in_credits: 150,
  },
  {
    id: 'product3',
    name: 'Sentinel-class landing craft',
    manufacturer:
      'Sienar Fleet Systems, Cyngus Spaceworks',
    cost_in_credits: 24,
  },
  {
    id: 'product4',
    name: 'Death Star',
    manufacturer:
      'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: 500,
  },
  {
    id: 'product5',
    name: 'Millennium Falcon',
    manufacturer:
      'Corellian Engineering Corporation',
    cost_in_credits: 75,
  },
  {
    id: 'product6',
    name: 'Executor',
    manufacturer:
      'Kuat Drive Yards, Fondor Shipyards',
    cost_in_credits: 35,
  },
  {
    id: 'product7',
    name: 'Y-wing',
    manufacturer: 'Koensayr Manufacturing',

    cost_in_credits: 22,
  },
  {
    id: 'product8',
    name: 'X-wing',
    manufacturer: 'Incom Corporation',
    cost_in_credits: 15,
  },
  {
    id: 'product9',
    name: 'TIE Advanced x1',
    manufacturer: 'Sienar Fleet Systems',
    cost_in_credits: 30,
  },
];

// 1- Seleccionar los elementos con los que voy a trabajar
const catalogue =
  document.getElementById('catalogue');

const cart = document.getElementById('cart');

const clear = document
  .getElementById('clear')
  .addEventListener('click', () => clearCart());

// 2- Inicializabamos todo lo que haga falta.
let cartProducts = [];

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
  } else {
    p.q = q;
    cartProducts.push(p);
  }
  // Actualizo los datos en el array (datos)
  renderCart();
  // Actualizo la UI, lo que se ve en pantalla
};

const del = p => {
  const index = cartProducts.indexOf(p);
  cartProducts.splice(index, 1);
  // Actualizo la UI, lo que se ve en pantalla
  renderCart();
};

const clearCart = () => {
  cartProducts = [];
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
