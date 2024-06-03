// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLa_nr_0c0kudQSzcGV5hkwq3WH2bRGgo",
  authDomain: "freidea-pos.firebaseapp.com",
  projectId: "freidea-pos",
  storageBucket: "freidea-pos.appspot.com",
  messagingSenderId: "317401437770",
  appId: "1:317401437770:web:2657a877ea9fe88cf878b3",
  measurementId: "G-M8RF0RL2FP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    name: params.get("name"),
    image: params.get("image"),
    image2: params.get("imageTwo"),
    image3: params.get("imageThree"),
    image4: params.get("imageFour"),
    price: params.get("price"),
    oldPrice: params.get("oldPrice"),
    size: params.get("size"),
    qty: params.get("quantity"),
  };
}

function saveToLocalStorage(product) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

function removeFromLocalStorage(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  products = products.filter(product => product.id !== productId);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  const products = getFromLocalStorage();
  const productContainer = document.getElementById("product-container");
  const itemCount = document.getElementById("item-count");
  let totalQuantity = 0;
  let totalPrice = 0;
  itemCount.textContent = `You have ${products.length} items in your cart`;
  productContainer.innerHTML = products.map(product => {
    totalQuantity += parseInt(product.qty);
    totalPrice += parseFloat(product.price) * parseInt(product.qty) ;
    return `
    <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded" id="product-${product.id}">
      <div class="d-flex flex-row">
        <img class="rounded" src="${product.image}" width="40" />
        <div class="ml-2">
          <span class="font-weight-bold d-block">${product.name}</span><span class="spec">${product.size}</span>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center">
        <span class="d-block">${product.qty}</span><span class="d-block ml-5 font-weight-bold">Rs. ${product.price}.00</span>
        <i class="fa fa-trash-o ml-4 text-black-50" onclick="removeFromLocalStorage('${product.id}')"></i>
      </div>
    </div>
  `;
  }).join('');
  document.querySelector('.Total').textContent = `Total Quantity: ${totalQuantity} | Total Price: Rs. ${totalPrice.toFixed(2)}`;
}

function productExists(productId) {
  const products = getFromLocalStorage();
  return products.some(product => product.id === productId);
}

const product = getUrlParams();
if (product.id && !productExists(product.id)) {
  saveToLocalStorage(product);
}

renderProducts();

document.querySelector('.proceed-payment').addEventListener('click', () => {
  const products = getFromLocalStorage();
  let totalQuantity = 0;
  let totalPrice = 0;
  let orderItems = products.map(product => {
    totalQuantity += parseInt(product.qty);
    totalPrice += parseFloat(product.price) * parseInt(product.qty);
    return {
      id: product.id,
      name: product.name,
      quantity: product.qty,
      price: product.price
    };
  });

  const orderData = {
    totalQuantity: totalQuantity,
    totalPrice: totalPrice.toFixed(2),
    items: orderItems,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection('orders').add(orderData)
    .then(() => {
      alert('Order placed successfully!');
      localStorage.removeItem('products');
      renderProducts();
    })
    .catch(error => {
      console.error('Error adding order: ', error);
    });
});
