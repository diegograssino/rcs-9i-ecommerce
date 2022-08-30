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
];

// Me voy a guardar lo maquetado que ya se que debo inyectar

				// Card de cart
        // <div class="card h-100">
        //   <div class="card-body">
        //     <h5 class="card-title">Ship</h5>
        //     <p class="card-text">Manufacturer</p>
        //   </div>
        //   <div
        //     class="card-footer bg-white border-0"
        //   >
        //     $1000
        //   </div>
        //   <div
        //     class="card-footer bg-white border-0"
        //   >
        //     x 10
        //   </div>
        //   <div class="card-footer bg-white">
        //     <button id="" class="btn btn-danger">
        //       Delete
        //     </button>
        //   </div>
        // </div>

// 1- Seleccionar los elementos con los que voy a trabajar
const catalogue = document.getElementById("catalogue");

const cart = document.getElementById("cart");

const clear = document.getElementById("clear").addEventListener("click", ()=> clearCart());

// 2- Inicializabamos todo lo que haga falta.
let cartProducts = [];

// 3- Trabajabamos con la lógica necesaria

const renderCatalogue = () => {
	// Lo que haga falta mostrar en pantalla
	PRODUCTS.forEach(product=> {
		// El codigo que se va a ejecutar para cada uno de los productos individuales
		// Primer paso para inyectar: Creo el elemento HTML que contenga el codigo.
		const card = document.createElement("div");
		// Segundo le agrego sus clases
		card.className = "col";
		// Tercero, inyecto con template literals o backticks
		card.innerHTML =`<div class="card h-100">
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
            <button id=${product.id} class="btn btn-success">
              Buy
            </button>
          </div>
					</div>`
		// Cuarto, debo hacer un appendChild
		catalogue.appendChild(card);

		// Vamos a seleccionar nuestros botones para ir trabajando con ellos
		const button = document.getElementById(product.id).addEventListener("click", ()=> buy(product))

	})
}

const renderCart = () => {
	// Esta funcion va a renderizar el carrito
	// Debo borrar mi carrito para que la UI coincida con los datos del array
	cart.innerHTML="";

	cartProducts.forEach( cartProduct => {
	const card = document.createElement("div");
	card.className = "col";
	card.innerHTML =`<div class="card h-100">
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
            x 10
          </div>
          <div class="card-footer bg-white">
            <button id="" class="btn btn-danger">
              Delete
            </button>
          </div>
		</div>`;
		// Cuarto, debo hacer un appendChild
		cart.appendChild(card);
		}	
	)
}

const buy = (p) => {
	// Actualizo los datos en el array (datos)
	cartProducts.push(p);
	// Actualizo la UI, lo que se ve en pantalla
	renderCart();
}

const clearCart = () => {
	cartProducts = [];
	renderCart();
}

// 4- Limpiar algunos valores en caso de ser necesario

// 5 - Ejecutar al inicio las funciones que hagan falta

renderCatalogue();
renderCart();